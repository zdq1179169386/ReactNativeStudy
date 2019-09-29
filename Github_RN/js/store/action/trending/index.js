import Types from '../types'
import DataStore, {FLAG_STORAGE} from '../../../expand/dao/DataStore'
import  {_projectModels} from '../popular'

export function  onLoadTrendingData(storeName,url,pageSize,favoriteDao) {

    return dispatch => {
        dispatch({
            type: Types.TRENDING_REFRESH,
            storeName:storeName
        });
        let dataStore = new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_trending)
            .then(data => {
                handleData(dispatch, storeName, data,pageSize,favoriteDao)
            }).catch(error => {
            dispatch({
                type: Types.TRENDING_REFRESH_FAIL,
                storeName:storeName,
                error:error
            })
        })
    }
}

export function onLoadMoreTrendingData (storeName,pageIndex,pageSize,dataArray=[],favoriteDao,callBack) {
    return dispatch => {
        setTimeout(()=> {
            if ((pageIndex - 1) * pageSize >= dataArray.length){
                if (typeof callBack == 'function'){
                    callBack('no more')
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error:'no more',
                    storeName:storeName,
                    pageIndex:--pageIndex,
                })

            } else {
                let  max = pageSize * pageIndex > dataArray.length ? dataArray.length: pageIndex * pageSize;
                _projectModels(dataArray.slice(0,max),favoriteDao,projectModels => {
                    dispatch({
                        type:Types.TRENDING_LOAD_MORE_SUCCESS,
                        storeName:storeName,
                        pageIndex:pageIndex,
                        projectModes: projectModels,
                    })
                })
            }

        },500)
    }

}

function  handleData(dispatch, storeName, data, pageSize,favoriteDao) {
    let fixItems = [];
    if (data&&data.data) {
        fixItems =  data.data;
    }
    //第一次加载的数据
    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);

    _projectModels(showItems,favoriteDao,projectModels => {
        dispatch({
            type: Types.TRENDING_REFRESH_SUCCESS,
            items: fixItems,
            projectModes: projectModels,
            storeName: storeName,
            pageIndex:1,
        })
    })
}
