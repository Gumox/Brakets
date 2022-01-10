import React,{useState ,useEffect} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import CenterText from '../../components/CenterText';

import _ from 'lodash';
import Button from '../../components/Button';
import { Image,Text, View, TouchableHighlight } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux'
import { getList } from '../../Functions/GetSendList';
import Bottom from '../../components/Bottom';


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
    border-radius:10px
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
export default function CustomerSearchList({route, navigation}){
    const customers = route.params.customers;
    
    const [cName,setCName] = useState();
    const [cPhone,setCPhone] = useState();
    var cInfoList =[];
    for (let i = 0; i < customers.length; i++) {
        const key =i;
      
        
        var customer =(
            <View key = {key} style ={{justifyContent:'center',alignItems:"center" }} >
                <TouchableHighlight underlayColor={"#CCC"} style={{ width:"80%", borderRadius :15 , backgroundColor: '#d6d6d6' ,margin:10}} onPress={()=>{ 
                    setCName(customers[key].cName);
                    setCPhone(customers[key].cPhone);
                    store.dispatch({type:'CUSTOMER',customer: customers[key]});
                    console.log(store.getState().customer)
                    }}>
                    <PrView><Label>{customers[key].cName}   </Label><Label>{customers[key].cPhone}</Label></PrView>
                </TouchableHighlight>
            </View>
        );
        cInfoList[key] = (customer)
    }
    return(
        <Container>
            <Label/>
            <Title>고객 목록</Title>
            <Label>고객 이름</Label>
            <Input value ={cName}/>
            <Label>연락처</Label>
            <Input value ={cPhone}/>        
        
            <ContentsScroll>
               {cInfoList}
            </ContentsScroll>
            <Button onPress={ ()=> {
                navigation.navigate("CustomerInfo")
            }}>
                다음
            </Button>
        </Container>
    )

}

