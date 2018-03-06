import React from 'react';
import { ScrollView, View, Text, Button, Image, StyleSheet, StatusBar, Platform } from 'react-native';
import GridView from 'react-native-super-grid';

import G, { gStyles } from '../../Globals.js';
import HugoButton, { ButtonSuccess, ButtonDanger, ButtonPrimary, ButtonSecondary, ButtonWarning } from '../UI/Buttons.js';
import Header from '../UI/Header.js';

///////// Grid //////////
const items = [
    { desc: "Primary", color: G["primary-color"] },
    { desc: "Secondary", color: G["secondary-color"] },
    { desc: "Success", color: G.buttons["success"] },
    { desc: "Warning", color: G.buttons["warning"] },
    { desc: "Danger", color: G.buttons["danger"] },
];

const renderButtonPanel = (item) => {
    return (
        <View style={[styles.itemContainer]}>
            <Text style={styles.itemText}>{ item.desc }</Text>
            <HugoButton onPress={() => {}} text="Button" color={item.color} />
        </View>
    );
};
///////////////////////////

export default class AboutScreen extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    <Header text="Button Showcase" textStyle={{ color: 'black', fontSize: 18 }}/>
                    <View style={styles.buttonGrid}>
                        <GridView
                            itemDimension={160}
                            items={items}
                            style={styles.gridView}
                            renderItem={renderButtonPanel}
                        />
                    </View>
                    <Header text="Proto" wrapperStyle={{ marginTop: 10 }} textStyle={{ color: 'black', fontSize: 18 }}/>
                    <View style={styles.lorem}>
                        <Text>{ G.lorem }</Text>
                    </View>

                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    buttonGrid: {
        flex:1,
        marginBottom: 10,
        backgroundColor: '#f1f1f1',
    },
    buttonGridRow: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    //Proto Content
    lorem: {
        backgroundColor: '#f1f1f1',
        paddingTop: 10,
        paddingBottom: 10,
    },

    //Grid Content
    gridView: {
        flex: 1,
    },
    itemContainer: {
        padding: 10,
        backgroundColor: 'white',
        elevation: 5,
    },
    itemText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    }
});