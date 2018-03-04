import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Image } from 'react-native';
import { styles } from '../../Globals.js';

class HomePageScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return ({
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../../Res/DrawerIcons/home.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        });
    };
    render() {
        return (
            <Text style={{ fontSize: 50, paddingTop: 100 }}>
                J'aime les Moules et les frites
            </Text>
        );
    }
};

//Redux Higher Order
const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePageScreen);