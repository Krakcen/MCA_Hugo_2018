import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentTest, setTest } from '../../../Redux/Actions';

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
        this.props.setTest("sentenceValidator", { started: true });
        this.props.navigation.navigate('SingleTest', {
            sessionStep: 0,
        });
    }
    continueTest() {
        this.props.navigation.navigate('SingleTest', {
            sessionStep: this.props.tests["sentenceValidator"].sessionStep,
        });
    }
    render() {
        return (
            <View style={styles.globalView}>
                {this.props.tests["sentenceValidator"].sessionStep
                    ? <View>
                        <HugoButton onPress={this.continueTest} text="Continue Session" color={G["third-color"]}/>
                        <HugoButton onPress={this.startTest} text="Start new Session" color={G["secondary-color"]}/>
                    </View>
                    : <View>
                        <Text>Start a new Session</Text>
                        <HugoButton onPress={this.startTest} text="Start Session"/>
                    </View>
                }

            </View>
        );
    }
};
const styles = StyleSheet.create({
    globalView: {
        backgroundColor: G["bacground-color-view"],
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
export default connect(mapStateToProps, mapDispatchToProps)(ReadyScreen);
