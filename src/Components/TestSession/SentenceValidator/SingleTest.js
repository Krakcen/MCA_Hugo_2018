import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';

import HugoButton from '../../UI/Buttons.js';
import HugoList from '../../UI/List';
import { setCurrentTest, setTest } from '../../../Redux/Actions';
import G, { gStyles } from '../../../Globals.js';

let EndScreen = ({onSessionEnd, ...props}) => {
    const endChoicesList = [
        {
            text: 'Save Session',
            chevronColor: G.buttons.success,
            onPress: onSessionEnd,
        },
        {
            text: 'Start Over',
            chevronColor: G.buttons.warning,
            onPress: onSessionEnd,
        },
        {
            text: 'Cancel and return to the selection screen',
            chevronColor: G.buttons.danger,
            onPress: onSessionEnd,
        },
    ];
    return (
        <View>
            <HugoList data={endChoicesList} />
        </View>
    );
};

class SingleTest extends React.Component {
    constructor(props) {
        super(props);

        this.onNextClick = this.onNextClick.bind(this);
        this.onSessionEndedRedirection = this.onSessionEndedRedirection.bind(this);
    }
    componentDidMount() {

    }
    /*shouldComponentUpdate(nextProps) {
        // Update only once after the screen disappears
        if (this.props.isFocused && !nextProps.isFocused) {
            return true
        }

        // Don't update if the screen is not focused
        if (!this.props.isFocused && !nextProps.isFocused) {
            return false
        }

        // Update the screen if its re-enter
        return !this.props.isFocused && nextProps.isFocused
    }*/
    //Update Session Here
    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            const { params } = nextProps.navigation.state;
            console.log(params["sessionStep"]);
            nextProps.setTest(nextProps.currentTest, {sessionStep: params["sessionStep"]});
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // screen exit
        }
    }
    onNextClick() {
        this.props.navigation.navigate('SingleTest', {
            sessionStep: this.props.tests[this.props.currentTest].sessionStep + 1,
        });
    }
    onSessionEndedRedirection() {
        this.props.setTest(this.props.currentTest, {sessionStep: 0, started: false});
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
                    ? <View>
                        { this.props.tests[this.props.currentTest].sessionStep == 3
                            ? <EndScreen onSessionEnd={this.onSessionEndedRedirection} {...this.props}/>
                            : <View>
                                <HugoButton onPress={this.onNextClick} text={this.props.tests[this.props.currentTest].sessionStep + " Step"} color={G["third-color"]} />
                            </View>
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
