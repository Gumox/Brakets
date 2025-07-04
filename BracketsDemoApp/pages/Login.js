import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  loginWithKakaoAccount,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Alert, Image, View,Text, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../store/store';
import ip from '../serverIp/Ip';


function Login({ navigation }) {

  const [userId, setUserID] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isOn, setIsOn] = useState(false);

  const isFirstRun = useRef(true);

  function SaveInfo(_userName, _userEmail, _data,_storeName){
    console.log(_userName)
      
      AsyncStorage.setItem(
        'userInfo',
        JSON.stringify({
          'userName': _userName,
          'userEmail': _userEmail,
          "data": _data,
          "storeName":_storeName
        }), () => {
          console.log('user id and user email\'s saved: ' + _userName, _userEmail);
          store.dispatch({ type: 'storeStaffId', storeStaffId: _userEmail });
          store.dispatch({ type: 'storeName', storeName: _storeName })
          store.dispatch({ type: 'STORE_ID', store_id: _data[0].store_id });
          store.dispatch({ type: 'USER_INFO', userInfo: _data })
          store.dispatch({type:"BRAND_ID",brand_id:_data[0].brand_id })
          navigation.replace('ReceiptDivision');
        });
  }

  function LoadInfo(){
    let _store

    AsyncStorage.getItem('selectedStore', (err, result) => {
      if (result !== null) {
      const info = JSON.parse(result);
          store.dispatch({ type: 'STORE_ID', store_id: info.selectedStore });
          store.dispatch({ type: 'storeName', storeName: info.selectedStoreName })
          store.dispatch({type:"BRAND_ID",brand_id:info.selectedStoreBrandId })
          console.log(info)
          _store = info.selectedStore
      }
    })

    AsyncStorage.getItem('userInfo', (err, result) => {
      if (result !== null) {
        const UserInfo = JSON.parse(result);
        let arr = UserInfo.data
        let tof = false
        for(let item of arr){
          if(item.store_id == _store){
            tof = true
            break
          }
        }
        store.dispatch({ type: 'USER_INFO', userInfo: UserInfo.data })
        store.dispatch({ type: 'storeStaffId', storeStaffId: UserInfo.userEmail });
        if(!tof){
          store.dispatch({ type: 'STORE_ID', store_id: UserInfo.data[0].store_id });
          store.dispatch({ type: 'storeName', storeName: UserInfo.storeName })
          store.dispatch({type:"BRAND_ID",brand_id:UserInfo.data[0].brand_id })
        }
        navigation.replace('ReceiptDivision');

      }
    })
    
  }

  useEffect(() => {

    if (isFirstRun.current) {
      isFirstRun.current = false;
      LoadInfo();
      return;
    }
    const option = {

      url: ip + `/api/auth/store?email=${userEmail}`,
      // url: `http://34.64.182.76/api/auth/store?email=$&userId=`,

      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },

    }
    axios(option)
      .then(
        response => (response.status == '200') && (response.data.data[0].name) ? ( 
          console.log(response.data),
          SaveInfo(response.data.data[0].staff_name, userEmail, response.data.data,response.data.data[0].name)
        ) : (
          console.log("response" + response)
        )
      )
      .catch(function (error) {
        Alert.alert("등록된 정보가 존재하지 않습니다.","",
        { text: "확인", onPress: () =>{}}
        )
        /*Alert.alert(
          "등록된 정보가 존재하지 않습니다.",
          [
            { text: "확인" },
          ]
        )*/
      })
  }, [isOn]);



  const signInWithKakao = async () => {

    const token = await login();

    await getProfile();

    //console.log("(sign in)user id: " + userId);
    //console.log("(sign in)user email: " + userEmail);
  };
  const signInWithKakaoOther = async () => {

    const token = await loginWithKakaoAccount();

    await getProfile();

    //console.log("(sign in)user id: " + userId);
    //console.log("(sign in)user email: " + userEmail);
  };
  const signOutWithKakao = async ()=> {
    const message = await logout();
  };

  const getProfile = async ()=> {
    const profile = await getKakaoProfile();

    console.log("profile id is " + profile.id);
    console.log("profile email is " + profile.email);

    setUserID(profile.id);
    setUserEmail(profile.email);
    setIsOn(!isOn);

    console.log("(get profile)user id: " + userId);
    console.log("(get profile)user email: " + userEmail);

  }
  

  const unlinkKakao = async ()=> {
    const message = await unlink();
  };


  return (
    <Container>
      <ImageView><ImgIcon source={require('../Icons/Suseon_OK_Icon.png')} /></ImageView>
      <Button onPress={() => signInWithKakao()}>
        <Label> 카카오 로그인 </Label>
      </Button>
      <TouchableHighlight underlayColor={"rgba(0,0,0,0.1)"} style={{padding:2,borderRadius:4}} onPress={()=>{signInWithKakaoOther()}}>
        <OtherLoginText> 다른 계정으로 로그인 </OtherLoginText>
      </TouchableHighlight>
    </Container>
  );
}

export default Login;
const OtherLoginText = styled.Text`
  font-size:10px;
  color:#000;
`
const ImgIcon = styled.Image`
    width: 200px;
    height: 200px;
    border-radius:15px;
`;
const ImageView = styled.View`
    width: 205px;
    height: 205px;
    border-radius:15px;
    justify-content: center;
    align-items: center;
`;
const Container = styled.View`
    flex: 1;
    align-self: stretch;
    overflow: scroll;
    background-color: ${({ theme }) => theme.background};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    `;
const ResultView = styled.View`
    flex: 1;
    `;
const Button = styled.TouchableOpacity`
    width: 75%;
    height: 50px;
    background: #F7E314;
    justify-content: center;
    align-items: center;
    margin:15px;
    border-radius:12px;
    `;
const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    `;
const MiddleView = styled.View`
    flex:1;
    `;
