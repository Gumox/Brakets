import React, { useState, useEffect, useRef } from 'react';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import styled from 'styled-components';
import ip from '../serverIp/Ip';
import axios from 'axios'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store/store';


function Login({ navigation }) {

  const isFirstRun = useRef(true);

  const [result, setResult] = useState();

  function SaveInfo(_info, _userEmail) {

    AsyncStorage.setItem(
      'staffInfo',
      JSON.stringify({
        'info': _info,
        'userEmail': _userEmail
      }), () => {
        store.dispatch({ type: 'USER_EMAIL', userEmail: _userEmail });
        store.dispatch({ type: 'STAFF_INFO', staffInfo: _info });
      })
  }

  function loadInfo() {

    AsyncStorage.getItem('staffInfo', (err, result) => {
      if (result !== null) {
        const staffInfo = JSON.parse(result);

        store.dispatch({ type: 'USER_EMAIL', userEmail: staffInfo.userEmail });
        store.dispatch({ type: 'STAFF_INFO', staffInfo: staffInfo.info });

        navigation.replace('PhotoStep', { info: staffInfo.info });
      }
    })
  }

  function check(info) {
    if (info === null || info === undefined) {

    } else {
      navigation.replace('PhotoStep', { info: info })
    }
  }


  useEffect(() => {

    if (isFirstRun.current) {
      isFirstRun.current = false;
      loadInfo();
      return;
    }

    const option = {

      url: ip + `/api/auth/repair?email=${result}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
    }


    axios(option)
      .then(
        response => (response.status == '200') ? (
          console.log("success"),
          console.log(response.data.body),

          SaveInfo(response.data.data, result),
          check(response.data.data)
        ) : (
          console.log("response" + response.data),
          console.log(option.url)
        )
      )
      .catch(function (error) {
        console.log(error)
        console.log(option.url)/*
        Alert.alert(
          "등록된 정보가 존재하지 않습니다.",
          [
            { text: "확인" },
          ]
        )*/
      })
  }, [result]);

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    // setResult(JSON.stringify(token));
    // console.log(JSON.stringify(token));
    await getProfile();
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getKakaoProfile();

    setResult(profile.email);
  };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();
    setResult(message);
  };

  return (
    <Container>
      <ImageView><ImgIcon source={require('../Icons/Suseon_OK_Repair.png')} /></ImageView>
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