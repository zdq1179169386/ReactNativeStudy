import React, {Component} from 'react';
import {StyleSheet, Linking, Clipboard, Platform, Share, AsyncStorage} from "react-native";
import {Actions} from 'react-native-router-flux';
import I18n from './i18n'
import {changeLocale} from './i18n'


export const LANGUAGE_SELECT = "language-select";
export const LANGUAGE_SELECT_NAME = "language-select-name";
export const REFRESH_LANGUAGE = "refreshLanguageApp"; //刷新语言的闭包的key

export const getLanguageCurrent = async () => {
    let language = await  AsyncStorage.getItem(LANGUAGE_SELECT);
    let languageName = await  AsyncStorage.getItem(LANGUAGE_SELECT_NAME);
    return {
        language: language,
        languageName: languageName,
    };
};

const selectLanguage = (lang, langName) => {
    AsyncStorage.setItem(LANGUAGE_SELECT, lang);
    AsyncStorage.setItem(LANGUAGE_SELECT_NAME, langName);
    changeLocale(lang);
    Actions.refresh();
};

//集合，key是 REFRESH_LANGUAGE ，value 是 保存切换语言需要刷新的闭包
const refreshHandler = new Map();

//闭包，返回集合
export const getRefreshHandler = () => {
    return refreshHandler;
};
