import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import styled from 'styled-components/native';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';


const Alternative = styled.Text`
    font-size: 15px;
    align-items: center;
`;
const RegistText= styled.Text`
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
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;

// 구조 분해 할당, Destructuring Assignment
function ShopStepOne( { navigation } ) {
    state = {nextPage:'InputAlternativeNumber'};
    return (
        <Container>
            
            <CenterText>
                <TopStateView><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
                <RegistText>제품 등록</RegistText>
                <BlueText>제품의 바코드</BlueText>
                <GrayText>또는</GrayText>
                <BlueText>RFID의 QR코드</BlueText>
                <GrayText>를 스캔하세요</GrayText>
            </CenterText>
            <Alternative onPress={ ()=> navigation.navigate( 'InputAlternativeNumber' )
                
                }>
                대체 코드 작성</Alternative>
            <Button onPress={ ()=> navigation.navigate( 'ScanScreen',{key:'ProductInfo'}) }>
                코드 스캔
            </Button>
        </Container>
    )
}

export default ShopStepOne;