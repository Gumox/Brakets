import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import { ScrollView ,TouchableHighlight,View,Dimensions,Text} from 'react-native';
import ip from '../../serverIp/Ip';
import Bottom from '../../components/Bottom';
import Container from '../../components/Container';
import axios from 'axios';
import {useNetInfo}from "@react-native-community/netinfo";


const Alternative = styled.Text`
    font-size: 15px;
    align-items: center;
`;

const Label = styled.Text`
    flex:1
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:5px;
    font-weight :bold;
    min-width:20px;
    color :#000000;
`;

const PhoneLabel = styled.Text`
    font-size: 15px;
    padding-top:12px;
    padding-bottom:18px;
    font-weight :bold;
    width:120px
    margin-left:10px;
    color :#000000;
`;
const DivLabel = styled.Text`
    font-size: 15px;
    font-weight :bold;
    color :#000000;
    paddingLeft:5px;
    padding-top:12px;
    padding-bottom:18px;
    justify-content: center;
    align-items: center;
`;

const InputView = styled.View`
    flex-direction: column;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
    color :#000000;
`;

const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
  color :#000000;
`;
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%;
    height:50px;
`;
const ScrollItme = styled.View`

width:120px;
justify-content: center;
align-items: center;
`;
function LookupPage2({ route,navigation }) {

    const scrollMinSize =(Dimensions.get('window').height)*0.45
    const data =route.params.data 
    let inData=[];
    const  formatDate = (_inputDate)=> {
        console.log(_inputDate)
        const inputDate = new Date(_inputDate)
        if(_inputDate){
            let month = '' + (inputDate.getMonth() + 1),
                day = '' + inputDate.getDate(),
                year = inputDate.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            const value = [year, month, day].join('-');
            return value
        }
    }
    
    const getImages = useCallback(async (code,obj) => {

        console.log("press")
        const { data } = await axios.get(ip+"/api/lookup/images", {
          params: { 
            code: code
          },
        })
        navigation.navigate('LookupInfo',{data:obj,images: data.data,needImages:data.needImages})
    }, []);
    //console.log(data)

    const netInfo = useNetInfo();
    
    
    for (let index = 0; index < data.length; index++) {
        const obj = data[index];
        //console.log(obj.step)
        const keys= Object.keys(obj);
        const indexKey = index;
        let prdDiv = ""
        let checkReceipt =""
        if( obj["receipt_category"] == 1){                  //접수구분
            checkReceipt ="고객" ;
        }else if( obj["receipt_category"] == 2){
            checkReceipt ="선처리"; 
        }else if( obj["receipt_category"] == 3){
            checkReceipt = "매장"; 
        }      
        if(obj["step"] == 0){
            prdDiv="접수중";
        }else if(obj["step"] == 1){
            prdDiv="접수 완료";
        }else if(obj["step"] == 2){
            prdDiv="인수 완료";
        }
        let raw = (
            <TouchableHighlight key = {indexKey} underlayColor={"#CCC"} 
                onPress={() => {
                    if(netInfo.isConnected){
                        getImages(obj["receipt_code"],obj)
                    }else{
                        alert("네트워크 연결 실패\n 연결 상태를 확인해주세요")
                    }
                }}>
                <PrView >
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid",width:50}}><Label>{indexKey+1}</Label></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid"}}><Label>{formatDate(obj["receipt_date"])}</Label></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid",width:50}}><DivLabel style={{width:50}}>{checkReceipt}</DivLabel></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid",width:80}}><Label>{obj["customer_name"]}</Label></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid"}}><PhoneLabel>{obj["customer_phone"]}</PhoneLabel></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid"}}><Label>{obj["receipt_code"]}</Label></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid"}}><DivLabel>{prdDiv}</DivLabel></ScrollItme>
                </PrView>
            </TouchableHighlight>
        )
        inData[index] = raw;
        
    };
    
    return (
        
        <Container>
            <CenterText>
                <Title>조회 결과</Title>
            </CenterText>
            <View style={{height:3,margin:5,borderRadius:5,width:"97%",backgroundColor:"rgba(125,125,125,0.15)"}}/>
            <ScrollView horizontal={true} style={{marginBottom:3,backgroundColor:"rgb(225,225,225)",width:"97%",height: scrollMinSize}}>
                <InputView>
                <PrView > 
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid",width:50}}><Label/></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid"}}><Label>접수일</Label></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid",width:50}}><DivLabel style={{width:40}}>구분</DivLabel></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid",width:80}}><Label>고객명</Label></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid"}}><PhoneLabel>고객 연락처</PhoneLabel></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid"}}><Label>서비스 카드</Label></ScrollItme>
                    <ScrollItme style={{borderBottomColor:"#f2f2f2",borderBottomWidth:2,borderStyle:"solid"}}><DivLabel>상태</DivLabel></ScrollItme>
                </PrView>
                    <ScrollView style={{backgroundColor:"rgba(200,200,200,0.1)",width:"100%",height: scrollMinSize}}>
                    {inData}
                    </ScrollView>
                </InputView>
            </ScrollView>
            <Bottom navigation={navigation} />
        </Container>
    )
}
export default LookupPage2;
/*
                    
                    {inData}
                    
                </ScrollView> */