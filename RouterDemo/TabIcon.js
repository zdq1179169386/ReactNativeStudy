/**
 * Created by guoshuyu on 2017/2/10.
 */

import React, {
    Component,
} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import PropTypes from 'prop-types';



const propTypes = {
    focused: PropTypes.bool,
    title: PropTypes.string,
    tabName: PropTypes.string,
    tabIconName: PropTypes.string,
};

/**
 * 底部Tab
 */
export default class TabIcon extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let color = this.props.focused ? 'red' : '#a6aaaf';
        return (
            <View style={styles.centered}>
                <Icon name={this.props.tabIconName} size={20} color={color}/>
                <Text style={[{color: color}, {fontSize: 14}]}>{this.props.title}</Text>
            </View>
        );
    }
}

TabIcon.propTypes = propTypes;


const  styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignItems: "center"
    }
})
