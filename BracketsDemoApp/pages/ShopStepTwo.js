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
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

function ShopStepTwo({navigation, route}) {
   
    const codeType = route.params.codeType
    const codeInput = route.params.codeType
    const serialInput = route.params.serialInput

    const productName = route.params.productName
    const season = route.params.season
    const colorValue = route.params.colorValue
    const size = route.params.size
    const measure = route.params.measure
    const imageFile = route.params.imageFile


    return (
        console.log(
            {
                codeType,
                codeInput,
                serialInput,
                productName,
                season,
                colorValue,
                size,
                measure,
                imageFile
            }
        ),
        <Container>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <CenterText>
                <TopIntro>제품 정보</TopIntro>
                <BlueText>수선 요구 사항</BlueText>
                <GrayText>을 선택하세요</GrayText>
                  
            </CenterText>  
            <PView>
                <CenterView><SelectButton onPress={ ()=> navigation.navigate( 'ShopStepThree' )}>수선</SelectButton><SelectButton>교환</SelectButton></CenterView>
                <CenterView><SelectButton>환불</SelectButton><SelectButton>심의</SelectButton></CenterView>
            </PView>  
            <Label>접수 유형 알아보기</Label>
        </Container>
    )
}

export default ShopStepTwo;