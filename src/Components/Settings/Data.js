import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import G from '../../Globals';

import { Constants } from 'expo';


export const settingsList = [
    {
        text: 'Version',
        subtitle: Constants.manifest.version,
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="sort-numeric-asc" size={30} color={G["third-color"]} />,
        chevronColor: G.buttons.danger,
        hideChevron: true,
    },
];
