import React from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-elements';
import { Audio, Permissions, FileSystem } from 'expo';


import HugoButton from '../../UI/Buttons.js';
import HugoList from '../../UI/List';
import Header from '../../UI/Header.js';
import { setCurrentTest, setTest } from '../../../Redux/Actions';
import G, { gStyles } from '../../../Globals.js';

let EndView = ({onSessionEnd, onSessionStartOver, onSessionSave, ...props}) => {
    const endChoicesList = [
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
                <Text style={{color: G["secondary-color"]}}>{ctx.sentenceList[props.tests[props.currentTest].sessionStep]}</Text>
            </View>
            <View style={ testViewStyles.soundGroupWrapper }>
                <View style={testViewStyles.imageSoundWrapper}>
                    <TouchableOpacity
                        disabled={props.tests[props.currentTest].recording}
                        style={{ flex:1}}
                        activeOpacity={0.4}
                        onPress={ctx.loadNewPlaybackInstance}
                    >
                        <Image
                            resizeMode='contain'
                            style={{ flex:1, width: null, height: null, opacity: props.tests[props.currentTest].recording ? 0.4 : null}}
                            source={props.tests[props.currentTest].playing ? require('../../../Res/UI/play2.png') : require('../../../Res/UI/playsleep.png')}
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
                            onPress={ctx.onNextClick}
                            text={"Correct"}
                            color={G.buttons.success}
                        />
                    </View>
                    <View>
                        <HugoButton
                            onPress={ctx.onNextClick}
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

        const soundPathProto = "./Sounds/";
        const soundTypeProto = ".mp3";
        this.soundListProto = [
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

        this.onNextClick = this.onNextClick.bind(this);

        this.onSessionEndedRedirection = this.onSessionEndedRedirection.bind(this);
        this.onSessionEndedStartOver = this.onSessionEndedStartOver.bind(this);
        this.onSessionEndSave = this.onSessionEndSave.bind(this);

        this.loadNewPlaybackInstance = this.loadNewPlaybackInstance.bind(this);
        this.unloadInstance = this.unloadInstance.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.onRecordUpdate = this.onRecordUpdate.bind(this);
        this.playPatientAnswer = this.playPatientAnswer.bind(this);
        this.onPatientPlaybackUpdate = this.onPatientPlaybackUpdate.bind(this);

        this.onPlaybackUpdate = this.onPlaybackUpdate.bind(this);

        (async () => {
            const {status} = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
            console.log(status);
        })();
    }
    componentDidMount() {
        //this.loadNewPlaybackInstance();

    }
    playPatientAnswer() {
        console.log("playing patient answer");
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
                console.log("patient audio finished playing waiting");
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
                console.log("instance unloaded!")
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async loadNewPlaybackInstance() {
        this.props.setTest(this.props.currentTest, {
            playing: true,
        });

        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
            console.log("previous instance unloaded");
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
    async startRecording() {
        this.props.setTest(this.props.currentTest, {
            recording: true,
        });

        this.recordInstance = new Audio.Recording();
        try {
            await this.recordInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            //console.log("Recording Prepared");

            this.recordInstance.setOnRecordingStatusUpdate(this.onRecordUpdate);

            await this.recordInstance.startAsync();
            //console.log("Recording");

            this.props.setTest(this.props.currentTest, {
                statusBar: "Currently Recording",
                voiceRecorded: false,
            });
        }
        catch (e) {

        }
    }
    async stopRecording() {
        try {
            if (this.recordInstance != null) {
                await this.recordInstance.stopAndUnloadAsync();
                //console.log("Record Stopped");

                //const info = await FileSystem.getInfoAsync(this.recordInstance.getURI());
                //console.log(`FILE INFO: ${JSON.stringify(info)}`);

                const { sound, status } = await this.recordInstance.createNewLoadedSound({},
                    (status) => {
                        if (status.isLoaded) {
                            console.log("isLoadedCallback");
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
    componentWillUnmount() {
        console.log('Will Unmount');
        this.unloadInstance();
    }
    componentWillReceiveProps(nextProps) {
        //Update Session Here
        if (!this.props.isFocused && nextProps.isFocused) {
            const { params } = nextProps.navigation.state;
            //console.log(params["sessionStep"]);
            nextProps.setTest(nextProps.currentTest, {sessionStep: params["sessionStep"]});
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // screen exit
        }
    }
    onPlaybackUpdate(playbackStatus) {
        if (!playbackStatus.isLoaded) {
            //console.log("audio unloaded");
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
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
        if (status.canRecord) {
            //console.log("can record");
        } else if (status.isDoneRecording) {
            this.props.setTest(this.props.currentTest, {
                recording: false,
                statusBar: "Record Ended, creating audio file...",
            });
        }
    }
    onNextClick() {
        this.unloadInstance();
        this.props.setTest(this.props.currentTest, {
            voiceRecorded: false,
            statusBar: "Play Audio File",
        });
        this.props.navigation.navigate('SingleTest', {
            sessionStep: this.props.tests[this.props.currentTest].sessionStep + 1,
        });
    }

    onSessionEndSave() {
        console.log("Saving Session");
    }
    onSessionEndedStartOver() {
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
                NavigationActions.navigate({ routeName: 'SingleTest'})
            ]
        }));
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
        return (
            <View style={styles.globalView}>
                {this.props.isFocused
                    ? <View style={{flex:1}}>
                        { this.props.tests[this.props.currentTest].sessionStep > 9
                            ? <EndView
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
        setTest: (idTest, data) => dispatch(setTest(idTest, data))
    };
};
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(SingleTest));
