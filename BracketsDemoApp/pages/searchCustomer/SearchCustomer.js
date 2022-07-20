import React, { useState } from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import Bottom from '../../components/Bottom';
import { Alert, Pressable, View } from 'react-native';
import store from '../../store/store';
import ip from '../../serverIp/Ip';
import { Keyboard, TouchableWithoutFeedback,TouchableHighlight } from 'react-native';
import {useNetInfo}from "@react-native-community/netinfo";

// 구조 분해 할당, Destructuring Assignment
function SearchCustomer({ navigation }) {

  const [pNumber, setPnumber] = useState(null);

  const userInfo =store.getState().userInfo[0]

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const customers = [];
  const parseData = (body) => {


    for (let i = 0; i < body.length; i++) {
      console.log(body[i].name);
      console.log(body[i].phone);
      customers.push({ cName: body[i].name, cPhone: body[i].phone, cId: body[i].customer_id });
      console.log(customers);
    }
  }
  const netInfo = useNetInfo();
  

  const getCustomer = async (bodyData) => {
    try {
      const response = await fetch(ip + '/api/getCustomer', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
        });
        const json = await response.json(); // !!!
        setData(json.body);
        console.log(json.body);
        parseData(json.body);
        setLoading(false);
        navigation.navigate('CustomerSearchList',{customers:customers})
    } catch (error) {
        console.log(error)
        console.log("?????-------")
        if(data == null || data == ""){
          Alert.alert(            
            "",             
            "고객 정보가 없습니다",                   
            [                              
                { text: "확인"},
            ]
          )
        }
    } finally {
        setLoading(false);  
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style= {{backgroundColor:"#ffffff"}}>
        <CenterText>
          <Title>고객 조회</Title>

          <BlackText>연락처 (뒤 4자리)</BlackText>
          <DropBackground>
            <Input
              maxLength={4}
              keyboardType='numeric'
              onChangeText={(value) => {
                console.log(value)
                setPnumber(value)
              }}
              onSubmitEditing={(event) => (getCustomer({ "lastphone": pNumber }))}
            ></Input>
            </DropBackground>
          </CenterText>
          <TouchableHighlight underlayColor={"#CCC"} style ={{margin:20 ,minWidth:200,minHeight:50, borderRadius:20}} onPress={()=>{
                navigation.navigate("AddCustomer")
            }}>
              <View style={{minWidth:200,minHeight:50,justifyContent:"center",alignItems:"center"}}><BlackText>신규 고객 등록</BlackText></View>
            </TouchableHighlight>
          <Button onPress = {() =>{ 
            if(pNumber != null&&pNumber.length>3){

              if(netInfo.isConnected){
                setData([]);
                console.log(data);
                store.dispatch({ type: 'CUSTOMER_SIGN', customerSign: "" });
                getCustomer({ lastphone: pNumber ,headquarterId:userInfo.headquarter_id});
              }else{
                Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
              }
          }
          else {
            Alert.alert(
              "",
              "연락처 (뒤 4자리)를 입력하세요",
              [
                { text: "확인" },
              ]
            )
          }
        }}>
          조회
        </Button>
        <Bottom navigation={navigation} />
      </Container>
    </TouchableWithoutFeedback>

  )
}
export default SearchCustomer;


const Title = styled.Text`
  color :#000000
  font-size : 24px;
  font-weight : bold;
  color:#000000;
  marginBottom:15px;
`;
const BlackText = styled.Text`
  color :#000000
  font-size : 15px;
  color : black;
`;
const DropBackground = styled.View`
    width: 300px;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid rgb(0,80,130);
    margin-top:10px;
`;
const Input = styled.TextInput`
    color:#000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border-radius:10px;
`;
