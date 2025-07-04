import React, { useState, useEffect, useRef } from 'react';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  loginWithKakaoAccount,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import styled from 'styled-components';
import ip from '../serverIp/Ip';
import axios from 'axios'
import { Alert,TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store/store';

const REQUEST_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const REQUEST_TOKEN_INFO_URL = "https://kapi.kakao.com/v2/user/me";
const THIRTY_MINUTES = 60 * 30 * 1000;


function Login({ navigation }) {

  const isFirstRun = useRef(true);

  const [result, setResult] = useState();
  const [resultId, setResultID] = useState();

  function SaveInfo(_info, _userEmail) {
    console.log(_info)
    AsyncStorage.setItem(
      'staffInfo',
      JSON.stringify({
        'info': _info,
        'userEmail': _userEmail
      }), () => {
        store.dispatch({ type: 'USER_EMAIL', userEmail: _userEmail });
        store.dispatch({ type: 'STAFF_INFO', staffInfo: _info });
        navigation.replace('PhotoStep', { info: _info })
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
    }
  }


  useEffect(() => {

    if (isFirstRun.current) {
      isFirstRun.current = false;
      loadInfo();
      return;
    }
    console.log(result)
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

          SaveInfo(response.data.data, result)
          //check(response.data.data)
        ) : (
          console.log("not success"),
          console.log(response.status),
          Alert.alert(
            "등록된 정보가 존재하지 않습니다.",""
          )
        )
      )
      .catch(function (error) {
        console.log("error")
        console.log(error)
        Alert.alert(
          "등록된 정보가 존재하지 않습니다.",""
        )
      })
  }, [result]);

  
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
  const signOutWithKakao = async ()  => {
    const message = await logout();

    setResult(message);
  };

  const getProfile = async ()  => {
    const profile  = await getKakaoProfile();
    setResult(profile.email);
    setResultID(profile.id)
  };

  const unlinkKakao = async ()  => {
    const message = await unlink();
    setResult(message);
  };

  return (
    <Container>
      <ImageView><ImgIcon source={require('../Icons/Suseon_OK_Repair.png')} /></ImageView>
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