import React from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentTest, setTest } from '../../../Redux/Actions';
import { CheckBox } from 'react-native-elements';

import Header from '../../UI/Header.js';
import HugoButton from '../../UI/Buttons.js';
import G, { gStyles } from '../../../Globals.js';

class ReadyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.startTest = this.startTest.bind(this);
        this.continueTest = this.continueTest.bind(this);
    }
    startTest() {
        this.props.setCurrentTest("sentenceValidator");
        this.props.setTest("sentenceValidator", {
            started: true,
            session: {
                "length": 0,
                "list": [],
            }
        });
        this.props.navigation.navigate('SingleTest', {
            sessionStep: 0,
        });
    }
    continueTest() {
        this.props.setTest("sentenceValidator", {
            "started": false,
            "playing": false,
            "recording": false,
            "voiceRecorded": false,
        });
        this.props.navigation.navigate('SingleTest', {
            sessionStep: this.props.tests["sentenceValidator"].sessionStep,
        });
    }
    render() {
        //console.log(Dimensions.get('screen').height * 0.3 + " WTF");
        return (
            <View style={styles.globalView}>
                {this.props.tests[this.props.currentTest].sessionStep
                    ? <View style={{flex: 1}}>
                        <Header text="You have a session in progress" textStyle={{ color: 'black', fontSize: 18 }}/>
                        <View style={styles.sessionDescription}>
                            <View style={{flex: 1, justifyContent: 'space-around', alignItems:'center'}}>
                                <Text style={{fontSize: 14}}>Standard Mode</Text>
                                <Text style={{fontSize: 14}}>
                                    {"Progress: " + (this.props.tests[this.props.currentTest].sessionStep + 1) + "/20"}</Text>
                            </View>
                        </View>
                        <View style={styles.ButtonsGroup}>

                            <View style={styles.buttonBlock}>
                                <HugoButton onPress={this.continueTest} text="Continue Session" color={G["third-color"]}/>
                            </View>
                            <View style={styles.buttonBlock}>
                                <HugoButton onPress={this.startTest} text="Start new Session" color={G["secondary-color"]}/>
                            </View>
                        </View>
                    </View>
                    : <View style={{flex: 1}}>
                        <Header text="Ready ?" textStyle={{ color: 'black', fontSize: 18 }}/>
                        <View style={{backgroundColor: 'white', paddingBottom: 20}}>
                            <Header text="Mode" textStyle={{ color: 'black', fontSize: 14 }}/>
                            <CheckBox checked checkedColor={G['primary-color']} title='Standard'/>
                            {/*<CheckBox checkedColor={G['primary-color']} title='Practice'/>*/}
                        </View>
                        <View style={styles.ButtonsGroup}>
                            <HugoButton onPress={this.startTest} text="Start Session"/>
                        </View>
                    </View>
                }

            </View>
        );
    }
};
const styles = StyleSheet.create({
    globalView: {
        //backgroundColor: 'limegreen',
        backgroundColor: G["bacground-color-view"],
        flex: 1,
    },
    sessionDescription: {
        backgroundColor: 'white',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.3,
        //elevation: 5,
    },
    buttonBlock: {
    },
    ButtonsGroup: {
        //backgroundColor: 'purple',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
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
        setTest: (idTest, data) => dispatch(setTest(idTest, data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReadyScreen);
