import Types from '../../action/types';


const  defaultState = {
    theme:'red'
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