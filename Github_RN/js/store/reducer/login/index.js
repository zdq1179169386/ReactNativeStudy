import Types from '../../action/types';

// const actionHandler= (state, action) => {
//     switch (action.type) {
//         case Types.LOGIN_IN:{
//             return {}
//         }
//         default: {
//             return state;
//         }
//     }
// }

const  defaultState = {};

export default function onAction(state = defaultState,action) {
    switch (action.type) {
        case Types.LOGIN_IN:{
            return {...state}
        }
        case Types.LOGIN_OUT:{
            return {...state}
        }
        default: {
            return state;
        }
    }
}
