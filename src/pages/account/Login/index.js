import React, {PureComponent} from 'react';
import {View, Image, StatusBar, Text} from 'react-native';
import styled from 'styled-components';
import {pxToDp} from '../../../utils/styleKites';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import validator from '../../../utils/validator';
import request from '../../../utils/request';
import {ACCOUNT_LOGIN} from '../../../utils/pathMap';
console.log(ACCOUNT_LOGIN);
const ImageStyle = styled.Image.attrs({
  pxToDp: pxToDp,
})`
  width: 100%;
  height: ${props => props.pxToDp(200)};
`;

class Index extends PureComponent {
  state = {
    phoneNumber: '13329111665',
    phoneValid: true,
  };
  phoneNumberChange = phoneNumber => {
    this.setState({
      phoneNumber,
    });
  };

  //手机号码点击完后
  phoneNumberSubmitEditing = async () => {
    //对手机号进行校验
    const {phoneNumber} = this.state;
    const phoneValid = validator.validatePhone(phoneNumber);
    if (!phoneValid) {
      this.setState({
        phoneValid,
      });
      return;
    }

    const res = await request.post(ACCOUNT_LOGIN, {phone: phoneNumber});
    console.log(res, 'ffff');
  };
  render() {
    const {phoneNumber, phoneValid} = this.state;
    return (
      <View>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <ImageStyle
          source={require('../.././../images/res/profileBackground.jpg')}
        />
        <View>
          {/* 文字 */}
          <View style={{padding: pxToDp(20)}}>
            <View>
              <Text
                style={{
                  fontSize: pxToDp(25),
                  color: '#888',
                  fontWeight: 'bold',
                }}>
                手机号登录注册
              </Text>
            </View>
          </View>
        </View>

        <Input
          placeholder="请输入手机号码"
          maxLength={11}
          keyboardType="phone-pad"
          value={phoneNumber}
          inputStyle={{color: '#333'}}
          onChangeText={this.phoneNumberChange}
          leftIcon={{type: 'font-awesome', name: 'phone', color: '#ccc'}}
          errorMessage={phoneValid ? '' : '手机号码格式不正确'}
          onSubmitEditing={this.phoneNumberSubmitEditing}
        />
      </View>
    );
  }
}
export default Index;
