import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteDao from '../expand/dao/FavoriteDao'


export default  class  FavoriteUtil {

    //favoriteIcon 点击回调函数
    static  onFavorite (favoriteDao,item,isFavorite,flag) {
        const  key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString();
        if (isFavorite){
            favoriteDao.saveFavoriteItem(key,JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(key)

        }
    }

}