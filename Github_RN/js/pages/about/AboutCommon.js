import {BackHandler} from "react-native";
import BackPressComponent from "../../common/BackPressComponent";
import {Actions} from "react-native-router-flux";

export  default  class AboutCommon {
    constructor(props){
        this.props = props;
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()})
    }

    onBackPress(){
        Actions.pop();
        return true;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress(){

    }
}
