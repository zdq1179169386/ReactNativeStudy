import {BackHandler} from "react-native";
import React, {PropTypes} from 'react';


export default class BackPressComponent {

    constructor(props){
        this._handleBackPress = this.onHardBackPress.bind(this);
        this.props = props;
    }

    componentDidMount() {
        if (this.props.backPress) {
            BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    componentWillUnmount() {
        if (this.props.backPress) {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    onHardBackPress(e){
        return this.props.backPress(e);
    }
}