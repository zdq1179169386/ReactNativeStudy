import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import {Button} from 'react-native-elements'
import {D_WIDTH} from '../util/ScreenUtil'
import Toast from "../common/ToastProxy";
import actions from "../store/action";


class LoginPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.state={
            name: '',
            password:'',
            loginBtnStatus: true,
            loginBtnLoading: false,
        }
    }
    render() {
        const {theme} = this.props;
        return (
            <View style={styles.container}>
                <Ionicons name={'logo-github'} size={100}
                          style={{marginTop: 200, color: theme.themeColor}}/>

                <TextInput ref={'name'} autoCapitalize={'none'} placeholder={'请输入用户名'} style={styles.inputStyle} onChangeText={(text)=>this.nameChange(text)}/>
                <TextInput ref={'password'} placeholder={'请输入密码'} secureTextEntry={true} style={styles.inputStyle} onChangeText={(text)=>this.pswChange(text)}/>
                <Button loading={this.state.loginBtnLoading} title='登录'  type={'solid'} disabled={this.state.loginBtnStatus}  onPress={() => this.login()} buttonStyle={{marginTop: 20, backgroundColor: this.props.theme.themeColor, width: Dimensions.get('window').width - 40, height: 45}}/>
            </View>
        )
    }

    nameChange(text) {
        this.state.name = text
        if (this.state.name.length > 0 && this.state.password.length> 0){
            this.setState({
                loginBtnStatus: false
            })
        } else{
            this.setState({
                loginBtnStatus: true
            })
        }
    }
    pswChange(text) {
        this.state.password = text
        if (this.state.name.length > 0 && this.state.password.length> 0){
            this.setState({
                loginBtnStatus: false
            })
        } else{
            this.setState({
                loginBtnStatus: true
            })
        }
    }
    login() {
        this.setState({
            loginBtnLoading: true
        })
        const {doLogin} = this.props;
        Keyboard.dismiss();
        doLogin(this.state.name,this.state.password,(res) => {
            this.setState({
                loginBtnLoading: false
            })
            if (!res) {
                Toast('login fail')
            } else{
                Actions.reset('root')
            }
        })
    }

}

const mapStateToProps = state => ({
    theme: state.theme.theme,
})

const mapDispatchToProps = dispatch => ({
    doLogin: (userName,password, callback) => dispatch(actions.doLogin(userName,password,callback)),
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputStyle: {
        marginTop: 20,
        borderRadius: 10,
        height: 45,
        borderWidth:0.5,
        borderColor:'lightgray',
        width:'90%',
        paddingLeft:10,
        fontSize: 18
    },
})
