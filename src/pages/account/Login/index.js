/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {View, Image, StatusBar, StyleSheet, Text} from 'react-native';
import styled from 'styled-components';
import {pxToDp} from '../../../utils/styleKites';
import {Input} from 'react-native-elements';
import validator from '../../../utils/validator';
import request from '../../../utils/request';
import {ACCOUNT_LOGIN} from '../../../utils/pathMap';
import ChangeColorBtn from '../../../components/ChangColorBtn';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';

const ImageStyle = styled.Image.attrs({
  pxToDp: pxToDp,
})`
  width: 100%;
  height: ${props => props.pxToDp(200)};
`;
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: '#7d53ea',
  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});
class Index extends PureComponent {
  state = {
    phoneNumber: '13329111665',
    phoneValid: true,
    //是否显示登录页面
    showLogin: true,
    value: '',
    //倒计时按钮的文本
    btnText: '重新获取',

    //是否在倒计时中
    isCountDowning: false,
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
    if (res.data.code === '10000') {
      this.setState({
        showLogin: false,
      });
      //开启定时器
      this.cuntDown();
    } else {
    }
  };

  //获取验证码定时器
  cuntDown = () => {
    if (this.state.isCountDowning) {
      return;
    }
    this.setState({
      isCountDowning: true,
    });
    let seconds = 5;
    this.setState({
      btnText: `重新获取${seconds}s`,
    });
    let timeInterval = setInterval(() => {
      seconds--;
      this.setState({
        btnText: `重新获取${seconds}s`,
      });
      if (seconds === 0) {
        clearInterval(timeInterval);
        this.setState({
          btnText: '重新获取',
        });
      }
    }, 1000);
  };

  //点击重新获取按钮
  repGetRoCode = () => {
    this.cuntDown();
  };
  //渲染登录页面
  renderLogin = () => {
    const {phoneNumber, phoneValid} = this.state;
    return (
      <View>
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
        {/* 输入框 */}
        <View style={{marginTop: pxToDp(30)}}>
          <Input
            placeholder="请输入手机号码"
            maxLength={11}
            keyboardType="phone-pad"
            value={phoneNumber}
            inputStyle={{color: '#ccc'}}
            onChangeText={this.phoneNumberChange}
            leftIcon={{
              type: 'font-awesome',
              name: 'phone',
              color: '#ccc',
            }}
            errorMessage={phoneValid ? '' : '手机号码格式不正确'}
            onSubmitEditing={this.phoneNumberSubmitEditing}
          />
        </View>

        {/* 按钮 */}
        <View>
          <View
            style={{
              width: '85%',
              height: pxToDp(40),
              alignSelf: 'center',
            }}>
            <ChangeColorBtn
              style={{borderRadius: pxToDp(20)}}
              onPress={this.phoneNumberSubmitEditing}>
              获取验证码
            </ChangeColorBtn>
          </View>
        </View>
      </View>
    );
  };
  //渲染验证码页面
  renderVcode = () => {
    const {phoneNumber, value, btnText, isCountDowning} = this.state;
    return (
      <View>
        <View>
          <Text
            style={{fontSize: pxToDp(25), color: '#888', fontWeight: 'bold'}}>
            输入6位验证码
          </Text>
        </View>
        <View style={{marginTop: pxToDp(15)}}>
          <Text style={{color: '#888'}}>已发到:+86 {phoneNumber}</Text>
        </View>
        <View>
          <CodeField
            value={value}
            onChangeText={this.setValue}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <View>
          <View
            style={{
              width: '85%',
              height: pxToDp(40),
              alignSelf: 'center',
              marginTop: pxToDp(15),
            }}>
            <ChangeColorBtn
              style={{borderRadius: pxToDp(20)}}
              disabled={isCountDowning}
              onPress={this.repGetRoCode}>
              {btnText}
            </ChangeColorBtn>
          </View>
        </View>
      </View>
    );
  };

  //设置值
  setValue = value => {
    this.setState({
      value,
    });
  };
  render() {
    const {showLogin} = this.state;
    return (
      <View>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <ImageStyle
          source={require('../.././../images/res/profileBackground.jpg')}
        />
        <View>
          <View style={{padding: pxToDp(20)}}>
            {showLogin ? this.renderLogin() : this.renderVcode()}
          </View>
        </View>
      </View>
    );
  }
}
export default Index;
