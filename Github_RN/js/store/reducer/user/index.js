import Types from '../../action/types';


const  defaultState = {};

export default function onAction(state = defaultState,action) {
    switch (action.type) {
        case Types.USER_INFO:{
            //延展操作符
            return {
                ...state,
                user: action.res
            }
        }
        default:{
            return state;
        }

    }
}
