import Types from '../types'
import DataStore, {FLAG_STORAGE} from '../../../expand/dao/DataStore'
import FavoriteDao from '../../../expand/dao/FavoriteDao'
import ProjectModel from "../../../model/ProjectModel";
import Util from "../../../util/Util";

export function onLoadPopularData(storeName, url, pageSize, favoriteDao) {

    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName
        });
        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
            .then(data => {
                handleData(dispatch, storeName, data, pageSize, favoriteDao)
            }).catch(error => {
            dispatch({
                type: Types.POPULAR_REFRESH_FAIL,
                storeName: storeName,
                error: error
            })
        })

    }

}

export function onLoadMorePopularData(storeName, pageIndex, pageSize, dataArray = [], favoriteDao,callBack) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callBack == 'function') {
                    callBack('no more')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                })

            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageIndex * pageSize;
                _projectModels(dataArray.slice(0, max),favoriteDao,projectModels => {
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName: storeName,
                        pageIndex: pageIndex,
                        projectModels: projectModels,
                    })
                })
            }
        }, 500)
    }
}

function handleData(dispatch, storeName, data, pageSize, favoriteDao) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }
    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
    _projectModels(showItems, favoriteDao, projectModels => {
        dispatch({
            type: Types.POPULAR_REFRESH_SUCCESS,
            items: fixItems,
            projectModels: projectModels,
            storeName: storeName,
            pageIndex: 1,
        })
    })
}

export async function _projectModels(showItems, favoriteDao, callback) {
    let keys = [];
    try {
        keys = await favoriteDao.getFavoriteKeys();
    } catch (e) {
        console.log(e);
    }
    let projectModels = [];
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModels.push(new ProjectModel(showItems[i], Util.checkFavorite(showItems[i], keys)))
    }
    if (typeof callback === 'function') {
        callback(projectModels);
    }
}
