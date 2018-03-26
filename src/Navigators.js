import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Icon, Text, TouchableOpacity, View, Easing, Animated } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import { HomePageScreen, AboutScreen, ProfileScreen, SettingsScreen, TestListScreen } from './Components';
import G, { gStyles } from './Globals.js';
import { ReadyScreen, SingleTest } from './Components/TestSession/SentenceValidator';
import { transitionTest, transitionPress, transitionSlideLeft, transitionSlideTop } from './Components/UI/Animations';

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

////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////

const SettingsNav = StackNavigator({
    'Settings': {
        'screen': SettingsScreen,
        'navigationOptions': ({ navigation }) => ({
            title: 'Settings',
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

//SentenceValidator Navigator
const SentenceValidatorNav = StackNavigator({
    'SentenceValidatorStart': {
        'screen': ReadyScreen,
        'navigationOptions': ({ navigation }) => ({
            title: 'Sentence Validator',
            drawerLockMode: 'locked-closed',
        })
    },
    'SingleTest': {
        'screen': SingleTest,
        'navigationOptions': ({ navigation }) => ({
            title: 'Single Test',
            drawerLockMode: 'locked-closed',
        })
    }
}, {
    initialRouteName: 'SentenceValidatorStart',
    transitionConfig: transitionSlideTop,
    headerMode: 'none',
});

/////////////////////////////

const TestSessionNav = StackNavigator({
    'TestList': {
        'screen': TestListScreen,
        'navigationOptions': ({ navigation }) => ({
            title: 'Choose a Test',
            headerLeft: <HamburgerHeader navigation={navigation}/>,
        })
    },
    'SentenceValidatorReady': {
        'screen': SentenceValidatorNav,
        'navigationOptions': ({ navigation }) => ({
            title: 'Sentence Validator',
        })
    }
}, {
    initialRouteName: 'TestList',
    transitionConfig: transitionSlideLeft,
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
//

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
        'screen': SettingsNav,
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