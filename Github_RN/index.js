/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './js/App'
import AppNavigator from './js/navigator/AppNavigators'

AppRegistry.registerComponent(appName, () => App);
