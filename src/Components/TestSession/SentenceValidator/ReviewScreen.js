import React from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-elements';
import { Audio, Permissions, FileSystem } from 'expo';
import GridView from 'react-native-super-grid';


import HugoButton from '../../UI/Buttons.js';
import HugoList from '../../UI/List';
import Header from '../../UI/Header.js';
import { setCurrentTest, setTest, setSession } from '../../../Redux/Actions';
import G, { gStyles } from '../../../Globals.js';

const renderSoundItem = item => (
    <TouchableOpacity disabled={!item.active} onPress={ item.active ? (() => item.play(item.id)) : null}>
        <View style={[soundItemStyles.itemContainer, { backgroundColor: item.color ? G.buttons.success : G.buttons.danger, opacity: item.active ? 1 : 0.4 }]}>
            <View style={{flex: 1, justifyContent: 'space-around', }}>
                <View style={{minHeight: 50, maxHeight: 50}}>
                    <Image
                        resizeMode='contain'
                        style={{ flex:1, width: null, height: null,}}
                        source={item.playing ? require('../../../Res/UI/pause_raw.png') : require('../../../Res/UI/play_raw.png')}
                    />
                </View>
                <View style={{alignItems:'center',}}>
                    <Text style={soundItemStyles.itemName}>{item.name}</Text>
                    <Text style={soundItemStyles.itemCode}>{item.code}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);
const soundItemStyles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        flex:1,
        justifyContent: 'space-around',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        alignItems:'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        alignItems:'center',
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});

class ReviewScreen extends React.Component {
    constructor(props) {
        super(props);

        this.onTestPlay = this.onTestPlay.bind(this);
        this.updateGrid = this.updateGrid.bind(this);

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
        this.errorDisplay = false;
        this.state = {
            soundPlaying: false,
            sessionSounds: [],
        };
        this.sessionList = this.props.tests[this.props.currentTest].session.list;
        if (!this.sessionList)
            this.errorDisplay = true;

        //init
        for (let i in this.sessionList) {
            this.state.sessionSounds.push({
                name: '#' + (this.sessionList[i].step + 1) + ': ' + (this.sessionList[i].validation ? "Correct" : "Incorrect"),
                code: 'Response Time: ' + this.sessionList[i].responseTime + ' sec',
                color: this.sessionList[i].validation,
                id: this.sessionList[i].step,
                play: this.onTestPlay,
                active: true,
                playing: false,
            });
        }
    }
    updateGrid(id) {
        const list = [];
        if (id == null) {
            for (let i in this.sessionList) {
                list.push({
                    name: '#' + (this.sessionList[i].step + 1) + ': ' + (this.sessionList[i].validation ? "Correct" : "Incorrect"),
                    code: 'Response Time: ' + this.sessionList[i].responseTime + ' sec',
                    color: this.sessionList[i].validation,
                    id: this.sessionList[i].step,
                    play: this.onTestPlay,
                    active: true,
                    playing:false,
                });
            }
            this.setState({
                sessionSounds: list,
                soundPlaying: false,
            });
        }
        else {
            for (let i in this.sessionList) {
                list.push({
                    //name: '#' + (this.sessionList[i].step + 1) + ': ' + (this.sessionList[i].validation ? "Correct" : "Incorrect"),
                    name: (id == i ? "Playing" : "Waiting"),
                    code: 'Response Time: ' + this.sessionList[i].responseTime + ' sec',
                    color: this.sessionList[i].validation,
                    id: this.sessionList[i].step,
                    play: this.onTestPlay,
                    active: (id == i),
                    playing: (id == i),
                });
            }
            this.setState({
                sessionSounds: list,
                soundPlaying: true,
            });
        }

    }
    onTestPlay(id) {
        this.updateGrid(id);
        setTimeout(() => { this.updateGrid(null); }, 3000);
    }
    componentWillReceiveProps(nextProps) {
        //Update Session Here
        if (!this.props.isFocused && nextProps.isFocused) {
            const { params } = nextProps.navigation.state;
        }
        if (this.props.isFocused && !nextProps.isFocused) {
        }
    }
    render() {
        return (
            <View style={reviewStyles.globalWrapper}>
                <View style={reviewStyles.contentWrapper}>
                    <Header text="Session Review" textStyle={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}/>
                    {this.errorDisplay
                        ? <View style={reviewStyles.errorWrapper}>
                            <Header text="Could not display results" textStyle={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}/>
                        </View>
                        : <View style={reviewStyles.gridWrapper}>
                            <GridView
                                itemDimension={130}
                                items={this.state.sessionSounds}
                                style={{flex:1}}
                                renderItem={renderSoundItem}
                            />
                        </View>
                    }

                </View>
            </View>
        );
    }
}
const reviewStyles = StyleSheet.create({
    globalWrapper: {
        flex: 1,
        //backgroundColor: G["bacground-color-view"],
    },
    contentWrapper: {
        marginTop: StatusBar.currentHeight,
        flex:1,
        //backgroundColor: 'limegreen',
    },
    gridWrapper: {
        flex: 1,
        margin: 15,
        //backgroundColor: G["third-color"],
    },
    errorWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
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
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(ReviewScreen));