import Types from '../../action/types';


const  defaultState = {};

// favorite:{
//     popular:{
//         projectModels:[],
//             isLoading:true,
//     }
//     trending:{
//         projectModels:[],
//             isLoading:true,
//     }
// }

export default function onAction(state = defaultState,action) {
    switch (action.type) {
        case Types.FAVORITE_LOAD_DATA:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: true,
                }
            }
        }
        case Types.FAVORITE_LOAD_DATA_SUCCESS:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: false,
                    projectModels: action.projectModels,
                }
            }
        }
        case Types.FAVORITE_LOAD_DATA_FAIL:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: false,
                }
            }
        }
        default:{
            return state;
        }

    }
}