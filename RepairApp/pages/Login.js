import React from 'react';
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
} from '@react-native-seoul/kakao-login';

function Login() {

    const signInWithKakao = async (): Promise<void> => {
        const token: KakaoOAuthToken = await login();

        setResult(JSON.stringify(token));
    };

    const signOutWithKakao = async (): Promise<void> => {
        const message = await logout();

        setResult(message);
    };

    const getProfile = async (): Promise<void> => {
        const profile: KakaoProfile = await getKakaoProfile();

        setResult(JSON.stringify(profile));
    };

    const unlinkKakao = async (): Promise<void> => {
        const message = await unlink();

        setResult(message);
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