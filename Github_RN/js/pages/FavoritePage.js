import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'
import isIphoneX from "../util/ScreenUtil";
import FavoriteDao from '../expand/dao/FavoriteDao'
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import TrendingItem from '../common/TrendingItem'
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'




const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

 class FavoritePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabs = ['最热', '趋势',];
    }

    render() {
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={'收藏'} statusBar={statusBar} style={theme.styles.navBar}/>
        const TopTabNaviagtor = createMaterialTopTabNavigator(
            {
                'Popular': {
                    screen: props => <FavoriteBarItemPage {...props} flag={FLAG_STORAGE.flag_popular} theme={theme}/>,
                    navigationOptions: {
                        title: '最热'
                    },
                },
                'Trending':{
                    screen: props => <FavoriteBarItemPage {...props} flag={FLAG_STORAGE.flag_trending} theme={theme}/>,
                    navigationOptions: {
                        title: '趋势'
                    },
                }
            }
            , {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    style: {
                        backgroundColor: theme.themeColor,
                        height: 35
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                }
            }
        );
        const AppTopTab = createAppContainer(TopTabNaviagtor)
        return (

            <View style={{flex: 1,}}>
                {navigationBar}
                <AppTopTab/>
            </View>
        );
    }
}
const mapPopularStateToProps = state => ({
    theme: state.theme.theme,
})

export default connect(mapPopularStateToProps)(FavoritePage);

const PageSize = 10;

class FavoriteBarItem extends Component<Props> {
    constructor(props) {
        super(props);
        const {flag} = this.props;
        this.storeName = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }

    componentDidMount() {
        this._loadData();
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.listener = data => {
            if (data.to == 2){
                this._loadData(false);
            }
        })
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener)
    }

    _loadData(isShowLoading) {
        const {onLoadFavoriteData} = this.props;
        onLoadFavoriteData(this.storeName,isShowLoading)
    }

    _getStore() {
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                isLoading: false,
                projectModels: [],
            }
        }
        return store;
    }

    _onFavorite(item,isFavorite){
        FavoriteUtil.onFavorite(this.favoriteDao,item,isFavorite,this.props.flag);
        if (this.storeName === FLAG_STORAGE.flag_popular){
            EventBus.getInstance().fireEvent(EventTypes.favorite_change_popular);
        } else {
            EventBus.getInstance().fireEvent(EventTypes.favorite_change_trending);
        }
    }

    _renderItem(data) {
        const item = data.item;
        const {theme} = this.props;
        const Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
        return (
            <Item projectModel={item} theme={theme} onSelect={(callback) => {
                NavigationUtil.goPage('DetailPage', {
                    projectModel: item,
                    flag: this.storeName,
                    callback: callback,
                    theme:theme
                });
            }} onFavorite={(item, isFavorite) => this._onFavorite(item,isFavorite)}
            />)
    }

    render() {
        let store = this._getStore();
        const {theme} = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={(data) => this._renderItem(data)}
                    data={store.projectModels}
                    keyExtractor={item => '' + (item.item.id || item.item.fullName)}
                    refreshControl={
                        <RefreshControl
                            refreshing={store.isLoading}
                            title={'Loading'}
                            tintColor={theme.themeColor}
                            colors={[theme.themeColor]}
                            onRefresh={() => this._loadData(true)}
                            titleColor={theme.themeColor}
                        />
                    }
                />
                <Toast ref={'toast'} position={'center'}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    favorite: state.favorite
})

const mapDispatchToProps = dispatch => ({
    onLoadFavoriteData: (storeName, isShowLoading) => dispatch(actions.onLoadFavoriteData(storeName, isShowLoading)),

})

const FavoriteBarItemPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteBarItem);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        // minWidth: 50,
        padding: 0,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 15,
        margin: 0,
    },
});
