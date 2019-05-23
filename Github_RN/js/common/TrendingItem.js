import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview';
import BaseItem from './BaseItem'


export default class TrendingItem extends BaseItem {

    render() {
        const {projectModel} = this.props;
        const {item} = projectModel;
        if (!item ) return null;


        let description = '<p>'+ item.description +'</p>';

        return <TouchableOpacity
            onPress={()=>this.onItemClick()}
        >
            <View style={styles.cellContainer}>
                <Text style={styles.title}>
                    {item.fullName}
                </Text>
                <HTMLView
                    value={description}
                    onLinkLongPress={(url)=>{

                    }}
                    stylesheet={{
                        p: styles.description,
                        a: styles.description,
                    }}
                />
                <Text style={styles.description}>
                    {item.description}
                </Text>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text>Build By:</Text>
                        {item.contributors.map((item,i,arr)=>{
                            return (
                                <Image key={i} style={{height: 22, width: 22,margin: 2}} source={{uri: arr[i]}}/>
                            )
                        })}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Start:</Text>
                        <Text>{item.forkCount}</Text>
                    </View>
                    {this._favoriteIcon()}
                </View>
            </View>
        </TouchableOpacity>

    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cellContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
})