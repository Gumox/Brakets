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
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// api에 값 날려서,
// 등록된 정보인지 확인

// 등록된 정보라면
// 다음 페이지로 이동 -> await로 맞춰주기

// 등록되지 않은 정보라면
// alert
// 초기화면
// useState 사용해서 저장한 값 모두 지우기

//---------------------- 완료 ----------------------


// AsyncStorage 사용해서, 자동 로그인 구현
// 토큰 값 사용 (?)



function Login({ navigation }): React.ReactElement {

  const [userId, setUserID] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [result, setResult] = useState('');
  const isFirstRun = useRef(true);
  useEffect (() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const option = {
      url: `http://34.64.182.76/api/auth/store?email=${userEmail}&userId=${userId}`,
      // url: `http://34.64.182.76/api/auth/store?email=$&userId=`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
    }

    axios(option)
      .then(
        response => (response.status == '200') && (response.data.data[0].name) ? (
          saveId(userEmail)
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

    console.log("Effect was run");
  }, [userId, userEmail]);

  function saveId(_userEmail) {
    AsyncStorage.setItem('user_id', _userEmail, () => {
      // console.log('userId saved: ' + _userEmail)
      navigation.navigate('ReceiptDivision');
    });
  }

  const savedResultId = AsyncStorage.getItem('user_id', (err, result) => {
    //user_id에 담긴 아이디 불러오기
    // console.log("load saved userId " + result);
    navigation.navigate('ReceiptDivision');
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
      <ResultView>
      </ResultView>
      <MiddleView>

      </MiddleView>
      <Button onPress={() => signInWithKakao()}>
        <Label> 카카오 로그인 </Label>
      </Button>

      <Button onPress={() => getProfile()}>
        <Label> 프로필 정보 </Label>
      </Button>
    </Container>
  );
}

export default Login;

const Container = styled.View`
      flex: 1;
      align-self: stretch;
      overflow: scroll;
      background-color: ${({ theme }) => theme.background};
      flex-direction: column;
      justify-content: flex-start;
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
    `;
