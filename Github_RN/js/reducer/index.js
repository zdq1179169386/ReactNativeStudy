import {combineReducers} from 'redux';
import theme from './theme';
import {rootCom,RootNavigator} from '../navigator/AppNavigators'
import popular from './popular'
import trending from  './trending'

const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

const  navReducer = (state = navState, action)=>{
    const nextState = RootNavigator.router.getStateForAction(action, state);

    return nextState || state;
}

const index = combineReducers({
    nav: navReducer,
    theme: theme,
    popular:popular,
    trending
})

export default index;
