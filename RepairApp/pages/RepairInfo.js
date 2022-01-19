import React,{useState ,useEffect,useCallback} from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import Button from '../components/Button';
import Bottom from '../components/Bottom';
import axios from "axios";
import { Image,Text, View, ScrollView, Dimensions ,StyleSheet, Alert} from "react-native";
import styled from 'styled-components/native';
import ip from '../serverIp/Ip';
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
    border-radius:10px
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
 
export default function RepairInfo( { route,navigation } ) {
    const data =route.params.data;
    const [brand,setBrand] = useState('');
    const [storeName,setStoreName] = useState('');
    const [shippingDate,setShippingDate] =useState('');
    const [send,setSend] = useState('')
    
    const images = route.params.images;
    const keys= Object.keys(data)
    const getTargetData = useCallback(async (receiptId) => {
        const { data } = await axios.get(ip+`/api/RepairDetailInfo?code=${receiptId}`);
        console.log(data)
        if(data === null ||data === ''){
            alertFunction();
            navigation.goBack();
        }
        else{
            console.log()
            console.log()
            console.log()
            console.log()
            setBrand(data.data['brand_name'])
            setStoreName(data.data["store_name"])
            if(data.data["repair1_store_id"] === store.getState().shopId){
                console.log("repair1")
                setShippingDate(data.data["repair1_complete_date"])
            }else if(data.data["repair2_store_id"] === store.getState().shopId){
                console.log("repair2")
                setShippingDate(data.data["repair2_complete_date"])
            }else if(data.data["repair3_store_id"] === store.getState().shopId){
                console.log("repair3")
                setShippingDate(data.data["repair3_complete_date"])
            }
        }
        
    });
    useEffect(() => {
        getTargetData(data);
      

    }, []);

    const alertFunction = ()=>{
        Alert.alert(
            "서비스카드 오류",
            "올바른 서비스 카드가 아닙니다",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    }
    
    console.log(store.getState())
    
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>


                <InfoView>
                    <TopText>서비스 카드 번호</TopText>
                    <InputText>{data}</InputText>
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
                <InputText>{store.getState().shippingPlace}</InputText>
                <TopText/>
                
        
            </Contents> 
            <Button onPress={ ()=> navigation.navigate( 'DetectCode',{toGo: "ProductSend"}) }>
                행낭 코드 스캔
            </Button>

            <Bottom navigation={navigation} />
         
        </Container>
    )
}