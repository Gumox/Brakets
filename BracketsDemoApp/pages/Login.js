import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
  } from '@react-native-seoul/kakao-login';
  import React, { useState } from 'react';
  import styled from 'styled-components';
  import axios from 'axios';

// api에 값 날려서,
// 등록된 정보인지 확인

// 등록된 정보라면
// 다음 페이지로 이동
// AsyncStorage 사용해서, 자동 로그인 구현
// 토큰 값 사용 (?)

// 등록되지 않은 정보라면
// alert
// 초기화면
// useState 사용해서 저장한 값 모두 지우기
  
  function Login({ navigation }): React.ReactElement {
  
    const [userId, setUserID] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [result, setResult] = useState([]);
  
    const signInWithKakao = async (): Promise<void> => {
      const token: KakaoOAuthToken = await login();
      getProfile();
    };
  
    const signOutWithKakao = async (): Promise<void> => {
      const message = await logout();
    };
  
    const getProfile = async (): Promise<void> => {
      const profile: KakaoProfile = await getKakaoProfile();
  
      // console.log(profile.id);
      // console.log(profile.email);
  
      setUserID(profile.id);
      setUserEmail(profile.email);
  
      console.log(userId);
      console.log(userEmail);
    };
  
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
  