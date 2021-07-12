import React, {PureComponent} from 'react';
import {View} from 'react-native';
import Nav from './src/nav';
export default class App extends PureComponent {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1}}>
        <Nav />
      </View>
    );
  }
}
