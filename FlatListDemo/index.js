/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createAppContainer,createStackNavigator} from "react-navigation";
import FlatListPage from './pages/FlatListPage'
import SwipeableFlatListPage from './pages/SwipeableFlatListPage'
import SectionListPage from './pages/SectionListPage'

const AppStackNavigator = createStackNavigator({
    App: {
        screen: App,
        navigationOptions:{
            title:'Home'
        }
    },
    FlatListPage:{
        screen:FlatListPage,
        navigationOptions:{
            title:'FlatListPage',
        }
    },
    SwiPage:{
        screen:SwipeableFlatListPage,
        navigationOptions:{
            title:'SwipeFlatListPage'
        }
    },
    SectionListPage:{
        screen:SectionListPage,
        navigationOptions:{
            title:'SectionListPage',
        }
    }
})

const AppRoot = createAppContainer(AppStackNavigator);

AppRegistry.registerComponent(appName, () => AppRoot);
