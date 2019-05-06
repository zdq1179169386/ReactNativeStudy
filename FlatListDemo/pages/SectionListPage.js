/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SectionList} from 'react-native';



const City_Array = [{data:['北京', '上海', '广州', '深圳'],title:'一线城市'},{data: ['杭州', '南京', '西安', '成都', '武汉'],title:'二线城市'},{data: ['合肥','宁波','芜湖'],title:'三线城市'}];

export default class SectionListPage extends Component<Props> {

    _renderItem(data) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.item}>{data.item}</Text>
            </View>
        )
    }

    _keyExtractor = (item, index) => index;

    _renderSectionHeader(data){
        return(
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    {data.section.title}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={City_Array}
                    renderSectionHeader={(data)=>this._renderSectionHeader(data)}
                    renderItem={(data)=>this._renderItem(data)}
                    keyExtractor={this._keyExtractor}
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
    headerContainer:{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    headerTitle:{
        color:'black',
        fontSize: 20
    }
});
