import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import styled from 'styled-components/native';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../components/StateBarSolid';

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
const CompleteV = styled.View`
    margin-bottom:50px;
    height:100px;
    background-color:#78909c;
    width:100px;
    align-items: center;
    justify-content: center;
    border-radius:50px;
`;
const VText = styled.Text`
    font-size: 60px;
    align-items: center;
    color:#ffffff;
`;

const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

// 구조 분해 할당, Destructuring Assignment
function ShopStepOne( { navigation } ) {
    
    return (
        <Container>
             <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/></TopStateView>
            <CenterText>
                
                <CompleteV><VText>✓</VText></CompleteV>
                <RegistText>접수 완료</RegistText>
                <BlueText>수선 접수가 정상적으로 완료</BlueText>
                <GrayText>되었습니다</GrayText>
                
            </CenterText>
            <Button onPress={ ()=> navigation.popToTop()}>
                완료
            </Button>
        </Container>
    )
}

export default ShopStepOne;