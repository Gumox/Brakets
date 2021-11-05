import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import styled from 'styled-components/native';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import Contents from '../components/Contents';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';

const Label = styled.Text`
    font-size: 15px;
    margin: 10px;
`;
const Input = styled.TextInput`
    width: 200px;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;

const PView = styled.View`
    
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;
const RegistText= styled.Text`
    font-weight: bold;
    font-size: 30px;
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
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

// 구조 분해 할당, Destructuring Assignment
function ShopStepFour( { navigation } ) {
    
    return (
        <Container>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
            <CenterText>
                
                <RegistText>수선증 확인</RegistText>
                <GrayText>및</GrayText>
                <RegistText>수선증 스캔</RegistText>
                
            </CenterText>
            
            <BlueText>수선증 바코드</BlueText>
            <GrayText>를 스캔하세요</GrayText>

            <Button onPress={ ()=> navigation.navigate( 'ScanScreen',{key:'ShopStepFour2'} ) }>
                코드 스캔
            </Button>
        </Container>
    )
}

export default ShopStepFour;