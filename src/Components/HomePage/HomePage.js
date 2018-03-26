import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';

import G, { gStyles } from '../../Globals.js';
import HugoButton, { ButtonPrimary } from '../UI/Buttons.js';

const whichOrientation = () => {
    const dim = Dimensions.get('screen');

    if (dim.height >= dim.width)
        return ("portrait");
    return ("landscape");
};

class HomePageScreen extends React.Component {
    render() {
        return (
            <View style={styles.globalView} onLayout={event => this.forceUpdate()}>
                { (whichOrientation() == "portrait")
                    ? <View style={{ flex:1 }}>
                        <View>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('DrawerOpen') }>
                                <Image
                                    style={ styles.hamburgerIcon }
                                    source={require('../../Res/DrawerIcons/hamburger-square.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={ styles.contentView }>
                            <View style={ styles.appIconWrapper }>
                                <Image resizeMode='cover' style={ styles.appIcon } source={require('../../Res/Brand/brand-text-white.png')}/>
                            </View>
                            {/*<View style={ styles.appNameWrapper }>
                                <Text style={ styles.appName }>{ G["app-name"] }</Text>
                            </View>*/}
                            <View style={ styles.buttonGroupWrapper }>
                                <HugoButton
                                    onPress={() => this.props.navigation.navigate('TestSession')}
                                    text="New Test"
                                    color={ '#BF5D36' }
                                />
                            </View>
                        </View>
                    </View>
                    : <View style={{ flex:1 }}>
                        <View>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('DrawerOpen') }>
                                <Image

                                    style={ landscapeStyles.hamburgerIcon }
                                    source={require('../../Res/DrawerIcons/hamburger-square.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={ landscapeStyles.contentView }>

                            <View style={ landscapeStyles.brand }>
                                <View style={ landscapeStyles.appIconWrapper }>
                                    <Image
                                        style={ landscapeStyles.appIcon }
                                        source={require('../../Res/Brand/st-blanc-ligne.png')}
                                    />
                                </View>
                            </View>
                            {/*<View style={ landscapeStyles.brand }>
                                <View style={ landscapeStyles.appIconWrapper }>
                                    <Image style={ landscapeStyles.appIcon } resizeMode={'contain'} source={require('../../Res/Brand/st-blanc-ligne.png')}/>
                                </View>
                            </View>*/}

                        </View>
                    </View>
                }
            </View>
        );
    }
};


const styles = StyleSheet.create({
    globalView: {
        paddingTop: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
        flex:1,
        backgroundColor: G["primary-color"],
    },
    hamburgerIcon: {
        //backgroundColor: 'blue',
        tintColor: '#fff',
        marginTop: 15,
        marginLeft: 15,
        width: 30,
        height: 30,
    },
    contentView: {
        //backgroundColor: 'limegreen',
        margin: 20,
        flex:1,
    },
    appIconWrapper: {
        //flex:1,
        //backgroundColor: 'purple',

        alignItems: 'center',
        paddingTop: 20,
        paddingBottom:20,
    },
    appIcon: {
        width: 200,
        height: 100
    },
    appNameWrapper: {
        //flex:1,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom:10,
    },
    appName: {
        fontSize: 30,
        color: '#fff',
        fontFamily: 'sans-serif-medium',
    },
    buttonGroupWrapper: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
});

const landscapeStyles = StyleSheet.create({
    brand: {
        //backgroundColor: 'orange',
        width: Dimensions.get('screen').width / 1.2,
        alignItems: 'center',
    },
    hamburgerIcon: {
        //backgroundColor: 'blue',
        tintColor: '#fff',
        marginTop: 15,
        marginLeft: 15,
        width: 30,
        height: 30,
    },
    contentView: {
        //backgroundColor: 'limegreen',
        margin: 20,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appIconWrapper: {
        //backgroundColor: 'purple',
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch"
    },
    appIcon: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    appNameWrapper: {
        //flex:1,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom:10,
    },
    appName: {
        fontSize: 30,
        color: '#fff',
        fontFamily: 'sans-serif-medium',
    },
    buttonGroupWrapper: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

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

//FONT TESTING ANDROID
/*
 <Text style={{ fontFamily: 'monospace' }}>monospace</Text>
 <Text style={{ fontFamily: 'Roboto' }}>Roboto</Text>
 <Text style={{ fontFamily: 'notoserif' }}>notoserif</Text>
 <Text style={{ fontFamily: 'normal' }}>normal</Text>
 <Text style={{ fontFamily: 'sans-serif' }}>sans-serif</Text>
 <Text style={{ fontFamily: 'sans-serif-light' }}>sans-serif-light</Text>
 <Text style={{ fontFamily: 'sans-serif-thin' }}>sans-serif-thin</Text>
 <Text style={{ fontFamily: 'sans-serif-condensed' }}>sans-serif-condensed</Text>
 <Text style={{ fontFamily: 'sans-serif-medium' }}>sans-serif-medium</Text>
 <Text style={{ fontFamily: 'serif' }}>serif</Text>
 */