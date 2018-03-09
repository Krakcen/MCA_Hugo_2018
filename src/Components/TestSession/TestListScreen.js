import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import G, { gStyles } from '../../Globals.js';
import { testList } from './Data';

import HugoList from '../UI/List.js';
import HugoButton from '../UI/Buttons.js';

export default class TestListScreen extends React.Component {
    componentWillMount() {
        this._testList = testList;
        for (let el in this._testList) {
            if (this._testList[el].text == "Sentence Validator") {
                this._testList[el].onPress = () => this.props.navigation.navigate('SentenceValidatorReady');
            }
        }
    }
    render() {
        return (
            <View style={styles.globalView}>
                <HugoList data={this._testList}/>
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