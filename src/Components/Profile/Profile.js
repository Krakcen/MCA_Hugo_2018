import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import G, { gStyles } from '../../Globals.js';

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={styles.globalView}>
                <Text style={styles.centerText}>Profile</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    globalView: {
        backgroundColor: G["primary-color"],
        color :'white',
        fontWeight: 'bold',
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