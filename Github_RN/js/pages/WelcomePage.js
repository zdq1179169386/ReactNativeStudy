import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';

import {TouchableOpacity} from "react-native-gesture-handler";
import Swiper from 'react-native-swiper';
import {isIphoneX} from '../util/ScreenUtil';
import {Actions} from 'react-native-router-flux';
import AsyncStoragePage from "./AsyncStoragePage";
import {TOKEN_KEY,FirstShow_KEY} from "../res/Constant";

type Props = {};
export default class WelcomePage extends Component<Props> {
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} loop={false} showsPagination={false}>
                <View style={styles.slide1}>
                    <Image
                        source={isIphoneX() ? require('../../resource/images/intro_x/xz_img_intro_x01.png') : require('../../resource/images/intro/xz_img_intro_01.png')}/>
                </View>
                <View style={styles.slide2}>
                    <Image
                        source={isIphoneX() ? require('../../resource/images/intro_x/xz_img_intro_x02.png') : require('../../resource/images/intro/xz_img_intro_02.png')}/>
                </View>
                <View style={styles.slide3}>
                    <Image source={isIphoneX() ? require('../../resource/images/intro_x/xz_img_intro_x03.png') : require('../../resource/images/intro/xz_img_intro_03.png')}/>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button} onPress={()=> {
                            AsyncStorage.setItem(FirstShow_KEY,'notfirst')
                            Actions.reset('login')
                        }}>
                            <Text style={styles.countText}>立即体验</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
    },
    btnContainer:{
        // backgroundColor: 'red',
        position: 'absolute',
        bottom: 50,
        width: Dimensions.get('window').width,
        height: 40
    },
    button: {
        alignItems: 'center',
        justifyContent:'center',
        padding: 10,
    },
    countText: {
        color: '#398DFF',
        fontSize: 17,
        fontWeight: 'bold',
    }
});
