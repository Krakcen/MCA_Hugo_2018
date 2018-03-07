import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import G, { gStyles } from '../../Globals.js';

import HugoList from '../UI/List.js';
import HugoButton from '../UI/Buttons.js';

const testList = [
    {
        text: 'Sentence Validator',
        subtitle: 'a test to measure the patient ability to restore vocally a serie of sentences',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="assistive-listening-systems" size={30} color={G["third-color"]} />,
        chevronColor: G["third-color"],
    },
    {
        text: 'Test 2',
        subtitle: 'to be implemented',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="heartbeat" size={30} color={G["third-color"]} />,
        chevronColor: G["third-color"],
    },
    {
        text: 'Test 3',
        subtitle: 'maybe',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="pencil" size={30} color={G["third-color"]} />,
        chevronColor: G["third-color"],
    },
];

export default class TestList extends React.Component {
    render() {
        return (
            <View style={styles.globalView}>
                <HugoList data={testList}/>
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