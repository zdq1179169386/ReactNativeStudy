import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
import trending from './trending';
import favorite  from './favorite';
import login from './login';
import user from './user';

// 合并reducer
const index = combineReducers({
    theme: theme,
    popular:popular,
    trending:trending,
    favorite:favorite,
    login: login,
    user: user,
})

export default index;
