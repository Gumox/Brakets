import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import AsyncStorage from '@react-native-community/async-storage';

import _ from 'lodash';

import { Image, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux';
import Bottom from '../../components/Bottom';
import Button from '../../components/Button';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Alert } from 'react-native';


const BottomView = styled.View`
    flex: 0.4;
    flex-direction: row;
    align-items: flex-end;
    /* background: red; */
`;

const BottomButton = styled.TouchableOpacity`
    width: 25%;
    height: 30%;
    background: #78909c;
    border-color: red;
    align-items: center;
    justify-content: center;
`;

const BottomButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;

const BottomEmptySpace = styled.View`
    background: #78909c;
    width: 100%;
    height: 3%;
`;


const TouchableView = styled.TouchableOpacity`
    
    flex-direction:row;
    justify-content:space-around;
    
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;

const ImgIcon = styled.Image`
    width: 20px;
    height: 20px;
`;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


function Setting({ navigation }) {

    const state = { size: 1 };

    const [number, setNumber] = useState(store.getState().number);
    console.log("store number in setting page" + number);

    const x = { "key": 2 };

    //새로고침 함수
    const [refreshing, setRefreshing] = React.useState(false);
    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            setRefreshing(false)

            console.log("is refreshing")
        });
    }, [])

    const savedResultId = AsyncStorage.getItem('user_id', (err, result) => {
        //user_id에 담긴 아이디 불러오기
        console.log("load saved userId " + result);
        // navigation.navigate('ReceiptDivision');
    });



    return (
        <Container>
            <Contents>

                {/* <Text>설정</Text> */}
            </Contents>

            <Button onPress={() =>
                Alert.alert(
                    "로그아웃",
                    "로그아웃 하시겠습니까?",
                    [
                        {
                            text: "네",
                            onPress: () => (
                                AsyncStorage.removeItem('user_id'),
                                navigation.navigate('Login')
                            ),
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
            </Button>

            <Button onPress={() => console.log(savedResultId)
                // console.log(savedResultId)
            }>
                조회
            </Button>

            <Bottom navigation={navigation} />
        </Container >
    )
}
export default Setting;