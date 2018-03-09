import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

import G, { gStyles } from '../../Globals.js';
import HugoList from '../UI/List';
import { settingsList } from './Data';


export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.globalView}>
                <HugoList data={settingsList}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    globalView: {
        flex:1,
        backgroundColor: G["bacground-color-view"],
    },
});