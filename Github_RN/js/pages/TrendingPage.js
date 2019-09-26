import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import actions from '../action/index'
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'
import TrendingItem from '../common/TrendingItem'
import TrendingDialog, {Timespans} from '../common/TrendingDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import FavoriteDao from '../expand/dao/FavoriteDao';
import {Actions} from 'react-native-router-flux';
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import Ii8n from "../util/i18n";
import Timespan from "../model/Timespan";


const URL = 'https://github.com/trending/'
const TRENDING_PAGE_REFRESH_NOTIFY = 'TRENDING_PAGE_REFRESH_NOTIFY'
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);


class TrendingPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabs = ['C', 'Objective-C', 'Java', 'JavaScript', 'Python', 'PHP'];
        this.preTheme = null;
        this.state = {
            timeSpans: [new Timespan(Ii8n('trending_daily'), 'since=daily'), new Timespan(Ii8n('trending_weekly'), 'since=weekly'), new Timespan(Ii8n('trending_monthly'), 'since=monthly')],
            timeSpan: new Timespan(Ii8n('trending_daily'), 'since=daily')
        }
    }

    //这种方式可以加props 传入到 TopBarItem 中使用，
    // screen: props => <TopBarItem {...props} tabLabel={item}/>,

    _createTabs() {
        const tabs = {}
        const {theme} = this.props;
        this.tabs.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabItemPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}
                                                      theme={theme}/>,
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

    _renderTitleView() {
        return (
            <View>
                <TouchableOpacity ref={'bg_btn'}
                                  underlayColor='transparent'
                                  onPress={() => {
                                      this.dialog.show();
                                  }}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 18,
                            color: '#FFFFFF',
                            fontWeight: '400'
                        }}>
                            {Ii8n('tabTrending')}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#FFFFFF',
                            fontWeight: '400',
                            paddingLeft: 3
                        }}>
                            {this.state.timeSpan.showTex}
                        </Text>
                        <MaterialIcons
                            name={'arrow-drop-down'}
                            size={22}
                            style={{color: 'white'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan: tab
        })
        DeviceEventEmitter.emit(TRENDING_PAGE_REFRESH_NOTIFY, tab)
    }

    renderTrendingDialog() {
        return <TrendingDialog
            ref={dialog => this.dialog = dialog}
            onSelect={(tab) => this.onSelectTimeSpan(tab)} timeSpans={this.state.timeSpans}
        />
    }

    _getTopTabNaviagtor() {
        const {theme} = this.props;
        if (!this.appTopTab || (this.preTheme && this.preTheme != theme)) {
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
            this.appTopTab = createAppContainer(TopTabNaviagtor)
        }
        this.preTheme = theme;
        return this.appTopTab;
    }

    render() {
        const {theme} = this.props
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar titleView={this._renderTitleView()} statusBar={statusBar}
                                           style={theme.styles.navBar}/>

        const AppTopTab = this._getTopTabNaviagtor();
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <AppTopTab/>
                {this.renderTrendingDialog()}
            </View>
        );
    }
}

const mapPopularStateToProps = state => ({
    theme: state.theme.theme,
})

export default connect(mapPopularStateToProps)(TrendingPage);

const PageSize = 10;

class TrendingTabItem extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel, timeSpan} = this.props;
        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
        this.isFavoriteChange = false;
    }

    componentWillUnmount() {
        // if (this.listener) {
        //     this.listener.remove();
        // }
        EventBus.getInstance().removeListener(EventTypes.favorite_change_trending);
        EventBus.getInstance().removeListener(EventTypes.bottom_tab_select);
    }

    _loadData(loadMore) {
        const {onLoadTrendingData, onLoadMoreTrendingData} = this.props;
        let store = this._getStore();
        if (loadMore) {
            //   加载更多
            onLoadMoreTrendingData(this.storeName, ++store.pageIndex, PageSize, store.items, favoriteDao, callBack => {
                this.refs.toast.show('没有更多数据了')
            })
        } else {
            //下来刷新
            console.log(this._getUrl(this.storeName))
            onLoadTrendingData(this.storeName, this._getUrl(this.storeName), PageSize, favoriteDao);
        }
    }

    componentDidMount() {
        this._loadData(false);
        //因为趋势需要实时刷新，所以点击顶部item 的时候，去刷新
        this.listener = DeviceEventEmitter.addListener(TRENDING_PAGE_REFRESH_NOTIFY, (timeSpan) => {
            this.timeSpan = timeSpan;
            this._loadData(false);
        })
        EventBus.getInstance().addListener(EventTypes.favorite_change_trending, this.favoriteListener = () => {
            this.isFavoriteChange = true;
        })
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomListener = data => {
            console.log('from = '+ data.from + 'to ='+ data.to)
            if (data.to === 1 && this.isFavoriteChange) {
                this._loadData(false);
                this.isFavoriteChange = false;
            }
        })
    }

    _getStore() {
        const {trending} = this.props;
        let store = trending[this.storeName];
        if (!store) {
            store = {
                item: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true,
            }
        }
        return store;
    }

    _getUrl(key) {
        return URL + key + '?' + this.timeSpan.searchText;
    }

    _renderItem(data) {
        const item = data.item;
        const {theme} = this.props;
        return (
            <TrendingItem projectModel={item} theme={theme} onSelect={(callback) => Actions.push('DetailPage', {
                projectModel: item,
                flag: FLAG_STORAGE.flag_trending,
                callback: callback,
                theme: theme
            })} onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}/>)
    }

    _getListFooter() {
        return this._getStore().hideLoadingMore ? null :
            <View style={styles.listFooterStyle}>
                <ActivityIndicator
                    style={styles.activityIndicator}
                />
                <Text style={{color: this.props.theme.themeColor,paddingLeft: 5}}>正在加载更多</Text>
            </View>
    }


    render() {
        let store = this._getStore();
        const {theme} = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={(data) => this._renderItem(data)}
                    data={store.projectModes}
                    keyExtractor={item => '' + (item.item.id || item.item.fullName)}
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
    trending: state.trending
})


const mapDispatchToProps = dispatch => ({
    onLoadTrendingData: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onLoadTrendingData(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrendingData: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreTrendingData(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),

})
const TrendingTabItemPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTabItem);

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
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        height:40,
    },
    activityIndicator: {}
});
