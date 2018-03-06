import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

import { gStyles } from '../../Globals.js';

export default class TestSessionScreen extends React.Component {
    render() {
        return (
            <View style={styles.globalView}>
                <Text style={styles.centerText}>Test Session</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    globalView: {
        backgroundColor: 'crimson',
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