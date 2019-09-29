/**
 * Created by guoshuyu on 2017/11/7.
 * 国际化
 */
import {NativeModules} from 'react-native';
import I18n from 'react-native-i18n'

const {RNI18n} = NativeModules;

I18n.fallbacks = true;

I18n.defaultLocale = "zh-CN";

I18n.translations = {
    'zh-CN': {
        appName: '中文',
        tabHot:'最热',
        tabTrending:'趋势',
        tabFavorite:'收藏',
        tabMy:'我的',
        trending_daily: '今天',
        trending_weekly: '本周',
        trending_monthly: '本月',
        setting:'设置',
        customLanguage:'自定义语言',
        customTheme:'自定义主题',
        loadingMore: '正在加载更多',
        noMoreData: '没有更多数据了',
        public_repos: '仓库',
        followers: '粉丝',
        following: '关注',
    },
    'en': {
        appName: 'Github_RN',
        tabHot:'hot',
        tabTrending:'trending',
        tabFavorite:'favorite',
        tabMy:'my',
        trending_daily: 'daily',
        trending_weekly: 'weekly',
        trending_monthly: 'monthly',
        setting:'setting',
        customLanguage:'customLanguage',
        customTheme:'customTheme',
        loadingMore: 'loading more data',
        noMoreData: 'no more data',
        public_repos: 'public_repos',
        followers: 'followers',
        following: 'following'
    }
};

export const changeLocale = function (multilingual) {
    if (multilingual === 'local' || !multilingual) {
        if (__DEV__) {
            if (RNI18n !== undefined && typeof RNI18n !== 'undefined') {
                console.log("language system", RNI18n.languages[0])
            }
        }
        I18n.locale = (RNI18n !== undefined && typeof RNI18n !== 'undefined') ? RNI18n.languages[0].replace(/_/, '-') : ''
    } else {
        I18n.locale = multilingual
    }
    // for ios
    if (I18n.locale.indexOf('zh-Hans') !== -1) {
        I18n.locale = 'zh-CN'
    } else if (I18n.locale.indexOf('zh-Hant') !== -1 || I18n.locale === 'zh-HK' || I18n.locale === 'zh-MO') {
        I18n.locale = 'zh-CN'
    }


};

export default function (name, option1, option2) {
    return I18n.t(name, option1, option2)
}
