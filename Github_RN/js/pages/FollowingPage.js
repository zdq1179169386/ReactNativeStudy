import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity, Image
} from 'react-native';
import {connect} from 'react-redux'
import actions from '../store/action/index'
import NavigationBar from '../common/NavigationBar'
import {Actions} from "react-native-router-flux";
import Ii8n from "../util/i18n";
import Toast from "../common/ToastProxy";
import ViewUtil from "../util/ViewUtil";
import * as Constant from '../res/Constant'

//我的关注
class FollowingPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.page = 1
        this.state = {
            dataArr: [],
            isRefreshing: true,
            showRefresh: true,
            showLoadMore: false,
        }
    }

    componentDidMount() {
        this._loadData(false);
    }

    //返回cell
    _renderRow(itemData) {
        let item = itemData.item;
        console.log(item)
        return (
            item ? <View style={styles.itemStyle}>
                <Image style={styles.avatarStyle} source={{uri: item.avatar_url}}/>
                <Text>{item.login}</Text>
            </View> : null
        )
    }

    //返回上拉view
    _getListFooter() {
        return this.state.showLoadMore ?
            <View style={styles.listFooterStyle}>
                {/*iOS 下这个颜色好像改不了*/}
                <ActivityIndicator
                    style={styles.activityIndicator}
                />
                <Text style={{color: this.props.theme.themeColor, paddingLeft: 5}}>{Ii8n('loadingMore')}</Text>
            </View> : null
    }

    //请求数据
    _loadData(loadMore = false) {
        if (loadMore) {
            this.page++;

        } else {
            this.page = 1;
        }
        const {user} = this.props;
        const {getFollowedList} = this.props;
        getFollowedList(user.login, this.page, (data) => {
            if (loadMore){
                if (!data || data.length<=0){
                    this.setState({
                        showLoadMore: false
                    })
                    Toast(Ii8n('noMoreData'))
                }
            } else {
                this.setState({
                    isRefreshing: false,
                })
            }
            setTimeout(() => {
                if (loadMore) {
                    //上拉
                    let arr = this.state.dataArr.concat(data);
                    this.setState({
                        dataArr: arr
                    })
                } else {
                    //下拉
                    this.setState({
                        dataArr: data,
                        showLoadMore: data.length < Constant.PAGE_SIZE ? false : true
                    })
                }
            }, 300)
        })
    }

    render() {
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={Ii8n('following')} statusBar={statusBar}
                                           style={theme.styles.navBar} leftBtn={ViewUtil.getLeftBackBtn(() =>{
                                              Actions.pop()
                                           })}/>
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <FlatList
                    renderItem={(itemData) => this._renderRow(itemData)}
                    data={this.state.dataArr}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            title={'Loading'}
                            tintColor={theme.themeColor}
                            colors={[theme.themeColor]}
                            onRefresh={() => this._loadData(false)}
                            titleColor={theme.themeColor}
                        />
                    }
                    ListFooterComponent={this._getListFooter()}
                    onEndReached={() => {
                        if (this.canLoadMore) {
                            this._loadData(true);
                            this.canLoadMore = false;
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true;
                    }}
                />
            </View>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    getFollowedList: (username, page, callback) => dispatch(actions.getFollowedList(username, page, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(FollowingPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
        height:70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    listFooterStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    avatarStyle:{
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight:10,
        marginLeft: 10
    },
});
