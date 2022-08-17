import React,{useState ,useEffect,useCallback} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';
import _, { reduce, sortedLastIndex } from 'lodash';
import axios from "axios";
import { Image,Text, View, ScrollView, Dimensions ,StyleSheet, Alert} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux'
import { CheckBox } from 'react-native-elements';
import SetReReceiptInfo from '../../Functions/SetReReceiptInfo';
import {useNetInfo}from "@react-native-community/netinfo";
import LookupCheckStep from '../../Functions/LookupCheckStep';


const  formatDate = (inputDate)=> {
    if(inputDate !== null&&inputDate!== undefined){
        return String(inputDate).slice(0, 10)
    }else{
        return null
    }
}

function LookupInfo4( { route,navigation } ) {
    const data =route.params.data;
    
    const netInfo = useNetInfo();
    

    const [repairShop,setRepairShop] = useState();          //수선처 
    const [repairShopDate,setRepairShopDate] = useState();  //수선처 접수일
    const [repairShopSendDate,setRepairShopSendDate] = useState();//수선처 발송일
    const [repairShopSendDescription,setRepairShopSendDescription] = useState();//수선처 설명

    const [mainCenterDate,setMainCenterDate] = useState();  //본사 접수일
    const [mainCenterSendDate,setMainCenterSendDate] = useState();//본사 발송일
    const [mainCenterSendDescription,setMainCenterSendDescription] = useState();//본사설명

    
    const [repairPrice,setRepairPrice] = useState();        //수선비
    const [isSelected , setSelection] = useState(false);    //유상수선유무

    const [checkMistake,setCheckMistake] = useState();      //과실 구분
    const [contentAnalysis,setContentAnalysis] = useState();//내용분석
    const [result,setResult] = useState();                  //판정결과

    const [selectDay,setSelectDay] =useState();
    const [repair2,setRepair2] = useState();
    const [repair3,setRepair3] = useState();
    const step = LookupCheckStep(data)

    const reReceipt =(data)=>{
        SetReReceiptInfo(data,images)
        console.log("step")
        console.log(LookupCheckStep(data))
        console.log("step")
        
        if(step ==0){
            navigation.navigate("ShopStepOne")
        }else if(step ==1){
            navigation.navigate("ShopStepTwo")
        }else if(step ==2){
            navigation.navigate("ShopStepThree")
        }else if(step ==3){
            navigation.navigate("ShopStepFour")
        }else if(step ==4){
            navigation.navigate("ShopStepFive")
        }
    }
    const deleteNotice=()=>{
        Alert.alert(
            "정말로 취소 하시겠습니까?",
            "확인을 누르시면 접수내역이 삭제 됩니다",
            [
              {
                text: "취소",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "확인", onPress: () =>{
                DeleteReceipt(data.receipt_id)
                navigation.popToTop();
                navigation.navigate('LookupPage',{code:null});
              } }
            ]
        );
        
    }
    
    let halfBtn
    if(step ==5){
        halfBtn=(
            <CenterView style={{borderTopWidth:1,borderTopStyle:'solid',borderTopColor:'rgba(200,200,200,0.2)'}}>
                <Button  onPress = {() => {
                    navigation.popToTop();
                    navigation.navigate('LookupPage',{code:null});
                }}><Text style ={{color : "#ffffff"}}>닫기</Text></Button>
            </CenterView>
        )
    }else{
        halfBtn=(
            <Half style={{borderTopWidth:1,borderTopStyle:'solid',borderTopColor:'rgba(200,200,200,0.2)'}}>
                <BtnRed onPress = {() => {
                    deleteNotice()
                }}><Text style ={{color : "#ffffff"}}>접수 취소</Text></BtnRed>
                <Btn onPress = {() => {
                    reReceipt(data)
                }}><Text style ={{color : "#ffffff"}}>접수 계속</Text></Btn>
              <Btn onPress = {() => {
                navigation.popToTop();
                navigation.navigate('LookupPage',{code:null});
              }}><Text style ={{color : "#ffffff"}}>닫기</Text></Btn>
            </Half>
        )
        
    }

    const numberWithCommas = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' 원';
    }

    useEffect(()=>{

        setRepairShop(data["repair1_store_name"])            //수선처 
        setRepairShopDate(formatDate(data["repair1_register_date"]))     //수선처 접수일
        setRepairShopSendDate(formatDate(data["repair1_complete_date"]))     //수선처 발송일
        setRepairShopSendDescription(data["repair1_message"])//수선처 설명

        setMainCenterDate(formatDate(data["register_date"]))             //본사 접수일
        setMainCenterSendDate(formatDate(data["complete_date"]))         //본사 발송일
        setMainCenterSendDescription(data["receipt_message"])//본사설명
        setSelectDay(formatDate(data["received_date"]))

        
        setCheckMistake(data["fault_name"])                    //과실 구분
        setContentAnalysis(data["analysis_name"])              //내용분석
        setResult(data["result_name"])                         //판정결과

        //수선비
        if(data["paid"] =="1"){                              //유상수선유무
            setSelection(true)
            setRepairPrice(numberWithCommas(Math.floor(data["fee"]*1.1)))
        }else{
            setSelection(false)
            setRepairPrice(0)
        }
        if(data.repair2_detail_id){
            let repairShopName = data.repair2_store_name;
            let registerDate = data.repair2_register_date;
            let completeDate = data.repair2_complete_date;
            let message = data.repair2_message;
            setRepair2(
                <View>
                    <Text style={{marginBottom:10, color:"#000000"}}>수선처 : {repairShopName}</Text>
                    <InfoView>
                        <TopText>수선처 접수일</TopText>
                        <InputText editable={false}>{formatDate(registerDate)}</InputText>
                            
                        <TopText>수선처 발송일</TopText>
                        <InputText editable={false}>{formatDate(completeDate)}</InputText>
                    <TopText>수선처 설명</TopText>
                    <InputText editable={false} multiline ={true}>{message}</InputText>

                    </InfoView>
                </View>
            )
        }
        if(data.repair3_detail_id){
            let repairShopName = data.repair3_store_name;
            let registerDate = data.repair3_register_date;
            let completeDate = data.repair3_complete_date;
            let message = data.repair3_message;
            setRepair3(
                <View>
                    <Text style={{marginBottom:10, color:"#000000"}}>수선처 : {repairShopName}</Text>
                    <InfoView>
                        <TopText>수선처 접수일</TopText>
                        <InputText editable={false}>{formatDate(registerDate)}</InputText>
                            
                        <TopText>수선처 발송일</TopText>
                        <InputText editable={false}>{formatDate(completeDate)}</InputText>
                    <TopText>수선처 설명</TopText>
                    <InputText editable={false} multiline ={true}>{message}</InputText>

                    </InfoView>
                </View>
            )
        }
    },[]);
    let inFormField;
    if(checkMistake||contentAnalysis||result){
        inFormField =(
            <InfoView>
                <TopText>과실 구분</TopText>
                <InputText editable={false}>{checkMistake}</InputText>

                <TopText>내용 분석</TopText>
                <InputText editable={false}>{contentAnalysis}</InputText>
                <TopText>판정 결과</TopText>
                <InputText editable={false}>{result}</InputText>

            </InfoView>
        )
    }
    let toHq
    console.log("mainCenterSendDate",mainCenterSendDate)
    console.log("mainCenterDate",mainCenterDate)
    if(mainCenterSendDate || mainCenterDate ){
        toHq =(
            <InfoView>
                {mainCenterDate &&
                    <>
                        <TopText>본사 접수일</TopText>
                        <InputText editable={false}>{mainCenterDate}</InputText>
                    </>
                }
                {mainCenterSendDate &&
                    <>
                        <TopText>본사 처리일</TopText>
                        <InputText editable={false}>{mainCenterSendDate}</InputText>
                    </>
                }
                <TopText>본사 설명</TopText>
                <InputText editable={false} multiline ={true}>{mainCenterSendDescription}</InputText>
            </InfoView>
        )
    }
    
    
    return(
        <Container style= {{backgroundColor:"#ffffff"}}>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
                        
                <Text style={{marginBottom:10, color:"#000000"}}>수선처 : {repairShop}</Text>
                <InfoView>
                    <TopText>수선처 접수일</TopText>
                    <InputText editable={false}>{formatDate(repairShopDate)}</InputText>
                        
                    <TopText>수선처 발송일</TopText>
                    <InputText editable={false}>{repairShopSendDate}</InputText>
                <TopText>수선처 설명</TopText>
                <InputText editable={false} multiline ={true}>{repairShopSendDescription}</InputText>

                </InfoView>
                {repair2}
                {repair3}
                

                

                {
                  inFormField
                }
                {
                    toHq
                }
                <TopText style={{marginBottom : 10, marginLeft:10}}>매장 인수일</TopText>
                <InputText editable={false} >{selectDay}</InputText>
                <Half style = {{marginBottom : 50,marginTop:8}}>
                    <Check>
                        <Text style={{color:"#000000"}}>유상수선 </Text>
                        <CheckBox
                                center
                                disabled
                                checked={isSelected}
                                checkedColor="red"
                                onPress={() =>{setSelection(!isSelected)}}
                            />
                    </Check>
                    <TotalMoney>
                        <TopText style={{color : "#ff0000" ,fontSize :18 ,fontWeight :"bold"}}>수선비 {repairPrice}</TopText>
                    </TotalMoney>
                </Half>
     
            </Contents>
            {halfBtn}
            

            <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default LookupInfo4;


const InfoView =styled.View`
    width: 100%;
    border:2px solid  rgb(0,80,130);
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
`;


const InputText = styled.TextInput`
    width: 100%;
    padding: 10px;
    font-size: 20px;
    min-height: 45px;
    background-color:#d6d6d6;
    border-radius:10px;
    color:#000000;
`;
const Half = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;  
`;
const CenterView = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : center;
    align-items : center;  
`;
const Check =styled.View`
    flex:1;
    flex-direction : row;
    align-items : center;
    justify-content : center;
    `;
const TotalMoney = styled.View`
    flex:1;
    flex-direction : row;

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
const TopText = styled.Text`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    color:#000000;
`;

const BtnRed = styled.TouchableOpacity`
    width : 30%;
    height: 50px;
    background: rgb(180,0,0);
    justify-content: center;
    align-items: center;
    border-radius:12px;    
`;