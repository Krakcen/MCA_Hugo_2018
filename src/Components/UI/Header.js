import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import G from '../../Globals.js';

const Header = ({ text, textStyle = {}, wrapperStyle = {} }) => {
    return (
        <View style={[headerStyles.headerWrapper, wrapperStyle]}>
            <Text style={[headerStyles.header, textStyle]}>
                { text }
            </Text>
        </View>
    );
};

const headerStyles = StyleSheet.create({
    headerWrapper: {
        display: 'flex',
        marginBottom: G.header["marginBottom"],
        marginTop: G.header["marginTop"],
        alignItems: G.header["alignItems"],
    },
    header: {
        fontWeight: G.header["fontWeight"],
        fontSize: G.header["fontSize"],
        color: G.header["color"],
    },
});

export default Header;