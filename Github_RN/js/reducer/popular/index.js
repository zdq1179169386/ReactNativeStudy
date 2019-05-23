import Types from '../../action/types';


const  defaultState = {};

// {
//     popular: {
//         ios : {
//             items : [],
//             isLoading: false,
//         }
//     }
// }

export default function onAction(state = defaultState,action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH_SUCCESS:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    items : action.items,
                    projectModels: action.projectModels,
                    isLoading: false,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex
                }
            }
        }
        case Types.POPULAR_REFRESH_FAIL:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
        }
        case Types.POPULAR_REFRESH:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore:true,
                }
            }
        }
        case Types.POPULAR_LOAD_MORE_SUCCESS:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore:false,
                    pageIndex: action.pageIndex
                }
            }
        }
        case Types.POPULAR_LOAD_MORE_FAIL:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            }
        }
        default:{
            return state;
        }

    }
}