import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import G from '../../Globals';

export const aboutList = [
    {
        text: 'Item #1',
        subtitle: 'this is the first item of the list',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="check" size={30} color={G.buttons.warning} />,
        chevronColor: G.buttons.danger,
    },
    {
        text: 'Item #2',
        subtitle: 'second item',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="truck" size={30} color={G.buttons.success} />,
        chevronColor: G.buttons.warning,
    },
    {
        text: 'Item #3',
        chevronColor: 'dodgerblue',
    },
    {
        text: 'Item #4',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="wrench" size={30} color={G.buttons.danger} />,
        chevronColor: G.buttons.success,
    },
    {
        subtitle: 'Item #5',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="android" size={30} color='dodgerblue' />,
        chevronColor: G['secondary-color'],
    },
];
