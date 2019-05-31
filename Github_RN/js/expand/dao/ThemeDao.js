import {AsyncStorage}from 'react-native'
import {ThemeFactory,ThmemeFlags} from "../../res/ThemeFactory";

const  THEME_KEY = 'theme_key'
export  default class  ThemeDao {

    //获取当前主题
    getTheme(){
        return new Promise((resolve,reject) => {
            AsyncStorage.getItem(THEME_KEY,(error,result)=>{
                if (error){
                    reject(error);
                    return;
                }
                if (!result){
                    result = ThmemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result));
            })
        })
    }

    //保存
    save(theme){
        AsyncStorage.setItem(THEME_KEY,theme,(error) => {

        })

    }
}