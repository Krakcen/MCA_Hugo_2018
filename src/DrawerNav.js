import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Icon, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import { HomePageScreen, AboutScreen, ProfileScreen, SettingsScreen, TestSessionScreen } from './Components';
import G, { gStyles } from './Globals.js';
import { TestList, ReadyScreen, Proto } from './Components/TestSession';

const HamburgerHeader = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={ () => navigation.navigate('DrawerOpen') }>
            <Image
                style={{ tintColor: '#fff', marginLeft:15, width: 25, height: 25}}
                source={require('./Res/DrawerIcons/hamburger-square.png')}
            />
        </TouchableOpacity>
    );
};

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={customDrawerStyles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);
const customDrawerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const AboutNav = StackNavigator({
    'About': {
        'screen': AboutScreen,
        'navigationOptions': ({ navigation }) => ({
            title: 'About',
            headerStyle: {
                backgroundColor: G["primary-color"],
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: "center",
                flex: 1,
            },
            headerRight: <View/>,
            headerLeft: <HamburgerHeader navigation={navigation}/>,
        })
    },
});

const TestSessionNav = StackNavigator({
    'TestList': {
        'screen': TestList,
        'navigationOptions': ({ navigation }) => ({
            title: 'Choose a Test',
            headerLeft: <HamburgerHeader navigation={navigation}/>,
        })
    },
    'SentenceValidatorReady': {
        'screen': ReadyScreen,
        'navigationOptions': ({ navigation }) => ({
            title: 'Sentence Validator',
        })
    },
    'Proto': {
        'screen': Proto,
        'navigationOptions': ({ navigation }) => ({
            title: 'Proto',
        })
    }
}, {
    initialRouteName: 'TestList',
    'navigationOptions': ({ navigation }) => ({
        headerStyle: {
            backgroundColor: G["primary-color"],
        },
        headerTintColor: '#fff',
        headerRight: <View/>,
        headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
            flex: 1,
        },
    })
});

const DrawerNav = DrawerNavigator({
    'Home': {
        'screen': HomePageScreen,
        'navigationOptions': {
            'drawerLabel': 'Home',
            'drawerIcon': ({ tintColor }) => (
                <Image
                    source={require('./Res/DrawerIcons/home.png')}
                    style={[gStyles.icon, { tintColor: tintColor }]}
                />
            ),
        },
    },
    'TestSession': {
        'screen': TestSessionNav,
        'navigationOptions': {
            'drawerLabel': 'Test Sessions',
            'drawerIcon': ({ tintColor }) => (
                <Image
                    source={require('./Res/DrawerIcons/session.png')}
                    style={[gStyles.icon, { tintColor: tintColor }]}
                />
            ),
        },
    },
    'Profile': {
        'screen': ProfileScreen,
        'navigationOptions': {
            'drawerLabel': 'Profile',
            'drawerIcon': ({ tintColor }) => (
                <Image
                    source={require('./Res/DrawerIcons/profile.png')}
                    style={[gStyles.icon, { tintColor: tintColor }]}
                />
            ),
        },
    },
    'Settings': {
        'screen': SettingsScreen,
        'navigationOptions': {
            'drawerLabel': 'Settings',
            'drawerIcon': ({ tintColor }) => (
                <Image
                    source={require('./Res/DrawerIcons/settings.png')}
                    style={[gStyles.icon, { tintColor: tintColor }]}
                />
            ),
        },
    },
    'About': {
        'screen': AboutNav,
        'navigationOptions': {
            'drawerLabel': 'About',
            'drawerIcon': ({ tintColor }) => (
                <Image
                    source={require('./Res/DrawerIcons/about.png')}
                    style={[gStyles.icon, { tintColor: tintColor }]}
                />
            ),
        },
    }
}, {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
        activeTintColor: G["primary-color"],
    }
});

export default DrawerNav;