
export default class NavigationUtil {
    //跳转到指定页面
    static goPage(page,params){
        //这里是因为内部的页面要用到外部 navigation ，所以加个静态变量保存起来
        const navigation = NavigationUtil.navigation;
        if (!navigation){
            console.log('NavigationUtil.navigation can not be null');
            return;
        }
        navigation.navigate(page,{...params});
    }

    //返回上一个页面
    static goBack(navigation){
        navigation.goBack();
    }

    //重置首页
    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate('Main');
    }
}