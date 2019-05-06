import React, {Component} from 'react';
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";


export default class HomePage extends Component<Props> {

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return (
            <DynamicTabNavigator/>
        );
    }
}

