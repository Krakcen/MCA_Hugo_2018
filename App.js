import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Header } from './src/Components';

export default class App extends React.Component {
  render() {
    return (
      <View>
          <Header/>
      </View>
    );
  }
}