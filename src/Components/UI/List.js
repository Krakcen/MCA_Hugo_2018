import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import G from '../../Globals';

const HugoItem = ({ item, index }) => {
    return (
        <TouchableOpacity onPress={() => (item.onPress ? item.onPress() : null) }>
            <ListItem
                titleNumberOfLines={10}
                subtitleNumberOfLines={10}
                containerStyle={[itemStyle.containerStyle, (index == 0) ? { marginTop:10 } : null]}
                wrapperStyle={itemStyle.wrapperStyle}
                titleContainerStyle={itemStyle.titleContainerStyle}
                titleStyle={itemStyle.titleStyle}
                subtitleContainerStyle={itemStyle.subtitleContainerStyle}
                subtitleStyle={itemStyle.subtitleStyle}
                rightTitleContainerStyle={itemStyle.rightTitleContainerStyle}
                rightTitleStyle={itemStyle.rightTitleStyle}
                title={ item.text || null }
                rightTitle={ item.rightTitle || null }
                subtitle={ item.subtitle || null }
                leftIcon={ item.icon || null}
                chevronColor={item.chevronColor || null}
                hideChevron={item.hideChevron || null}
            />
        </TouchableOpacity>
    );
};
const HugoList = ({ data }) => {
    return (
        <List containerStyle={ styles.list }>
            <FlatList
                data={data}
                renderItem={HugoItem}
                keyExtractor={(item, index) => (item.text + "_" + index.toString())}
            />
        </List>
    );
};
const itemStyle = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        marginBottom: 10,
        flex: 1,
        justifyContent: 'center',
        minHeight: 80,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0)',
        borderRadius: 15,
        elevation: 2,
    },
    wrapperStyle: {
        //backgroundColor: '#ffb85c',
    },
    titleStyle: {
        //backgroundColor: '#76ff3e',
        fontSize: 18,
        fontWeight: 'bold',
    },
    titleContainerStyle: {
        //backgroundColor: '#009d09',

    },
    subtitleContainerStyle: {
    },
    subtitleStyle: {
        fontSize: 14,
    },
    rightTitleContainerStyle: {
        //backgroundColor: '#3033ff',
    },
    rightTitleStyle: {
    },
});
const styles = StyleSheet.create({
    list: {
        paddingLeft:10,
        paddingRight:10,
        marginTop:0,
        backgroundColor: G["bacground-color-view"],
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
});

export default HugoList;