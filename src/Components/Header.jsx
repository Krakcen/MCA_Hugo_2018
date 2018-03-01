import React from 'react';
import { View, Text } from 'react-native';

import G from '../Globals.js';

const Header = () => {
    return (
        <View>
            <Text>{ G["app-name"] }</Text>
        </View>
    );
};

export default Header;