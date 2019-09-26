import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, Modal} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Timespan from '../model/Timespan'
import DeviceInfo from "react-native";
import Ii8n from "../util/i18n";


export default class TrendingDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    show() {
        this.setState({
            visible: true,
        })
    }

    dismiss() {
        this.setState({
            visible: false,
        })
    }

    render() {
        const {onClose, onSelect} = this.props;
        return (
            <Modal transparent={true}
                   visible={this.state.visible}
                   onRequestClose={() => onClose}
            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.dismiss()}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                        style={styles.arrow}
                    />
                    <View style={styles.content}>
                        {this.props.timeSpans.map((result, i, arr) => {
                            return <TouchableOpacity key={arr[i].showTex} onPress={() => {
                                onSelect(arr[i])
                            }} underlayColor='transparent'>
                                <View style={styles.text_containter}>
                                    <Text style={styles.text}>
                                        {arr[i].showTex}
                                    </Text>
                                    {
                                        i !== this.props.timeSpans.length - 1 ? <View style={styles.line}></View> : null
                                    }
                                </View>
                            </TouchableOpacity>
                        })}
                    </View>
                </TouchableOpacity>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0

    },
    arrow: {
        marginTop: 40,
        color: 'white',
        padding: 0,
        margin: -15,
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3,
    },
    text_containter: {
        // alignItems: 'center',
        // flexDirection:'row',
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 25,
        paddingRight: 25
    },
    line: {
        height: 0.5,
        backgroundColor: 'lightgray'
    }
})
