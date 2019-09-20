import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
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
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import {Actions} from "react-native-router-flux";


const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

class PopularPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabs = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }

    //这种方式可以加props 传入到 TopBarItem 中使用，
    // screen: props => <TopBarItem {...props} tabLabel={item}/>,

    _createTabs() {
        const tabs = {}
        const {theme} = this.props
        this.tabs.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TopBarItemPage {...props} tabLabel={item} theme={theme}/>,
                navigationOptions: {
                    title: item,
                }
            };
        })
        return tabs;
    }

    /*
    * tabStyle: 样式
              upperCaseLabel: 大小写,
              scrollEnabled: 是否可以滑动,
              style:{
                backgroundColor:'#678'
              },
              indicatorStyle: 滚动条样式,
              labelStyle: 标题样式,
    * */

    render() {
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={'最热'} statusBar={statusBar} style={theme.styles.navBar}/>
        const TopTabNaviagtor = createMaterialTopTabNavigator(
            this._createTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
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

            <View style={{flex: 1}}>
                {navigationBar}
                <AppTopTab/>
            </View>
        );
    }
}


const mapPopularStateToProps = state => ({
    theme: state.theme.theme,
})

export default connect(mapPopularStateToProps)(PopularPage);

const PageSize = 10;

class TopBarItem extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this.isFavoriteChange = false;
    }

    componentDidMount() {
        this._loadData();
        EventBus.getInstance().addListener(EventTypes.favorite_change_popular, this.favoriteListener = () => {
            this.isFavoriteChange = true;
        })
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomListener = data => {

            if (data.to === 0 && this.isFavoriteChange) {
                this._loadData(false);
                this.isFavoriteChange = false;
            }
        })
    }

    componentWillUnmount(): void {
        EventBus.getInstance().removeListener(EventTypes.favorite_change_popular);
        EventBus.getInstance().removeListener(EventTypes.bottom_tab_select);
    }

    _loadData(loadMore) {
        const {onLoadPopularData, onLoadMorePopularData} = this.props;
        let store = this._getStore();
        if (loadMore) {
            //   加载更多
            onLoadMorePopularData(this.storeName, ++store.pageIndex, PageSize, store.items, favoriteDao, callBack => {
                this.refs.toast.show('没有更多数据了')
            })
        } else {
            //下来刷新
            console.log(this._getUrl(this.storeName))
            onLoadPopularData(this.storeName, this._getUrl(this.storeName), PageSize, favoriteDao);
        }
    }

    _getStore() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                item: [],
                isLoading: false,
                projectModels: [],
                hideLoadingMore: true,
            }
        }
        return store;
    }

    _getUrl(key) {
        return URL + key + QUERY_STR;
    }

    // _renderItem(data) {
    //     const item = data.item;
    //     const {theme} = this.props;
    //     return (
    //         <PopularItem projectModel={item} theme={theme} onSelect={(callback) => {
    //             NavigationUtil.goPage('DetailPage',{
    //                 projectModel: item,
    //                 flag: FLAG_STORAGE.flag_popular,
    //                 callback:callback,
    //                 theme:theme,
    //             });
    //         }} onFavorite={(item,isFavorite) => FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)}
    //         />)
    // }

    _renderItem(data) {
        const item = data.item;
        const {theme} = this.props;
        return (
            <PopularItem projectModel={item} theme={theme} onSelect={(callback) => {
                Actions.push('DetailPage', {
                    projectModel: item,
                    flag: FLAG_STORAGE.flag_popular,
                    callback: callback,
                    theme: theme,
                })
            }} onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
            />)
    }

    _getListFooter() {
        return this._getStore().hideLoadingMore ? null :
            <View style={styles.listFooterStyle}>
                {/*iOS 下这个颜色好像改不了*/}
                <ActivityIndicator
                    style={styles.activityIndicator}
                />
                <Text style={{color: this.props.theme.themeColor}}>正在加载更多</Text>
            </View>
    }

    render() {
        const {theme} = this.props;
        let store = this._getStore();

        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={(data) => this._renderItem(data)}
                    data={store.projectModels}
                    keyExtractor={item => '' + item.item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={store.isLoading}
                            title={'Loading'}
                            tintColor={theme.themeColor}
                            colors={[theme.themeColor]}
                            onRefresh={() => this._loadData(false)}
                            titleColor={theme.themeColor}
                        />
                    }
                    ListFooterComponent={this._getListFooter()}
                    onEndReached={() => {
                        console.log('onEndReached')
                        if (this.canLoadMore) {
                            this._loadData(true);
                            this.canLoadMore = false;
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    // onScrollBeginDrag={() => {
                    //     console.log('onScrollBeginDrag');
                    //     this.canLoadMore = true;
                    // }}
                    // onScrollEndDrag={() => {
                    //     console.log('onScrollEndDrag');
                    //     this.canLoadMore = false;
                    // }}
                    onMomentumScrollBegin={() => {
                        console.log('onMomentumScrollBegin');
                        this.canLoadMore = true;
                    }}
                    // onMomentumScrollEnd={() => {
                    //     console.log('onMomentumScrollEnd');
                    //     this.canLoadMore = false;
                    // }}
                />
                <Toast ref={'toast'} position={'center'}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    popular: state.popular,
})


const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onLoadPopularData(storeName, url, pageSize, favoriteDao)),
    onLoadMorePopularData: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopularData(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),

})
const TopBarItemPage = connect(mapStateToProps, mapDispatchToProps)(TopBarItem);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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
    listFooterStyle: {
        alignItems: 'center'
    },
    activityIndicator: {}
});
