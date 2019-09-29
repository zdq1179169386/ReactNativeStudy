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
        case Types.TRENDING_REFRESH_SUCCESS:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    items : action.items,
                    projectModes: action.projectModes,
                    isLoading: false,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex
                }
            }
        }
        case Types.TRENDING_REFRESH_FAIL:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
        }
        case Types.TRENDING_REFRESH:{
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
        case Types.TRENDING_LOAD_MORE_SUCCESS:{
            //延展操作符
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore:false,
                    pageIndex: action.pageIndex
                }
            }
        }
        case Types.TRENDING_LOAD_MORE_FAIL:{
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