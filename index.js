/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// eslint-disable-next-line no-undef
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
YellowBox.ignoreWarnings(['Remote debugger']); // 忽略黄色提醒
AppRegistry.registerComponent(appName, () => App);
