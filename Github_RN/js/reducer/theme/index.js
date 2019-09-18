import Types from '../../action/types';
import {ThemeFactory,ThmemeFlags}  from '../../res/ThemeFactory'

const  defaultState = {
    theme: ThemeFactory.createTheme(ThmemeFlags.Default)
};

export default function onAction(state = defaultState,action) {
    switch (action.type) {
        case Types.THEME_CHANGE:{
            //延展操作符
            return {...state, theme: action.theme}
        }
        default:{
            return state;
        }
    }
}