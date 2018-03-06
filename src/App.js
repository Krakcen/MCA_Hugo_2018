import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { Provider } from 'react-redux';

import Store from './Redux/Store.js';
import DrawerNav from './DrawerNav.js';

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <DrawerNav/>
            </Provider>
        );
    }
}