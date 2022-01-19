import React from 'react';
import styled from 'styled-components'

import RNPickerSelect from 'react-native-picker-select';
import { useState ,useEffect } from 'react';

import Container from '../components/Container'
import CenterText from '../components/CenterText'
import Button from '../components/Button'
import Bottom from '../components/Bottom'
import { Alert ,Text,Pressable,View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store/store';

function RepairStepOne({ navigation,route }) {
  const staffInfo = store.getState().staffInfo
  const [items,setItems]=useState([]);
  let item =[];
  const [text, setText] = useState("");
  
  const setBrand = (value) => {
    staffInfo.forEach((obj,index)=>{
      if(obj.brand_id === value){
        console.log("label: "+obj.brand_name+" value: "+value)
        store.dispatch({type:"SET_BRAND",brand:{label: obj.brand_name,value:value}})
        console.log()
        
      }
    })
    console.log(store.getState())
  }
  
  useEffect(() => {
      
    staffInfo.forEach((elt,index) => {
      console.log(elt)
      store.dispatch({type:'SHOP_ID',shopId:elt.store_id});
      item.push({label:elt.brand_name, value: elt.brand_id})
    });
    setItems(item)
  }, []);
  const placeHolder = "회사를 선택해주세요.";

  return (
    <Container>
      <View style={{width:"100%",flexDirection:"row-reverse"}}><Pressable style={{margin:20}} onPress={() =>
                    Alert.alert(
                        "로그아웃",
                        "로그아웃 하시겠습니까?",
                        [
                            {
                                text: "네",
                                onPress: () => (
                                    AsyncStorage.removeItem('userInfo'),
                                    AsyncStorage.removeItem('staffInfo'),
                                    console.log('123'),
                                    navigation.replace('Login')
                                ),
                            },
                            {
                                text: "아니요",
                                onPress: () => console.log("Logout cancel"),
                            }
                        ],
                        { cancelable: false }
                    )}><Text>로그아웃</Text></Pressable></View>
      <CenterText>
        <Title>회사 설정</Title>
      </CenterText>

      <BlackText>회사를 설정하세요</BlackText>
      <MiddleView>
        <Input>
        <RNPickerSelect
            placeholder = {store.getState().brand}
            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black',placeholder:{color: '#AD8E5F'}} }
            onValueChange={(value) => {
                setBrand(value)
                setText(value);
                //console.log(store.getState().shopId);
                //console.log(text)
              }}
                items={
                    items
                }
            />
        </Input>
      </MiddleView>


      <Button onPress={() => {(text !== null) ? (
          navigation.navigate('PhotoStep',{id:text})
      ) : (
          Alert.alert('회사를 선택해주세요.')
          )}}>
        조회
      </Button>
      <Bottom navigation={navigation} />
    </Container>
  )
}

export default RepairStepOne;

const MiddleView = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
    min-height:100px;
`;

const Input = styled.View`
    width: 70%;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50%;
`;

const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;

const BlackText = styled.Text`
  font-size : 15px;
  color : black;
`;

const DropBackground = styled.View`
    width: 220px;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid #78909c;
    margin-top:10px;
`;

