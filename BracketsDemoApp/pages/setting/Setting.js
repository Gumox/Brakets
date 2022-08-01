import React,{useEffect} from 'react';
import { Alert,Appearance } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

import Container from '../../components/Container';
import Contents from '../../components/Contents';
import styled from 'styled-components/native';
import store from '../../store/store';
import Bottom from '../../components/Bottom';
import Button from '../../components/Button';
import ReceiptButton from '../../components/ReceiptButton';
import CenterText from '../../components/CenterText';
import checkChangedUserInfo from '../../Functions/CheckChangedUserinfo';


const OverallView = styled.View`
    padding: 8px;
    padding-bottom: 30px;
    font-size: 20px;
    border-radius:10px;
    margin-top: 30px
    margin-bottom: 30px;
    width: 300px;
`;

const FirstTextView = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
    color:#000000;
`;

const SecondTextView = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border-radius:10px;
    color:#000000;
    margin-top: 20px;
    margin-bottom: 5px;
`;

function Setting({ navigation }) {

    // const savedResultId = AsyncStorage.getItem('user_id', (err, result) => {
    //     console.log("load saved userId " + result);
    // });
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
    // Use dark color scheme
        console.log("dark")
    }

    const storeId = store.getState().store_id;
    const smsBody = {
        "storeId": storeId,
        "receiptId":243,

    }//

    const savedResultId = AsyncStorage.getItem('userInfo', (err, result) => {
        //user_id에 담긴 아이디 불러오기
        if (result !== null) {
            const UserInfo = JSON.parse(result);
            console.log('닉네임 : ' + UserInfo.userEmail); // 출력 => 닉네임 : User1 
            console.log('휴대폰 : ' + UserInfo.userName); //  출력 => 휴대폰 : 010-xxxx-xxxx
            console.log("load saved userId " + result);

            return UserInfo.userName;
        }
    });

    const storeName = store.getState().storeName;
    const storeEmail = store.getState().storeStaffId;
    
    useEffect(() => {
        checkChangedUserInfo(navigation)
   }, []);
    return (
        <Container style= {{backgroundColor:"#ffffff"}}>

            <CenterText>
                <OverallView>
                    <SecondTextView
                        editable={false}
                        selectTextOnFocus={false}
                        value={'매장명'}
                    />
                    <FirstTextView
                        editable={false}
                        selectTextOnFocus={false}
                        value={storeName}
                    />
                </OverallView>
                <ReceiptButton onPress={() =>
                    Alert.alert(
                        "로그아웃",
                        "로그아웃 하시겠습니까?",
                        [
                            {
                                text: "네",
                                onPress: () => (
                                    AsyncStorage.removeItem('userInfo'),
                                    
                                    navigation.reset({routes: [{name: 'Login'}]})

                                    
                                    )
                            },
                            {
                                text: "아니요",
                                onPress: () => console.log("Logout cancel"),
                            }
                        ],
                        { cancelable: false }
                    )
                }>
                    로그아웃
                </ReceiptButton>
            </CenterText>

            

            <Bottom navigation={navigation} />
        </Container >
    )
}
export default Setting;