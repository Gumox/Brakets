import React from 'react';
import { View,Text } from 'react-native';
import store from '../store/store';

function TopInfoLess(props) {
    
    const cName = store.getState().customer.cName
    let line;
    if(cName){
        line =(<View style={{flexDirection:"row"}}><Text style ={{color:"#000000",fontWeight:"bold"}}>{cName}</Text><Text style={{color:"#000000"}}> 님 진행중</Text></View>)
    }else{
        line =(<View style={{flexDirection:"row"}}><Text style ={{color:"#000000",fontWeight:"bold"}}></Text><Text style={{color:"#000000"}}>　　　　　</Text></View>)
    }
    return (
        <View style={{width:'100%',flexDirection:"row",justifyContent:"space-around",marginBottom:10}}>
            <View style={{flexDirection:"row"}}><Text style={{color:"#000000",fontWeight: "bold",fontSize:15}}>{store.getState().receptionDivision.name}</Text>
                
            </View>
            <Text>  </Text>
           {line}
        </View>
    )
}

export default TopInfoLess;
