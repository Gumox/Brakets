import React from "react";
import { View ,Image } from "react-native";
import store from "../store/store";
export default function check({naviation ,route}){
    console.log(route.params.img)
    console.log(store.getState().img)
    return(
        <View style ={{flex:1}}>
            <Image style={{flex:1 ,width:"50%",height:"50%"}} source={{uri : route.params.img}}/>
            
            <Image style={{flex:1,width:"50%",height:"50%"}} source={{uri : store.getState().img}}/>
        </View>
    )
}