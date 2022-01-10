import React from 'react';
import { View,Text } from 'react-native';
import store from '../store/store';

function TopInfo(props) {
    return (
        <View style={{width:'100%',flexDirection:"row",justifyContent:"space-around",marginBottom:10}}>
            <View style={{flexDirection:"row"}}><Text style={{color:"#000000",fontWeight: "bold",fontSize:15}}>{store.getState().receptionDivision.name}</Text><Text  style={{color:"#000000",fontWeight: "bold",fontSize:15}}> : </Text>
                <Text  style={{color:"#000000",fontWeight: "bold",fontSize:15}}>{store.getState().requirement.name}</Text>
            </View>
            <Text>  </Text>
            <View style={{flexDirection:"row"}}><Text style ={{color:"#000000",fontWeight:"bold"}}>{store.getState().customer.cName}</Text><Text style={{color:"#000000"}}> 님 진행중</Text></View>
        </View>
    )
}

export default TopInfo;

