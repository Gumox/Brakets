import React from 'react';
import { View, Text } from 'react-native';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions'
import TopInfo from '../../components/TopInfo';
import TopInfoLess from '../../components/TopInfoLess';
import Bottom from '../../components/Bottom';
import store from '../../store/store';

const Alternative = styled.Text`
    color:#000000;
    font-size: 15px;
    align-items: center;
`;
const RegistText= styled.Text`
    color:#000000;
    font-weight: bold;
    font-size: 30px;
    margin-bottom:50px;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#78909c;
`;
const GrayText = styled.Text`
    font-size: 20px;
    color:#858585;
`;
const TopStateView = styled.View`
    /* flex:1; */
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

const check = async () => {
    try {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        if (result === RESULTS.GRANTED) {
        // console.log('ok');
        }
    } catch (error) {
        console.log('catch error');
        }
    };



// 구조 분해 할당, Destructuring Assignment
function ShopStepOne( { navigation } ) {
    state = {nextPage:'InputAlternativeNumber'};
    check();
    console.log(store.getState().customer)
    return (
        <Container>
            <TopStateView><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <TopInfoLess/>
            <CenterText>
                
                <RegistText>제품 등록</RegistText>
                <BlueText>제품의 바코드</BlueText>
                <GrayText>또는</GrayText>
                <BlueText>RFID의 QR코드</BlueText>
                <GrayText>를 스캔하세요</GrayText>
            </CenterText>
            <Alternative onPress={ ()=> navigation.navigate( 'InputAlternativeNumber' ,{key:"ProductInfo"})}>
                대체 코드 작성</Alternative>
            <Button onPress={ ()=> navigation.navigate( 'BarcodeScreen') }>
                코드 스캔
            </Button><Bottom navigation={navigation}/>
        </Container>
    )
}

export default ShopStepOne;