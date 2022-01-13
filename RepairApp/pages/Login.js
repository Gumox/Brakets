import React, {useState, useEffect, useRef} from 'react';
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
  } from '@react-native-seoul/kakao-login';
import styled from 'styled-components';

function Login({navigation}) {

    const isFirstRun = useRef(true);

    const [result, setResult] = useState();
    const [test, setTest] = useState();

    useEffect(() => {

        // if (isFirstRun.current) {
        //   isFirstRun.current = false;
        //   return;
        // }

        console.log("effect run")
        console.log(result)
        if(result !== null){
        navigation.replace('RepairStepOne');
        }

      }, [result]);

    const signInWithKakao = async (): Promise<void> => {
        const token: KakaoOAuthToken = await login();
      
        setResult(JSON.stringify(token));
        console.log(JSON.stringify(token));
        await getProfile();
      };
      
      const signOutWithKakao = async (): Promise<void> => {
        const message = await logout();
      
        setResult(message);
      };
      
      const getProfile = async (): Promise<void> => {
        const profile: KakaoProfile = await getKakaoProfile();
      
        setResult(JSON.stringify(profile.email));
        console.log("log: " + JSON.stringify(profile.email));
        console.log("result is: "+result);

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
        <Button onPress={() => getProfile()}>
          <Label> 프로필 조회 </Label>
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