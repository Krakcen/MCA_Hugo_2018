import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { gStyles } from '../../Globals.js';
import { ButtonPrimary } from '../UI/Buttons.js';

class HomePageScreen extends React.Component {
    render() {
        return (
            <View style={styles.globalView}>
                <ButtonPrimary text="Work in Progress" onPress={() => {alert("Hooray!")}}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    globalView: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryButton: {},
    secondaryButton: {},
});

//Redux Higher Order
const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePageScreen);