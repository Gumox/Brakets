import React from 'react';
import { View, Text } from 'react-native';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import Contents from '../../components/Contents';
import TopInfo from '../../components/TopInfo';
import Bottom from '../../components/Bottom';
import StateBarSolid from '../../components/StateBarSolid';
import store from '../../store/store';


const RegistText= styled.Text`
    font-weight: bold;
    font-size: 30px;
    color : #000000;
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
export default function CheckBarcode( { navigation } ) {
    //console.log(store.getState().recDate);
    
    return (
        <Container>
            <CenterText>
                
                
                <RegistText>인수 확인</RegistText>
            
                
            </CenterText>
            <Contents>
                
                <BlueText>서비스 카드 바코드</BlueText>
                <GrayText>를 스캔하세요</GrayText>
            </Contents>
            <Button onPress={ ()=> navigation.navigate( 'ScanScreen',{key:'TakeOverPage'} ) }>
                코드 스캔
            </Button>
            
            <Bottom navigation={navigation}/>
        </Container>
    )
}