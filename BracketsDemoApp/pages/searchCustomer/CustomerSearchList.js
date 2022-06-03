import React,{useState ,useEffect} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import CenterText from '../../components/CenterText';

import _ from 'lodash';
import Button from '../../components/Button';
import { Image,Text, View, TouchableHighlight, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux'
import { getList } from '../../Functions/GetSendList';
import Bottom from '../../components/Bottom';
import {useNetInfo}from "@react-native-community/netinfo";


export default function CustomerSearchList({route, navigation}){
    const customers = route.params.customers;
    console.log(customers)
    const [cName,setCName] = useState(null);
    const [cPhone,setCPhone] = useState();
    let cInfoList =[];
    for (let i = 0; i < customers.length; i++) {
        const key =i;
      
        
        let customer =(
            <View key = {key} style ={{justifyContent:'center',alignItems:"center" }} >
                <TouchableHighlight underlayColor={"#CCC"} style={{ width:"80%",backgroundColor:"#ffffff",  borderBottomColor: '#d6d6d6' ,borderBottomWidth:3,margin:2}} onPress={()=>{ 
                    setCName(customers[key].cName);
                    setCPhone(customers[key].cPhone);
                    if(netInfo.isConnected){
                        store.dispatch({type:'CUSTOMER',customer: customers[key]});
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    }
                    }}>
                    <PrView><Label>{customers[key].cName}   </Label><Label>{customers[key].cPhone}</Label></PrView>
                </TouchableHighlight>
            </View>
        );
        cInfoList[key] = (customer)
    }
    const netInfo = useNetInfo();
    
    return(
        <Container style= {{backgroundColor:"#ffffff"}}>
            <Label/>
            <Title>고객 목록</Title>
            <Label>고객 이름</Label>
            <Input editable={false} value ={cName}/>
            <Label>연락처</Label>
            <Input editable={false} value ={cPhone}/>        
        
            <ContentsScroll>
               {cInfoList}
            </ContentsScroll>
            <Button onPress={ ()=> {
                if(netInfo.isConnected){
                    console.log(cName)
                    if(cName == null){
                        Alert.alert("접수고객 미선택","접수 고객을 선택 해주세요")
                    }else{
                        navigation.navigate("CustomerInfo")
                    }
                }else{
                    Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                }
            }}>
                다음
            </Button>
        </Container>
    )

}



const Label = styled.Text`
    color:#000000;
    font-size: 18px;
    margin:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-around;
`;
const BtView = styled.View`
    flex-direction: row;
    justify-content:space-between;
    width: 75%;
`;
const Input = styled.TextInput`
    color:#000000
    width: 80%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const ContentsScroll = styled.ScrollView`
    width: 100%;
    flex: 1;
    margin-top: 13%;
    align-content: center;
`;
const CustomerListText = styled.Text`
    color:#000000;
    width : 95%;
    height : 15%;
    border-top: 2px solid;
    border-bottom: 2px solid;
    
`;
const Title = styled.Text`
    color:#000000;
  font-size : 24px;
  font-weight : bold;
`;