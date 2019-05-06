/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createAppContainer} from "react-navigation";
import {AppStackNavigator,AppTabNavigator} from "./page/Navigatior";


const  AppContainer = createAppContainer(AppStackNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
