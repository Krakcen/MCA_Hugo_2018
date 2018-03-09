import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import G from '../../Globals';

export const testList = [
    {
        text: 'Sentence Validator',
        subtitle: 'a test to measure the patient ability to restore vocally a serie of sentences',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="assistive-listening-systems" size={30} color={G["third-color"]} />,
        chevronColor: G["third-color"],
    },
    {
        text: 'Test 2',
        subtitle: 'to be implemented',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="heartbeat" size={30} color={G["third-color"]} />,
        chevronColor: G["third-color"],
    },
    {
        text: 'Test 3',
        subtitle: 'maybe',
        icon: <Icon style={{ paddingRight:15, paddingLeft:10 }} name="pencil" size={30} color={G["third-color"]} />,
        chevronColor: G["third-color"],
    },
];