import React from 'react';
import { View, Text, Alert } from 'react-native';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import Contents from '../../components/Contents';
import TopInfo from '../../components/TopInfo';
import Bottom from '../../components/Bottom';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid'
import {useNetInfo}from "@react-native-community/netinfo";

function ShopStepFour2( { navigation } ) {
    //console.log(store.getState().recDate);
    
    const netInfo = useNetInfo();
    
    return (
        <Container style= {{backgroundColor:"#ffffff"}}>
        <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
                <TopInfo></TopInfo>
            <CenterText>
                
                
                <RegistText>서비스 카드 스캔</RegistText>
            
                
            </CenterText>
            <Contents>
                
                <BlueText>서비스 카드 바코드</BlueText>
                <GrayText>를 스캔하세요</GrayText>
            </Contents>
            <Button onPress={ ()=> {
                if(netInfo.isConnected){
                    navigation.navigate( 'ScanScreen',{key:'ShopStepFour'} ) 
                }else{
                    Alert.alert("네트워크 연결 실패\n 연결 상태를 확인해주세요","",{ text: "확인"})
                }
                
                }}>
                코드 스캔
            </Button>
            
            <Bottom navigation={navigation}/>
        </Container>
    )
}
export default ShopStepFour2;


const RegistText= styled.Text`
    font-weight: bold;
    color:#000000;
    font-size: 30px;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:rgb(0,80,130);
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