import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Alert, Image, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../store/store';
import ip from '../serverIp/Ip';


function Login({ navigation }): React.ReactElement {

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
        store.dispatch({ type: 'storeName', storeName: UserInfo.storeName })
        if(!tof){
          store.dispatch({ type: 'STORE_ID', store_id: UserInfo.data[0].store_id });
        }
        store.dispatch({type:"BRAND_ID",brand_id:UserInfo.data[0].brand_id })
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
    console.log(option.url)
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
        console.log(error)
        console.log(option.url)
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



  const signInWithKakao = async (): Promise<void> => {

    const token: KakaoOAuthToken = await login();

    await getProfile();

    //console.log("(sign in)user id: " + userId);
    //console.log("(sign in)user email: " + userEmail);
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();
  };

  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getKakaoProfile();

    console.log("profile id is " + profile.id);
    console.log("profile email is " + profile.email);

    setUserID(profile.id);
    setUserEmail(profile.email);
    setIsOn(!isOn);

    console.log("(get profile)user id: " + userId);
    console.log("(get profile)user email: " + userEmail);

  }

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();
  };


  return (
    <Container>
      <ImageView><ImgIcon source={require('../Icons/Suseon_OK_Icon.png')} /></ImageView>
      <Button onPress={() => signInWithKakao()}>
        <Label> 카카오 로그인 </Label>
      </Button>
    </Container>
  );
}

export default Login;

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
