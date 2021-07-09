import React, {PureComponent} from 'react';
import {View} from 'react-native';
import Nav from './src/nav';
export default class App extends PureComponent {
  render() {
    return (
      <View style={{flex: 1}}>
        <Nav />
      </View>
    );
  }
}
