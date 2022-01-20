import { Image, View } from "react-native";
import store from "../store/store";

export default function check(){
    return(
        <View style={{flex:1}}>
            <Image style={{flex:1}} source={{uri : store.getState().photo}}/>
        </View>
    )
}