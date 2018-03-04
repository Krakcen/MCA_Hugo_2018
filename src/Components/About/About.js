import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { styles } from '../../Globals.js';

export default class AboutScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'About',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../../Res/DrawerIcons/about.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={aboutStyles.view}>
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    title="Open Menu"
                />
            </View>
        );
    }
};

const aboutStyles = StyleSheet.create({
    view: {
        paddingTop: 50
    }
});