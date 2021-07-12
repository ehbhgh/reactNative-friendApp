import React, {PureComponent} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {pxToDp} from '../../utils/styleKites';
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: pxToDp(5),
    width: '100%',
    height: '100%',
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    fontSize: pxToDp(18),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
class Index extends PureComponent {
  static defaultProps = {
    style: {},
    TextStyle: {},
    disabled: false,
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          height: '100%',
          ...this.props.style,
          overflow: 'hidden',
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#9b63cd', '#e0708c']}
          style={styles.linearGradient}>
          <Text style={{...styles.buttonText, ...this.props.TextStyle}}>
            {this.props.children}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default Index;
