import React, { useState, useEffect }  from 'react';

import styled from 'styled-components';
import { Alert, Text, Pressable, View, SafeAreaView, Platform } from 'react-native';
import Container from '../components/Container';
import CenterText from '../components/CenterText';
import Button from '../components/Button';
import Bottom from '../components/Bottom';


import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store/store';

function RepairStepOne({ navigation, route }) {
  const staffInfo = store.getState().staffInfo
  const [items, setItems] = useState([]);
  let item = [];
  const [text, setText] = useState("");

  const setBrand = (value) => {
    staffInfo.forEach((obj, index) => {
      if (obj.brand_id === value) {
        console.log("label: " + obj.brand_name + " value: " + value)
        store.dispatch({ type: "SET_BRAND", brand: { label: obj.brand_name, value: value } })
        console.log()

      }
    })
    console.log(store.getState())
  }

  useEffect(() => {

    staffInfo.forEach((elt, index) => {
      console.log(elt)
      store.dispatch({ type: 'SHOP_ID', shopId: elt.store_id });
      item.push({ label: elt.brand_name, value: elt.brand_id })
    });
    setItems(item)
  }, []);
  const placeHolder = "회사를 선택해주세요.";

  return (
    <Container>

      <MiddleView>
        <Button onPress={() =>
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
            )}>로그아웃</Button>
      </MiddleView>


     
      <Bottom navigation={navigation} />
    </Container>
  )
}

export default RepairStepOne;

const ContainerSafeView = styled.SafeAreaView`
  flex: 1;
`;

const MiddleView = styled.View`
    flex: 1;
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

