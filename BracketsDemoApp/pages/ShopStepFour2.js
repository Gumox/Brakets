import React from 'react';
import Contents from '../components/Contents';
import ButtonBlack from '../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import { Image, View,Text} from 'react-native';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';


const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
    margin-bottom:30px
    padding-bottom:30px;
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
`;
const ContainImg =styled.View`
    margin-top: 40px;
    background-color:#d6d6d6;
    border-radius:12px;
    justify-content: center;
    align-items: center;
`;
const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;



function ShopStepFour2({navigation}) {
   
    
    return (
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
            <Contents>
                
                <CenterView><TopIntro>수선증 정보</TopIntro></CenterView>
                <Label> 수선증 바코드</Label>
                <Input />
                <Label> 매장 접수일</Label>
                <Input  multiline={ true }/>
                <Label> 고객 약속일</Label>
                <Input  multiline={ true }/>
                <Label> 매장 발송일</Label>
                <Input  multiline={ true }/>
            
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=> navigation.navigate( 'ShopStepFive' ) }>
                    다음: 5단계
                </ButtonBlack>
            </CenterView>
        </ContainView>
    )
}

export default ShopStepFour2;