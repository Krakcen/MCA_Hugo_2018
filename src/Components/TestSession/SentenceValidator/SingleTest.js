import React from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-elements';
import { Audio, Permissions, FileSystem } from 'expo';


import HugoButton from '../../UI/Buttons.js';
import HugoList from '../../UI/List';
import Header from '../../UI/Header.js';
import { setCurrentTest, setTest, setSession } from '../../../Redux/Actions';
import G, { gStyles } from '../../../Globals.js';

const getTimeDiff = (begin, end) => {

    if (end < begin) {
        end.setDate(end.getDate() + 1);
    }

    let diff = end - begin;

    let msec = diff;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    return ({
        s: ss,
        m: mm,
        h: hh,
    });
};

let EndView = ({onSessionReview, onSessionEnd, onSessionStartOver, onSessionSave, ...props}) => {
    const endChoicesList = [
        {
            text: 'Review Session',
            chevronColor: G["third-color"],
            onPress: onSessionReview,
            icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="eye" size={30} color={G["third-color"]} />,
        },
        {
            text: 'Save Session',
            chevronColor: G.buttons.success,
            onPress: onSessionSave,
            icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="save" size={30} color={G.buttons.success} />,
        },
        {
            text: 'Start Over',
            chevronColor: G.buttons.warning,
            onPress: onSessionStartOver,
            icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="clock-o" size={30} color={G.buttons.warning} />,
        },
        {
            text: 'Cancel and return to the selection screen',
            chevronColor: G.buttons.danger,
            onPress: onSessionEnd,
            icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="ban" size={30} color={G.buttons.danger} />,
        },
    ];
    return (
        <View>
            <HugoList data={endChoicesList} />
        </View>
    );
};

let TestView = ({...ctx, props}) => {
    return (
        <View style={testViewStyles.globalView}>
            <Header text={"#" + (props.tests[props.currentTest].sessionStep + 1)} textStyle={testViewStyles.header}/>
            <View style={testViewStyles.sentenceWrapper}>
                { props.tests[props.currentTest].session.list.length
                    ? <HugoButton onPress={ctx.onEndSession} text={"End Session"} color={G.buttons.success}/>
                    : <Text style={{color: G["secondary-color"]}}>Play Audio, Record Patient, Evaluate</Text>
                }
                {/*<Text style={{color: G["secondary-color"]}}>{ctx.sentenceList[props.tests[props.currentTest].sessionStep]}</Text>*/}
            </View>
            <View style={ testViewStyles.soundGroupWrapper }>
                <View style={testViewStyles.imageSoundWrapper}>
                    <TouchableOpacity
                        disabled={props.tests[props.currentTest].recording}
                        style={{ flex:1}}
                        activeOpacity={0.4}
                        onPress={props.tests[props.currentTest].playing ? ctx.pauseAudio : ctx.loadNewPlaybackInstance}
                    >
                        <Image
                            resizeMode='contain'
                            style={{ flex:1, width: null, height: null, opacity: props.tests[props.currentTest].recording ? 0.4 : null}}
                            source={props.tests[props.currentTest].playing ? require('../../../Res/UI/pause.png') : require('../../../Res/UI/playsleep.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={testViewStyles.imageSoundWrapper}>
                    <TouchableOpacity
                        disabled={props.tests[props.currentTest].playing}
                        style={{ flex:1}}
                        activeOpacity={0.4}
                        onPress={props.tests[props.currentTest].recording ? ctx.stopRecording : ctx.startRecording}
                    >
                        <Image
                            resizeMode='contain'
                            style={{ flex:1, width: null, height: null, opacity: props.tests[props.currentTest].playing ? 0.4 : null}}
                            source={props.tests[props.currentTest].recording ? require('../../../Res/UI/recording.png') : require('../../../Res/UI/record2.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={testViewStyles.progressWrapper}>
                { props.tests[props.currentTest].voiceRecorded
                    ? <HugoButton
                        onPress={ctx.playPatientAnswer}
                        text={"Play Patient Answer"}
                        color={G["third-color"]}
                    />
                    : <Badge containerStyle={{ backgroundColor: G['secondary-color']}}>
                        <Text style={{color:'white'}}>{props.tests[props.currentTest].statusBar}</Text>
                    </Badge>
                }
            </View>
            { props.tests[props.currentTest].voiceRecorded
                ? <View style={testViewStyles.submitButtonsWrapper}>
                    <View>
                        <HugoButton
                            onPress={() => ctx.onNextClick(true)}
                            text={"Correct"}
                            color={G.buttons.success}
                        />
                    </View>
                    <View>
                        <HugoButton
                            onPress={() => ctx.onNextClick(false)}
                            text={"Incorrect"}
                            color={G.buttons.danger}
                        />
                    </View>
                </View>
                : <View style={testViewStyles.submitButtonsWrapper}/>
            }
        </View>
    );
};
const testViewStyles = StyleSheet.create({
    globalView: {
        //backgroundColor: 'limegreen',
        flex: 1,
    },
    header: {
        //backgroundColor: 'orange',
        color: 'black',
        fontSize: 18,
    },
    sentenceWrapper: {
        alignItems: "center",
        paddingBottom: 20,
    },
    soundGroupWrapper: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        //backgroundColor: "limegreen",
        height: Dimensions.get('screen').height / 4,
        marginBottom: 20,
    },
    progressWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "dodgerblue",
        marginBottom: 20,
    },
    submitButtonsWrapper: {
        //backgroundColor: 'purple',
        flex:1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
    },
    imageSoundWrapper: {
        flex: 1,
        padding: Dimensions.get('screen').width / 8,
    },
});

class SingleTest extends React.Component {
    constructor(props) {
        super(props);

        this.props.navigation.setParams({otherParam: 'Updated!'});

        const soundPathProto = "./Sounds/";
        const soundTypeProto = ".mp3";
        /*this.soundListProto = [
            require('./Sounds/crow.mp3'),
            require('./Sounds/cat.mp3'),
            require('./Sounds/chimpanzee.mp3'),
            require('./Sounds/bear.mp3'),
            require('./Sounds/dog.mp3'),
            require('./Sounds/dolphin.mp3'),
            require('./Sounds/eagle.mp3'),
            require('./Sounds/elephant.mp3'),
            require('./Sounds/lamb.mp3'),
            require('./Sounds/moose.mp3'),
        ];*/
        this.soundListProto = [
            require('./Sounds/prod/def1.wav'),
            require('./Sounds/prod/def2.wav'),
            require('./Sounds/prod/def3.wav'),
            require('./Sounds/prod/def4.wav'),
            require('./Sounds/prod/def5.wav'),
            require('./Sounds/prod/def6.wav'),
            require('./Sounds/prod/def7.wav'),
            require('./Sounds/prod/def8.wav'),
            require('./Sounds/prod/def9.wav'),
            require('./Sounds/prod/def10.wav'),
            require('./Sounds/prod/def11.wav'),
            require('./Sounds/prod/def12.wav'),
            require('./Sounds/prod/def13.wav'),
            require('./Sounds/prod/def14.wav'),
            require('./Sounds/prod/def15.wav'),
            require('./Sounds/prod/def16.wav'),
            require('./Sounds/prod/def17.wav'),
            require('./Sounds/prod/def18.wav'),
            require('./Sounds/prod/def19.wav'),
            require('./Sounds/prod/def20.wav'),
        ];
        this.sentenceList = [
            "Crow",
            "Cat",
            "Chimpanzee",
            "Bear",
            "Dog",
            "Dolphin",
            "Eagle",
            "Elephant",
            "Lamb",
            "Moose",
        ];
        this.playbackInstance = null;
        this.recordInstance = null;
        this.patientAudioFile = null;
        this.responseTime = null;
        this.baseTime = null;

        this.onNextClick = this.onNextClick.bind(this);

        this.preventBackButton = this.preventBackButton.bind(this);
        this.onSessionReview = this.onSessionReview.bind(this);
        this.onSessionEndedRedirection = this.onSessionEndedRedirection.bind(this);
        this.onSessionEndedStartOver = this.onSessionEndedStartOver.bind(this);
        this.onSessionEndSave = this.onSessionEndSave.bind(this);

        this.pauseAudio = this.pauseAudio.bind(this);
        this.loadNewPlaybackInstance = this.loadNewPlaybackInstance.bind(this);
        this.unloadInstance = this.unloadInstance.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.onRecordUpdate = this.onRecordUpdate.bind(this);
        this.playPatientAnswer = this.playPatientAnswer.bind(this);
        this.onPatientPlaybackUpdate = this.onPatientPlaybackUpdate.bind(this);

        this.onPlaybackUpdate = this.onPlaybackUpdate.bind(this);
        this.onEndSession = this.onEndSession.bind(this);

        (async () => {
            const {status} = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
            //console.log(status);
        })();
    }
    componentDidMount() {
        //this.loadNewPlaybackInstance();

    }
    playPatientAnswer() {
        //console.log("playing patient answer");
        if (this.patientAudioFile != null) {
            this.patientAudioFile.setOnPlaybackStatusUpdate(this.onPatientPlaybackUpdate);
            this.patientAudioFile.playAsync();
        }
        else {
            console.log("ERROR PATIENT FILE NULL");
        }
    }
    onPatientPlaybackUpdate(playbackStatus) {
        if (!playbackStatus.isLoaded) {
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
        } else {
            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                this.patientAudioFile.stopAsync();
                //console.log("patient audio finished playing waiting");
            }
        }
    }
    async unloadInstance() {
        this.props.setTest(this.props.currentTest, {
            playing: false,
        });
        try {
            if (this.playbackInstance != null) {
                await this.playbackInstance.unloadAsync();
                this.playbackInstance.setOnPlaybackStatusUpdate(null);
                this.playbackInstance = null;
                //console.log("instance unloaded!")
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    pauseAudio() {
        if (this.playbackInstance != null) {
            this.playbackPaused = true;

            this.playbackInstance.pauseAsync();

            this.props.setTest(this.props.currentTest, {
                playing: false,
            });
        }
    }
    async loadNewPlaybackInstance() {
        this.props.setTest(this.props.currentTest, {
            playing: true,
        });

        if (this.playbackPaused) {
            this.playbackPaused = false;

            this.playbackInstance.playAsync();
        }
        else {
            if (this.playbackInstance != null) {
                await this.playbackInstance.unloadAsync();
                this.playbackInstance.setOnPlaybackStatusUpdate(null);
                this.playbackInstance = null;
                //console.log("previous instance unloaded");
            }

            try {
                const source = this.soundListProto[this.props.tests[this.props.currentTest].sessionStep];
                const initialStatus = {shouldPlay: true};
                const {sound, status} = await Audio.Sound.create(
                    source,
                    initialStatus,
                    this.onPlaybackUpdate,
                );
                this.playbackInstance = sound;
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async startRecording() {
        if (!this.recordingClicked) {
            this.recordingClicked = true;
            this.recordInstance = new Audio.Recording();
            try {
                await this.recordInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                //console.log("Recording Prepared");

                this.recordInstance.setOnRecordingStatusUpdate(this.onRecordUpdate);

                await this.recordInstance.startAsync().then(() => {
                    if (!this.baseTime)
                        this.baseTime = new Date();
                    this.props.setTest(this.props.currentTest, {
                        statusBar: "Currently Recording",
                        voiceRecorded: false,
                        recording: true,
                    });
                    this.recordingClicked = false;
                });
                //console.log("Recording");
            }
            catch (e) {

            }
        }
    }
    async stopRecording() {
        //console.log(this.recordingClicked);
        if (!this.recordingClicked) {
            //console.log("before stopping");
            this.recordingClicked = true;
            try {
                if (this.recordInstance != null) {
                    await this.recordInstance.stopAndUnloadAsync().then(() => {
                        this.responseTime = getTimeDiff(this.baseTime, new Date());
                        this.baseTime = null;

                        this.props.setTest(this.props.currentTest, {
                            recording: false,
                            statusBar: "Record Ended, creating audio file...",
                        });
                        this.recordingClicked = false;
                    });

                    const {sound, status} = await this.recordInstance.createNewLoadedSound({},
                        (status) => {
                            if (status.isLoaded) {
                                this.props.setTest(this.props.currentTest, {
                                    voiceRecorded: true,
                                });
                            }
                        },
                    );
                    this.patientAudioFile = sound;
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    preventBackButton() {
        return (true);
    }
    componentWillUnmount() {
        //console.log('Will Unmount');
        //this.unloadInstance();
        this.props.setTest(this.props.currentTest, {
            voiceRecorded: false,
            recording: false,
            playing: false,
            statusBar: "Play Audio File",
        });
        this.recordingClicked = false;

        if (this.recordInstance) {
            //console.log("unloading record");
            this.recordInstance.stopAndUnloadAsync();
        }
        else if (this.playbackInstance) {
            //console.log("unloaded audio");
            this.playbackInstance.unloadAsync();
        }
    }
    componentWillReceiveProps(nextProps) {
        const { params } = nextProps.navigation.state;
        //Update Session Here
        if (!this.props.isFocused && nextProps.isFocused) {
            if (params["sessionStep"] > 19) {
                //console.log("entering");
                BackHandler.addEventListener('hardwareBackPress', this.preventBackButton);
            }
            //console.log(params["sessionStep"]);
            nextProps.setTest(nextProps.currentTest, {sessionStep: params["sessionStep"]});
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            if (params["sessionStep"] > 19) {
                //console.log("exiting");
                BackHandler.removeEventListener('hardwareBackPress', this.preventBackButton);
            }
        }
    }
    onPlaybackUpdate(playbackStatus) {
        if (!playbackStatus.isLoaded) {
            //console.log("audio unloaded");
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
        } else {
            //console.log("audio loaded");
            if (playbackStatus.isPlaying) {
                //console.log("audio playing");
            } else {
                //console.log("audio paused");
            }

            if (playbackStatus.isBuffering) {
                this.props.setTest(this.props.currentTest, {
                    playing: true,
                    statusBar: "Audio File Playing",
                });
                console.log("audio buffered");
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                this.baseTime = new Date();

                console.log("audio finished playing waiting");
                this.props.setTest(this.props.currentTest, {
                    playing: false,
                    statusBar: this.props.tests[this.props.currentTest].voiceRecorded ? "Review Performance" : "Record Patient Answer",
                });
                this.unloadInstance();
            }
        }
    }
    onRecordUpdate(status) {
        //console.log(status);
        if (status.isRecording) {

            //console.log("can record");
        } else if (status.isDoneRecording) {
            /*this.props.setTest(this.props.currentTest, {
                recording: false,
                statusBar: "Record Ended, creating audio file...",
            });*/
        }
    }
    onEndSession() {
        //Reset Test
        this.props.setTest(this.props.currentTest, {
            voiceRecorded: false,
            recording: false,
            playing: false,
            statusBar: "Play Audio File",
        });

        this.props.navigation.navigate('SingleTest', {
            sessionStep: 20,
        });
    }
    onNextClick(answer) {
        const { list } = this.props.tests[this.props.currentTest].session;

        const resObj = {
            step: this.props.tests[this.props.currentTest].sessionStep,
            responseTime: this.responseTime.s,
            patientRecord: /*this.patientAudioFile*/"proto",
            name: "Entry number " + (this.props.tests[this.props.currentTest].sessionStep + 1),
            validation: answer,
        };
        if (list.length <= this.props.tests[this.props.currentTest].sessionStep ) {
            //console.log("new entry needed");
            list.push(resObj);
        }
        else {
            console.log("modifying entry");
            list[resObj.step] = resObj;
        }
        //console.log(list);

        this.props.setSession(this.props.currentTest, {
            length: list.length,
            list: list
        });

        this.unloadInstance();
        this.props.setTest(this.props.currentTest, {
            voiceRecorded: false,
            recording: false,
            playing: false,
            statusBar: "Play Audio File",
        });
        this.recordingClicked = false;

        if (this.recordInstance) {
            //console.log("unloading record");
            this.recordInstance.stopAndUnloadAsync();
        }
        else if (this.playbackInstance) {
            //console.log("unloaded audio");
            this.playbackInstance.unloadAsync();
        }
        this.props.navigation.navigate('SingleTest', {
            sessionStep: this.props.tests[this.props.currentTest].sessionStep + 1,
        });
    }
    onSessionReview() {
        this.props.navigation.navigate('SentenceValidatorReview');
    }
    onSessionEndSave() {
        //console.log("Saving Session");
    }
    onSessionEndedStartOver() {
        this.props.setTest(this.props.currentTest, {
            session: {
                "length": 0,
                "list": [],
            },
            sessionStep: 0,
            started: false,
            playing: false,
            recording: false,
            voiceRecorded: false,
            statusBar: "Play Audio File",
        });
    }
    onSessionEndedRedirection() {
        this.props.setTest(this.props.currentTest, {
            sessionStep: 0,
            started: false,
            playing: false,
            recording: false,
            voiceRecorded: false,
            statusBar: "Play Audio File",
        });
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'TestList'})
            ]
        }));

    }

    render() {
        //console.log(this.props.tests[this.props.currentTest].sessionStep + 1);
        //console.log(this.props.tests[this.props.currentTest].session);
        return (
            <View style={styles.globalView}>
                {this.props.isFocused
                    ? <View style={{flex:1}}>
                        { this.props.tests[this.props.currentTest].sessionStep > 19
                            ? <EndView
                                onSessionReview={this.onSessionReview}
                                onSessionStartOver={this.onSessionEndedStartOver}
                                onSessionSave={this.onSessionEndSave}
                                onSessionEnd={this.onSessionEndedRedirection}
                                {...this.props}
                            />
                            : <TestView {...this} />
                        }

                    </View>
                    : null
                }

            </View>
        );
    }
};

const styles = StyleSheet.create({
    globalView: {
        backgroundColor: G["bacground-color-view"],
        flex: 1,
    },
    centerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color :'white',
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        currentTest: state.currentTest,
        tests: state.tests,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setCurrentTest: testType => dispatch(setCurrentTest(testType)),
        setTest: (idTest, data) => dispatch(setTest(idTest, data)),
        setSession: (idTest, session) => dispatch(setSession(idTest, session)),
    };
};
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(SingleTest));