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

  const isFirstRun = useRef(true);

  useEffect(() => {

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const option = {

      url: ip + `/api/auth/store?email=${userEmail}&userId=${userId}`,
      // url: `http://34.64.182.76/api/auth/store?email=$&userId=`,

      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },

    }

    axios(option)
      .then(
        response => (response.status == '200') && (response.data.data[0].name) ? (
          savedInfo(response.data.data),
          console.log(response.data.data),
          saveId(response.data.data[0].name, userEmail),
          console.log()
        ) : (
          console.log("response" + response)
        )
      )
      .catch(function (error) {
        console.log(error)
        console.log(option.url)
        Alert.alert(
          "등록된 정보가 존재하지 않습니다.",
          [
            { text: "확인" },
          ]
        )
      })

    // console.log(new Date());
  });

  function saveId(_userName, _userEmail) {

    AsyncStorage.setItem(
      'userInfo',
      JSON.stringify({
        'userEmail': _userEmail,
        'userName': _userName
      }), () => {
        console.log('user id and user email\'s saved: ' + _userName, _userEmail);
        store.dispatch({ type: 'storeStaffId', storeStaffId: _userEmail });
        store.dispatch({ type: 'storeName', storeName: _userName })
        navigation.replace('ReceiptDivision');
      });


  }
  function savedInfo(data) {
    AsyncStorage.setItem(
      'info',
      JSON.stringify({
        "data": data
      }), () => {
        store.dispatch({ type: 'USER_INFO', userInfo: data })
        console.log(data)
        console.log(store.getState().userInfo)
      });
  }
  const savedResultInfo = AsyncStorage.getItem('info', (err, result) => {
    if (result !== null) {
      const UserInfo = JSON.parse(result);
      console.log(UserInfo.data[0])
      store.dispatch({ type: 'USER_INFO', userInfo: UserInfo.data })
      console.log(store.getState().userInfo[0].staff_id)
    }
  })

  const savedResultId = AsyncStorage.getItem('userInfo', (err, result) => {
    //user_id에 담긴 아이디 불러오기
    if (result !== null) {
      const UserInfo = JSON.parse(result);
      //console.log(UserInfo)
      store.dispatch({ type: 'storeStaffId', storeStaffId: UserInfo.userEmail });
      store.dispatch({ type: 'storeName', storeName: UserInfo.userName })
      navigation.replace('ReceiptDivision');
    }
  });


  const signInWithKakao = async (): Promise<void> => {

    const token: KakaoOAuthToken = await login();

    await getProfile();

    console.log("(sign in)user id: " + userId);
    console.log("(sign in)user email: " + userEmail);
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
