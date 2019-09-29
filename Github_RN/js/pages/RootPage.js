import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {TOKEN_KEY,FirstShow_KEY} from "../res/Constant";
import actions from "../store/action";
import {connect} from "react-redux";

type Props = {};
 class RootPage extends Component<Props> {
    componentDidMount() {
        //判断是否是第一次加载，显示欢迎页
        AsyncStorage.getItem(FirstShow_KEY).then(value => {
            if (!value){
                //显示欢迎页
                Actions.reset('main')
            } else {
                const {initUserInfo} = this.props;
                initUserInfo((res) => {
                    if (res){
                        //已经登录过了
                        Actions.reset('root')
                    } else {
                        //未登录
                        Actions.reset('login')
                    }
                })
            }
        }).catch(error=>{
            error && console.log(error.toString());
        })
    }
     render() {
        return (
          <View/>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
})

const mapDispatchToProps = dispatch => ({
    initUserInfo : (callback) => dispatch(actions.initUserInfo(callback))
})

export default connect(mapStateToProps,mapDispatchToProps)(RootPage);

