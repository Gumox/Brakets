import React from 'react';
import { Image ,View, Text, Alert} from 'react-native';
import Contents from '../../components/Contents';
import styled from 'styled-components/native';
import SelectButton from '../../components/SelectButton';
import Container from '../../components/Container';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import CenterText from '../../components/CenterText';
import TopInfoLess from '../../components/TopInfoLess';
import Bottom from '../../components/Bottom';
import store from '../../store/store';
import ip from '../../serverIp/Ip';
import axios from 'axios';
import {useNetInfo}from "@react-native-community/netinfo";

function ShopStepTwo({navigation}) {
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    
    const netInfo = useNetInfo();
    
    const bodyData = {
        "brand": store.getState().brand_id,
       
    }
    
    const getProductCategory = async (receipt_id) => {
        if(receipt_id){
        const body =  JSON.stringify(bodyData)

        axios.post(ip+'/api/getProductCategory', body , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then((response) => {
            // 응답 처리
                const json =  response.data;
                setData(json.body);
                store.dispatch({type:'GET_APL_TYPE',setAplType: json.body});


                
                navigation.navigate("ShopStepThree");
            
            
            })
            .catch((error) => {
            // 예외 처리
            console.error(error);
            })
        }
        
    }

    const updateReceipt = async (receipt_id,typeN) => {
        let formdata = new FormData();

        if(receipt_id){
            formdata.append("step", 2);
            formdata.append("receipt", receipt_id);
            formdata.append("type", typeN);

            axios.post(ip+'/api/updateReceipt', formdata , {
                headers: {
                'Content-Type': 'multipart/form-data'
                }})
                .then((response) => {
                // 응답 처리
                    const json =  response.data;
                })
                .catch((error) => {
                // 예외 처리
                console.error(error);
                })
        }else{
            alert("전송오류")
            navigation.popToTop()
        }
    }
    
    
    return (
        <Container style= {{backgroundColor:"#ffffff"}}>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <TopInfoLess></TopInfoLess>
            <CenterText>
            
                <TopIntro>접수 유형 선택</TopIntro>
                <BlueText>요구 사항</BlueText>
                <GrayText>을 선택하세요</GrayText>
                  
            </CenterText>  
            <PView>
                <CenterView><SelectButton iconImg = {<ImgIcon style={{width:52,height:55}} source={require('../../Icons/repair.png')}/>} onPress={ ()=> {
                    if(netInfo.isConnected){
                        updateReceipt(store.getState().receipt_id,1)
                        store.dispatch({type:'REQUIREMENT',requirement:{name:"수선",id:1}});
                        getProductCategory(store.getState().receipt_id);
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    }

                }}>수선</SelectButton>
                <SelectButton iconImg = {<ImgIcon style={{width:51,height:55}} source={require('../../Icons/refund.png')}/>} onPress={ ()=> {
                    if(netInfo.isConnected){
                        updateReceipt(store.getState().receipt_id,3)
                        store.dispatch({type:'REQUIREMENT',requirement:{name:"환불",id:3}});
                        store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
                        getProductCategory(store.getState().receipt_id);
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    }
                }}>환불</SelectButton>
                </CenterView>
                <CenterView><SelectButton  iconImg = {<ImgIcon style={{width:48,height:55}}  source={require('../../Icons/exchange.png')}/>} onPress={ ()=> {
                    if(netInfo.isConnected){
                        updateReceipt(store.getState().receipt_id,2)
                        store.dispatch({type:'REQUIREMENT',requirement:{name:"교환",id:2}});
                        store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
                        getProductCategory(store.getState().receipt_id);
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    }
                }}>교환</SelectButton>
                <SelectButton iconImg = {<ImgIcon style={{width:55,height:55}} source={require('../../Icons/deliberating.png')}/>} onPress={ ()=> {
                    if(netInfo.isConnected){
                        updateReceipt(store.getState().receipt_id,4)
                        store.dispatch({type:'REQUIREMENT',requirement:{name:"심의",id:4}});
                        store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
                        getProductCategory(store.getState().receipt_id);
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    }
                }}>심의</SelectButton></CenterView>
            </PView>  
            <Bottom navigation={navigation}/>
        </Container>
    )
}

export default ShopStepTwo;

const Label = styled.Text`
    font-size: 15px;
    margin: 20px;
    color:#000000;
`;
const PView = styled.View`
    
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;

const CenterView =styled.View`
    align-items: center;
    
`;
const TopIntro =styled.Text`
    color:#000000;
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:rgb(0,80,130);
    margin-Top:40px;
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

const ImgIcon =styled.ImageBackground`
    width: 45px;
    height: 48px;
    padding : 5px;
`;