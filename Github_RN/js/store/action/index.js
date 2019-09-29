import {onThemeChange} from './theme';
import {onLoadPopularData,onLoadMorePopularData} from './popular'
import  {onLoadTrendingData,onLoadMoreTrendingData} from './trending'
import  {onLoadFavoriteData} from './favorite'
import {doLogin,loginOut} from './login'
import {initUserInfo,getUserInfo,clearUserInfo,getUserRepos,getUserFollower,getFollowedList} from './user'


//根action
export default {
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopularData,
    onLoadTrendingData,
    onLoadMoreTrendingData,
    onLoadFavoriteData,
    doLogin,
    loginOut,
    initUserInfo,
    getUserInfo,
    clearUserInfo,
    getUserRepos,
    getUserFollower,
    getFollowedList
}
