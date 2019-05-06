/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, RefreshControl,ActivityIndicator,SwipeableFlatList,TouchableHighlight} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
const City_Array = ['北京', '上海', '广州', '深圳', '杭州', '南京', '西安', '成都', '武汉'];
export default class SwipeableFlatListPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            dataArray: City_Array,
            isLoadingHeader: false,
            isLoadingFooter: false,
        }
    }

    _renderItem(data) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.item}>{data.item}</Text>
            </View>
        )
    }

    _keyExtractor = (item, index) => index;

    _loadNewData(refreshing) {
        if (refreshing) {
            //下拉刷新
            this.setState({
                isLoadingHeader: true,
            })
        }else {
        //    上拉
            if (!this.state.isLoadingFooter) {
                return;
            }
        }

        setTimeout(() => {
            let dataArray = [];
            if (refreshing) {
                //下拉刷新
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
                this.setState({
                    dataArray: dataArray,
                    isLoadingHeader: false,
                    isLoadingFooter:true,
                })
            }else {
                //上拉
                dataArray = this.state.dataArray.concat(City_Array);
                this.setState({
                    dataArray: dataArray,
                    isLoadingHeader: false,
                    isLoadingFooter:false,
                })
            }
        }, 2000)
    }

// 自带的刷新
// refreshing={this.state.isLoading}
// onRefresh={()=>{
//     this._loadData();
// }}

    _renderFooter(){
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size={'small'} animating={true} />
                <Text style={styles.footerTitle}>正在加载更多</Text>
            </View>
        )
    }

    _renderQuickAction(){
        return (
            <View style={styles.actionContainer}>
                <TouchableHighlight onPress={()=>{
                    alert('删除')
                }
                }>
                    <View style={styles.actionBtn}>
                        <Text style={styles.deleteTitle}>
                            删除
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    //renderQuickActions 用箭头函数返回就没有效果，不知道咋回事
    render() {
        return (
            <View style={styles.container}>
                <SwipeableFlatList
                    data={this.state.dataArray}
                    renderItem={
                        this._renderItem
                    }
                    keyExtractor={this._keyExtractor}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={'pink'}
                            colors={['pink']}
                            tintColor={'pink'}
                            refreshing={this.state.isLoadingHeader}
                            onRefresh={() => {
                                this._loadNewData(true);
                            }}
                        />
                    }
                    ListFooterComponent={()=>this._renderFooter()}
                    onEndReached={()=> this._loadNewData(false)}
                    renderQuickActions={this._renderQuickAction.bind(this)}
                    maxSwipeDistance={80}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    item: {
        fontSize: 20,
    },
    footerContainer:{
        alignItems: 'center',
        height: 60,
        paddingTop:10,
        paddingBottom:10,
    },
    footerTitle:{
        color:'#333',
        fontSize: 13,
        paddingTop:5,
    },
    actionContainer:{
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems:'center',
        paddingTop:10,
        paddingRight:10,
    },
    actionBtn:{
        flex:1,
        width:80,

        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'red',
    },
    deleteTitle:{
        color: 'white'
    },
});
