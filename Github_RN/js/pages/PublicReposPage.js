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
import * as Constant from "../res/Constant";


class PublicReposPage extends Component<Props> {
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

    _renderCountView(tip,count) {
        const {theme} = this.props;
        return (
            <View style={styles.countViewStyle}>
                <Text>{tip+': '}</Text>
                <Text style={{color: theme.themeColor}}>
                    {count}
                </Text>
            </View>
        )
    }

    //返回cell
    _renderRow(itemData) {
        let item = itemData.item;
        return (
            item ? <View style={styles.itemStyle}>
               <View style={styles.itemTop}>
                   <Image style={styles.avatarStyle} source={{uri: item.owner.avatar_url}}/>
                   <View style={{
                       flex: 1,
                   }}>
                       <View style={{
                           flexDirection:'row',
                           alignItems:'center',
                           justifyContent:'space-between'
                       }}>
                           <Text style={{
                               fontSize: 17
                           }}>
                               {item.name}
                           </Text>
                           <Text>
                               {item.language}
                           </Text>
                       </View>
                       <Text style={{
                           marginTop:5,
                           color:'gray'
                       }}>
                           {item.owner.login}
                       </Text>
                   </View>

               </View>
                <View style={styles.itemBottom}>
                    {this._renderCountView('star',item.stargazers_count)}
                    {this._renderCountView('fork',item.forks_count)}
                    {this._renderCountView('issues',item.open_issues_count)}
                </View>
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
        const {getUserRepos} = this.props;
        getUserRepos(user.login, this.page, 'updated', (data) => {
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
        let navigationBar = <NavigationBar title={Ii8n('public_repos')} statusBar={statusBar}
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
    getUserRepos: (username, page, sort, callback) => dispatch(actions.getUserRepos(username, page, sort, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(PublicReposPage);

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
    },
    listFooterStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    itemTop:{
        flexDirection: 'row',
        padding: 5
    },
    itemBottom:{
        marginTop:10,
        flexDirection: 'row',
        padding: 5,
        justifyContent:'space-between'
    },
    countViewStyle:{
      flexDirection:'row'
    },
    countStyle:{
        color: 'gray'
    },
    avatarStyle:{
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight:10
    },
});
