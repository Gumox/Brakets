import React,{useState ,useEffect,useCallback} from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import Button from '../components/Button';
import Bottom from '../components/Bottom';
import axios from "axios";
import { Image,Text, View, ScrollView, Dimensions ,StyleSheet, Alert} from "react-native";
import styled from 'styled-components/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ip from '../serverIp/Ip';
import store from '../store/store';

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
    border:2px solid  #828282;
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
    color:#000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
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
const TotalMoney = styled.View`
    flex:1;
    flex-direction : row;
    width : 50%;
    margin-left: 10%;

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
    },
      
})
 
export default function ProductSend( { route,navigation } ) {
    const code = route.params.data;
    const datas = route.params.datas;
    const images = route.params.images;
    const [serviceBarcode,setServiceBarcode] =useState('')
    const [brand,setBrand] =useState('')
    const [storeName,setStoreName] =useState('')
    const [date,setDate] =useState('')
    const [receiverName,setReceiverName] =useState('')
    const [receiver,setReceiver] = useState(0)
    const [shippingDate,setShippingDate] = useState()

    const formatDate = (inputDate) => {
        var month = '' + (inputDate.getMonth() + 1),
        day = '' + inputDate.getDate(),
        year = inputDate.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        const value = [year, month, day].join('-');
        if(value !== 'NaN-NaN-NaN'){return value}
        else{return null}
    }
    const postupdateMailBag = async (to,from,code,receipt_id) => {
        const bodyData ={
                    
            to:to,
            from:from,
            code:code,
            receipt_id:receipt_id

        }
        console.log(bodyData)
        try {
            const response = await fetch(ip+'/api/RepairShop/updateMailBag',{method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bodyData)
            });
            const json = await response.json();
            navigation.popToTop();
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        setServiceBarcode(datas.code)
        setBrand(datas.brand)
        setStoreName(datas.storeName)
        setDate(datas.shippingDate)
        setReceiverName(datas.receiver_name)
        setReceiver(datas.receiver)
        setShippingDate(formatDate(new Date(datas.shippingDate)))
    },[])
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>

                <InfoView>
                    <TopText>서비스 카드 번호</TopText>
                    <InputText>{serviceBarcode}</InputText>
                    <TopText>브랜드</TopText>
                    <InputText>{brand}</InputText>
                    <TopText>매장명</TopText>
                    <InputText>{storeName}</InputText>     
                </InfoView>
                
                <TopText>수선처 발송일</TopText>
                <InputText>{shippingDate}</InputText>
                <TopText>발송방법</TopText>
                <InputText>행낭</InputText>
                <TopText>받는곳</TopText>
                <InputText>{receiverName}</InputText>
                <TopText>행낭 바코드 번호</TopText>
                <InputText>{code}</InputText>
                <TopText/>
                
        
            </Contents> 
            <Button onPress={ ()=> {postupdateMailBag(store.getState().shopId,receiver,code,datas.receipt_id)} }>
                완료
            </Button>

            <Bottom navigation={navigation} />
         
        </Container>
    )
}