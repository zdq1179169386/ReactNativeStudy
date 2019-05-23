import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import Toast, {DURATION} from 'react-native-easy-toast'
import  NavigationBar from  '../common/NavigationBar'
import isIphoneX from "../util/ScreenUtil";
import FavoriteDao from '../expand/dao/FavoriteDao'
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";


const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = '#678'
const  favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabs = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }

    //这种方式可以加props 传入到 TopBarItem 中使用，
    // screen: props => <TopBarItem {...props} tabLabel={item}/>,

    _createTabs() {
        const tabs = {}
        this.tabs.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TopBarItemPage {...props} tabLabel={item}/>,
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
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle:'light-content',
        }
        let  navigationBar = <NavigationBar title={'最热'} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}/>
        const TopTabNaviagtor = createMaterialTopTabNavigator(
            this._createTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#678',
                        height:40
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                }
            }
        );
        const AppTopTab = createAppContainer(TopTabNaviagtor)
        return (

            <View style={{flex: 1,  marginTop:  isIphoneX ? 30 : 0}}>
                {navigationBar}
                <AppTopTab/>
            </View>
        );
    }
}

const PageSize = 10;

class TopBarItem extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData(loadMore) {
        const {onLoadPopularData, onLoadMorePopularData} = this.props;
        let store = this._getStore();
        if (loadMore) {
            //   加载更多
            onLoadMorePopularData(this.storeName, ++store.pageIndex, PageSize, store.items, favoriteDao,callBack => {
                this.refs.toast.show('没有更多数据了')
            })
        } else {
            //下来刷新
            onLoadPopularData(this.storeName, this._getUrl(this.storeName), PageSize,favoriteDao);
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

    _renderItem(data) {
        const item = data.item;
        return (
            <PopularItem projectModel={item} onSelect={(callback) => {
                NavigationUtil.goPage('DetailPage',{
                    projectModel: item,
                    flag: FLAG_STORAGE.flag_popular,
                    callback:callback
                });
            }} onFavorite={(item,isFavorite) => FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)}
            />)
    }

    _getListFooter() {
        return this._getStore().hideLoadingMore ? null :
            <View style={styles.listFooterStyle}>
                <ActivityIndicator
                    style={styles.activityIndicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }


    render() {
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
                            tintColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            onRefresh={() => this._loadData(false)}
                            titleColor={THEME_COLOR}
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
    popular: state.popular
})


const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onLoadPopularData(storeName, url, pageSize,favoriteDao)),
    onLoadMorePopularData: (storeName, pageIndex, pageSize, items, favoriteDao,callBack) => dispatch(actions.onLoadMorePopularData(storeName, pageIndex, pageSize, items, favoriteDao,callBack)),

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
        padding:0,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    listFooterStyle: {
        alignItems: 'center'
    },
    activityIndicator: {

    }
});
