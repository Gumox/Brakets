import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import styled from 'styled-components/native';
import CenterText from '../components/CenterText';
import _, { concat, constant } from 'lodash';
import Contents from '../components/Contents';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
import Picker from 'react-native-picker-select';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;
const DropBackground= styled.View`
    width: 220px;
    background-color:#d6d6d6;
    border-radius:10px;
    font-color:#ffffff
`;
// 구조 분해 할당, Destructuring Assignment

function ShopStepFour( { navigation } ) {
    const List=[
        { label: '맥가이버', value: '맥가이버' },
        { label: '로보캅', value: '로보캅' },
        { label: '폴리', value: '폴리' }];
    
    const itemList=['맥가이버2','로보캅2','폴리2'];
    const List2 =[];
    if (itemList !==null){
        itemList.map(x => List2.push({label:x,value:x}));
        
    }
    const List0 = [{label:List2[0].label,value:List2[0].value}]
    return (
        
        <Container>
            
            <CenterText>
                <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
                <RegistText>서비스 카드 확인</RegistText>
                <GrayText>및</GrayText>
                <RegistText>서비스 카드 스캔</RegistText>
                
            </CenterText>
            <PView><GrayText>아래의 수선처로</GrayText></PView>
                <PView>
                    <BlueText>제품</BlueText>
                    <GrayText>과 </GrayText>
                    <BlueText>서비스 카드</BlueText>
                    <GrayText>를 함께 보내주세요</GrayText>
                </PView>
            <Contents>
                <Label>수선처</Label>
                
                <DropBackground><Picker
                    onValueChange={(value) => console.log(value)}
                    items={List2}
                /></DropBackground>
            </Contents>

            <BlueText>서비스 카드의 바코드</BlueText>
            <GrayText>를 스캔하세요</GrayText>

            <Button onPress={ ()=> navigation.navigate( 'ScanScreen',{key:'ShopStepFour2'} ) }>
                코드 스캔
            </Button>
        </Container>
    )
}

export default ShopStepFour;