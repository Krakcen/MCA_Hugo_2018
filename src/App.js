import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Store from './Redux/Store.js';
import { HomePageScreen, AboutScreen } from './Components';
//import AboutScreen from './Components/About/About.js';


//Proto
class MyHomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./Res/DrawerIcons/home.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

console.log(AboutScreen);
console.log(MyHomeScreen);

const MyApp = DrawerNavigator({
    Home: {
        screen: HomePageScreen,
    },
    Notifications: {
        screen: AboutScreen,
    },
});
//

/*const RootStack = DrawerNavigator({
        'Home': {
            'screen': HomePageScreen,
        },
        'About': {
            'screen': AboutScreen,
        }
    });*/

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <MyApp/>
            </Provider>
        );
    }
}