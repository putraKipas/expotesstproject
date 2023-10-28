import {View} from "react-native";

export function Gap(props) {

    let height = props.height;
    let width = props.width;

    return <View style={{height:height, width:width}} />;
}