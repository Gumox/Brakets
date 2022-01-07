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
    color:#000000
`;
const InputText = styled.Text`
    color:#000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
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
const TopText = styled.Text`
    color:#000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
`;
const styles = StyleSheet.create({
    Lavel:{
        flex:1,
        fontSize:(Dimensions.get('window').width)*0.04,
        margin:10,
        color:"#000000"
    },
      
})
const  formatDate = (inputDate)=> {
    const sp =  inputDate;
    const date = sp.split("T")
    
    return date[0]
}
function LookupInfo( { route,navigation } ) {
    const data =route.params.data;
    const images = route.params.images;
    const keys= Object.keys(data)
    const [number,setNumber] =useState(store.getState().number);
    const [text, onChangeText] = useState();

    const [cardCode,setCardCode] = useState(route.params.code);              //서비스카드번호
    const [checkReceipt,setCheckReceipt] = useState();      //접수구분
    const [customerName,setCustomerName] = useState();      //고객이름
    const [customerPhone,setCustomerPhone] = useState();    //고객연락처
    const [receiptDate,setReceiptDate] = useState();        //매장접수일
    const [appointmentDate,setAppointmentDate] = useState();//고객약속일
    
    
    
    console.log(images)
    useEffect(()=>{
        setCardCode(data["receipt_code"])                    //서비스카드번호
        if( data["receipt_category"] == 1){                  //접수구분
            setCheckReceipt("고객") 
        }else if( data["receipt_category"] == 2){
            setCheckReceipt("선처리") 
        }else if( data["receipt_category"] == 3){
            setCheckReceipt("매장") 
        }           
        setCustomerName(data["customer_name"])               //고객이름
        setCustomerPhone(data["customer_phone"])             //고객연락처
        setReceiptDate(formatDate(data["receipt_date"]))     //매장접수일
        
        setAppointmentDate(formatDate(data["due_date"]))     //고객약속일


    },[]);
    
        
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
                <InfoView>
                  <TopText>서비스 카드 번호</TopText>
                      <InputText>{cardCode}
                            </InputText>
                  <TopText>접수 구분</TopText>
                        <InputText>{checkReceipt}</InputText>
                  <TopText>고객명</TopText>
                        <InputText>{customerName}</InputText>
                  <TopText>고객 연락처</TopText>
                        <InputText>{customerPhone}</InputText>
                </InfoView>

                <InfoView>
                  <TopText>매장 접수일</TopText>
                        <InputText>{receiptDate}</InputText>
                  <TopText>고객 약속일</TopText>
                        <InputText>{appointmentDate}</InputText>
                </InfoView>

               
     
            </Contents>
            <Button onPress={ ()=> navigation.navigate( 'LookupInfo2',{data:data , images:images}) }>
                다음
            </Button>

            <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default LookupInfo;