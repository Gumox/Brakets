import React from 'react';
import { View, Text } from 'react-native';
import Container from '../components/Container';
import Contents from '../components/Contents';
import Bottom from '../components/Bottom';
import Button from '../components/Button';
import CenterText from '../components/CenterText';
import styled from 'styled-components';

const RegistText= styled.Text`
    font-weight: bold;
    color:#000000;
    font-size: 30px;
`;
const YellowText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#AD8E5F;
`;
const GrayText = styled.Text`
    font-size: 20px;
    color:#858585;
`;
const TopStateView = styled.View`
    
    flex-direction: row;
    padding:24px;
    color:#000000;
    justify-content: center;
`;
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    margin-Top:10px;
    margin-Bottom:10px;
    justify-content: center;
`;
// 구조 분해 할당, Destructuring Assignment
export default function MailbagScan( { navigation } ) {
    return (
        <Container>
            <CenterText>
                
                
                <RegistText>서비스 카드</RegistText>
            
                
            </CenterText>
            <View style ={{flex:1,alignItems:"center"}}>
                <GrayText>행낭 스티커 부착한 제품의</GrayText>
                <PrView>
                    <YellowText>서비스카드 바코드</YellowText>
                    <GrayText>를</GrayText>
                </PrView>
                <GrayText>를 스캔하세요</GrayText>
            </View>
            <Button onPress={ ()=> navigation.navigate( 'DetectCode',{toGo:'RepairInfo'} ) }>
                코드 스캔
            </Button>
            
            <Bottom navigation={navigation}/>
        </Container>
    )
}