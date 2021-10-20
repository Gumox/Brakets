import React from 'react';
import Contents from '../components/Contents';
import styled from 'styled-components/native';
import SelectButton from '../components/SelectButton';
import Container from '../components/Container';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
import CenterText from '../components/CenterText';

const Label = styled.Text`
    font-size: 15px;
    margin: 20px;
`;
const PView = styled.View`
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;

const CenterView =styled.View`
    align-items: center;
    
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#78909c;
    margin-Top:50px
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

function ShopStepTwo({navigation}) {
   
    
    return (
        <Container>
            <CenterText>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
                <TopIntro>제품 정보</TopIntro>
                <BlueText>수선 요구 사항</BlueText>
                <GrayText>을 선택하세요</GrayText>
                  
            </CenterText>  
            <PView>
                <CenterView><SelectButton onPress={ ()=> navigation.navigate( 'ShopRepairStep' )}>수선</SelectButton><SelectButton>교환</SelectButton></CenterView>
                <CenterView><SelectButton>환불</SelectButton><SelectButton>심의</SelectButton></CenterView>
            </PView>  
            <Label>접수 유형 알아보기</Label>
        </Container>
    )
}

export default ShopStepTwo;