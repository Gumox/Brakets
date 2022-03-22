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
import LookupCheckStep from '../../Functions/LookupCheckStep';
import SetReReceiptInfo from '../../Functions/SetReReceiptInfo';


const  formatDate = (inputDate)=> {
    if(inputDate !== null&&inputDate!== undefined){
        return String(inputDate).slice(0, 10)
    }else{
        return null
    }
}

function LookupInfo4( { route,navigation } ) {
    const data =route.params.data;
    console.log("data.image")
    console.log(data.image)
    console.log("data.image")
    const keys= Object.keys(data)
    const [repairShop,setRepairShop] = useState();          //수선처 
    const [repairShopDate,setRepairShopDate] = useState();  //수선처 접수일
    const [repairShopSendDate,setRepairShopSendDate] = useState();//수선처 발송일
    const [repairShopSendDescription,setRepairShopSendDescription] = useState();//수선처 설명

    const [mainCenterDate,setMainCenterDate] = useState();  //본사 접수일
    const [mainCenterSendDate,setMainCenterSendDate] = useState();//본사 발송일
    const [mainCenterSendDescription,setMainCenterSendDescription] = useState();//본사설명

    
    const [repairPrice,setRepairPrice] = useState();        //수선비
    const [isSelected , setSelection] = useState(false);    //유상수선유무

    const [selectDay,setSelectDay] =useState();
    const [repair2,setRepair2] = useState();
    const [repair3,setRepair3] = useState();
    const step = LookupCheckStep(data)

    const reReceipt =(data)=>{
        SetReReceiptInfo(data)
        console.log("step")
        console.log(step)
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
    let halfBtn
    if(step ==5){
        halfBtn=(
              <Btn onPress = {() => {
                navigation.popToTop();
              }}><Text style ={{color : "#ffffff"}}>닫기</Text></Btn>
        )
    }else{
        halfBtn=(
            <Half>
                <Btn onPress = {() => {
                    reReceipt(data)
                }}><Text style ={{color : "#ffffff"}}>접수 계속</Text></Btn>
              <Btn onPress = {() => {
                navigation.popToTop();
              }}><Text style ={{color : "#ffffff"}}>닫기</Text></Btn>
            </Half>
        )
        
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

                                  //수선비
        if(data["paid"] =="1"){                              //유상수선유무
            setSelection(true)
            setRepairPrice(data["fee"]*1.1)
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
                        <InputText>{formatDate(registerDate)}</InputText>
                            
                        <TopText>수선처 발송일</TopText>
                        <InputText>{formatDate(completeDate)}</InputText>
                    <TopText>수선처 설명</TopText>
                    <InputText>{message}</InputText>

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
                        <InputText>{formatDate(registerDate)}</InputText>
                            
                        <TopText>수선처 발송일</TopText>
                        <InputText>{formatDate(completeDate)}</InputText>
                    <TopText>수선처 설명</TopText>
                    <InputText>{message}</InputText>

                    </InfoView>
                </View>
            )
        }
    },[]);
    
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
                

            <Text style={{marginBottom:10, color:"#000000"}}>수선처 : {repairShop}</Text>
            <InfoView>
                <TopText>수선처 접수일</TopText>
                <InputText>{formatDate(repairShopSendDate)}</InputText>
                    
                <TopText>수선처 발송일</TopText>
                <InputText>{repairShopSendDate}</InputText>
            <TopText>수선처 설명</TopText>
            <InputText>{repairShopSendDescription}</InputText>

            </InfoView>
            {repair2}
            {repair3}
              

            <InfoView>
            <TopText>본사 접수일</TopText>
            <InputText>{mainCenterDate}</InputText>
            <TopText>본사 발송일</TopText>
            <InputText>{mainCenterSendDate}</InputText>
            <TopText>본사 설명</TopText>
            <InputText>{mainCenterSendDescription}</InputText>
            </InfoView>

            <TopText style={{marginBottom : 10, marginLeft:10}}>매장 인수일</TopText>
            <InputText >{selectDay}</InputText>
            <Half style = {{marginBottom : 50}}>
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
                    <TopText style={{color : "#ff0000" ,fontSize :18 ,fontWeight :"bold"}}>수선비  {repairPrice}</TopText>
                </TotalMoney>
            </Half>
     
            </Contents>
            {halfBtn}
            

            <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default LookupInfo4;

const TouchableView = styled.TouchableOpacity`
    width: 100%;;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid #78909c;
`;
const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
    margin:5px;
`;
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%
    justify-content: center;
`;
const InfoView =styled.View`
    width: 100%;
    border:2px solid  #78909c;
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const InputText = styled.Text`
    width: 100%;
    padding: 8px;
    font-size: 20px;
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

const HalfLine = styled.View`
    width : 45%;
    height : 100%;
`;
const Check =styled.View`
    flex:1;
    flex-direction : row;
    width : 40%;
    padding : 8px;
    align-items : center;
    justify-content : center;
    `;
const TotalMoney = styled.View`
    flex:1;
    flex-direction : row;
    width : 50%;
    margin-left: 10%;

    `;

const Btn = styled.TouchableOpacity`
    width : 40%;
    height: 50px;
    background: #78909c;
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
const styles = StyleSheet.create({
    Lavel:{
        flex:1,
        fontSize:(Dimensions.get('window').width)*0.04,
        margin:10,
    },
      
})
