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
import RNPickerSelect from 'react-native-picker-select';
import store from '../store/store';


const PickerView = styled.View`
    width: 100%;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50px;
`;
const InfoView =styled.View`
    width: 100%;
    border:2px solid  #828282;
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
`;

const InputText = styled.Text`
    color:#000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
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
    const code =route.params.data;
    const [datas,setDatas] =useState([]);
    const [brand,setBrand] = useState('');
    const [storeName,setStoreName] = useState('');
    const [shippingDate,setShippingDate] =useState('');
    const [send,setSend] = useState('')
    const [storeId,setStoreId ] = useState(0);
    
    const images = route.params.images;
    const formatDate = (inputDate) => {
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
    const getTargetData = useCallback(async (receiptId) => {
        const { data } = await axios.get(ip+`/api/RepairDetailInfo?code=${receiptId}`);
        console.log(data)
        if(data === null ||data === ''){
            alertFunction();
            navigation.goBack();
        }
        else{
            console.log(data.data["receipt_id"])
            setBrand(data.data['brand_name'])
            setStoreName(data.data["store_name"])
            setStoreId(data.data['store_id'])

            datas.push({receipt_id:data.data["receipt_id"]})
            datas.push({code:code})
            datas.push({brand:data.data['brand_name']})
            datas.push({storeName:data.data["store_name"]})
            datas.push({storeId:data.data['store_id']})
            if(data.data["repair1_store_id"] === store.getState().shopId){
                console.log("repair1")
                setShippingDate( formatDate(new Date(data.data["repair1_complete_date"])))
                datas.push({shippingDate:data.data["repair1_complete_date"]})
            }else if(data.data["repair2_store_id"] === store.getState().shopId){
                console.log("repair2")
                setShippingDate(  formatDate(new Date(data.data["repair2_complete_date"])))
                datas.push({shippingDate:data.data["repair2_complete_date"]})
            }else if(data.data["repair3_store_id"] === store.getState().shopId){
                console.log("repair3")
                setShippingDate( formatDate(new Date(data.data["repair3_complete_date"])))
                datas.push({shippingDate:data.data["repair3_complete_date"]})
            }

    
        }
        
    });
    useEffect(() => {
        getTargetData(code);
    }, []);
    const setShipping=(value)=>{
        let items=[
            { label: storeName, value: storeId },
            { label: '본사', value: 1 }
        ]
        items.forEach(obj => {
            if(obj.value === value){
                store.dispatch({type:"SHIPPING_PLACE", shippingPlace:{name:obj.label,id:obj.value}})
            }
        });
    }
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
                    <InputText>{code}</InputText>
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
                <PickerView>
                        <RNPickerSelect
                            placeholder={{ label: '[필수] 옵션을 선택하세요', value: null }}
                            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black',placeholder:{color: '#AD8E5F'}} }
                            onValueChange={(value) => {
                                setShipping(value)
                               
                            }}
                            items={[
                                { label: storeName, value: storeId },
                                { label: '본사', value: 1 }
                            ]}
                        />
                    </PickerView>
                <TopText/>
                
        
            </Contents> 
            <Button onPress={ ()=> navigation.navigate( 'DetectCode',{toGo: "ProductSend",datas:datas}) }>
                행낭 코드 스캔
            </Button>

            <Bottom navigation={navigation} />
         
        </Container>
    )
}