import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

import { gStyles } from '../../../Globals.js';

export default class ReadyScreen extends React.Component {
    render() {
        return (
            <View style={styles.globalView}>
                <Button onPress={() => { this.props.navigation.navigate('Proto') }} title="Proto"/>
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