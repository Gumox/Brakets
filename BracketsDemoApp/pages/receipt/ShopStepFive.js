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
import store from '../../store/store';
import {useNetInfo}from "@react-native-community/netinfo";

function ShopStepFive( { navigation } ) {
    //console.log(store.getState().recDate);
    
    const netInfo = useNetInfo();
    
    return (
        <Container style= {{backgroundColor:"#ffffff"}}>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/></TopStateView>
                <TopInfo></TopInfo>
            <CenterText>
                
                
                <RegistText>행낭 접수</RegistText>
            
                
            </CenterText>
            <Contents>
                
                <BlueText>행낭 바코드</BlueText>
                <GrayText>를 스캔하세요</GrayText>
            </Contents>
            <CenterView>
                <Half>
                    <Btn onPress={ ()=>{

                        if(netInfo.isConnected){
                            navigation.navigate( 'ShopStepComplete' ) 

                        }else{
                            Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                        }

                    }}>
                        <Text style ={{color : "#ffffff"}}>행낭 없음</Text>
                    </Btn>
                    <Btn onPress={ ()=>{
                        if(netInfo.isConnected){
                            navigation.navigate( 'ScanScreen',{key:'ShopStepComplete'} ) 
                        }else{
                            Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                        }

                    }}>
                        <Text style ={{color : "#ffffff"}}>코드 스캔</Text>
                    </Btn>
                </Half>
            </CenterView>
            
            
            <Bottom navigation={navigation}/>
        </Container>
    )
}
export default ShopStepFive;


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

const Half = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;  
`;
const Btn = styled.TouchableOpacity`
    width : 40%;
    height: 50px;
    background: rgb(0,80,130);
    justify-content: center;
    align-items: center;
    margin:15px;
    border-radius:12px;    
`;

const CenterView =styled.View`
    align-items: center;
`;