import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { updateFocus } from 'react-navigation-is-focused-hoc';

import Store from './Redux/Store.js';
import DrawerNav from './Navigators.js';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.onNavStateChange = this.onNavStateChange.bind(this);
    }
    onNavStateChange(prevState, currentState) {
        console.log('onNavigationStateChange()');
        updateFocus(currentState);
    }
    render() {
        return (
            <Provider store={Store}>
                <DrawerNav onNavigationStateChange={this.onNavStateChange}/>
            </Provider>
        );
    }
}