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

 
  useEffect(() => {
    console.log(staffInfo);
      staffInfo.forEach((elt, index) => {
        store.dispatch({ type: 'SHOP_ID', shopId: elt.store_id });
      });
    
  }, []);

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
    align-items: center;
    justify-content: center
    border-radius:10px
    height: 40%;
    padding-left: 5px;
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

