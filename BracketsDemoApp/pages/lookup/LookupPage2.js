import React, { useState ,useCallback} from 'react';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import { ScrollView ,TouchableHighlight,View,Dimensions} from 'react-native';
import ip from '../../serverIp/Ip';
import Bottom from '../../components/Bottom';
import Contents from '../../components/Contents';
import ContainView from '../../components/ContainView';
import Container from '../../components/Container';
import axios from 'axios';


const Alternative = styled.Text`
    font-size: 15px;
    align-items: center;
`;

const Label = styled.Text`
    flex:1
    font-size: 20px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
    font-weight :bold;
    minWidth:25px;
    maxHeight:30px;
    color :#000000
`;

const PhoneLabel = styled.Text`
    font-size: 20px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
    font-weight :bold;
    width:150px
    color :#000000
`;
const DivLabel = styled.Text`
    font-size: 20px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
    font-weight :bold;
    color :#000000
`;

const InputView = styled.View`
align-items: center;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
    color :#000000
`;

const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
  color :#000000;
`;
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%
`;
const ScrollItme = styled.View`
    margin-left:20px;
    margin-right:20px;
    width:150px
`;
function LookupPage2({ route,navigation }) {

    const scrollMinSize =(Dimensions.get('window').height)*0.45
    const data =route.params.data 
    var inData=[];
    const  formatDate = (inputDate)=> {
        var month = '' + (inputDate.getMonth() + 1),
            day = '' + inputDate.getDate(),
            year = inputDate.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        const value = [year, month, day].join('-');
        return value
    }
    
    const getImages = useCallback(async (code,obj) => {

        console.log("press")
        const { data } = await axios.get(ip+"/api/lookup/images", {
          params: { 
            code: code
          },
        })
        navigation.navigate('LookupInfo',{data:obj,images: data.data})
    }, []);
    console.log(data)
    
    for (let index = 0; index < data.length; index++) {
        const obj = data[index];
        //console.log(obj.step)
        const keys= Object.keys(obj);
        const indexKey = index;
        var prdDiv = ""
        var checkReceipt =""
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
        var raw = (
            <TouchableHighlight key = {indexKey} underlayColor={"#CCC"} 
                onPress={() => {
                    getImages(obj["receipt_code"],obj)
                }}>
                <PrView>
                    <Label>{indexKey+1}</Label>
                    <ScrollItme><Label>{formatDate(new Date(obj["receipt_date"]))}</Label></ScrollItme>
                    <DivLabel>{checkReceipt}</DivLabel>
                    <ScrollItme><Label>{obj["customer_name"]}</Label></ScrollItme>
                    <ScrollItme><PhoneLabel>{obj["customer_phone"]}</PhoneLabel></ScrollItme>
                    <ScrollItme><Label>{obj["receipt_code"]}</Label></ScrollItme>
                    <DivLabel>{prdDiv}</DivLabel>
                    <DivLabel/>
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
            <ScrollView style={{borderWidth:2,borderColor:"#78909c",borderRadius:5,width:"85%",height: scrollMinSize, marginBottom:"5%"}}>
            
                <ScrollView  horizontal ={true} style={{minHeight: scrollMinSize*1.3}}>
                    <View style={{flexDirection:"column"}}>
                    <PrView>
                        <Label/>
                        <ScrollItme><Label>접수일</Label></ScrollItme>
                        <DivLabel>구분</DivLabel>
                        <ScrollItme><Label>고객명</Label></ScrollItme>
                        <ScrollItme><PhoneLabel>고객 연락처</PhoneLabel></ScrollItme>
                        <ScrollItme><Label>서비스 카드</Label></ScrollItme>
                        <DivLabel>상태</DivLabel>
                    </PrView>
                    {inData}
                    <Label/>
                    </View>
                </ScrollView>
                
            </ScrollView>
            <Bottom navigation={navigation} />
        </Container>
    )
}
export default LookupPage2;