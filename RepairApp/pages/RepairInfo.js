import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import Button from '../components/Button';
import Bottom from '../components/Bottom';
import axios from "axios";
import { Dimensions, StyleSheet, Alert } from "react-native";
import styled from 'styled-components/native';
import ip from '../serverIp/Ip';
import { formatDate } from '../functions/formatDate';
import { postSendRepairInfo  } from '../functions/useInRepairDetail';
import RNPickerSelect from 'react-native-picker-select';
import store from '../store/store';


const PickerView = styled.View`
    justify-content: center;
    padding-left: 5px;
    width: 100%;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50px;
`;
const InfoView = styled.View`
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

const TopText = styled.Text`
    color:#000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
`;

const styles = StyleSheet.create({
    Lavel: {
        flex: 1,
        fontSize: (Dimensions.get('window').width) * 0.04,
        margin: 10,
    },

})

export default function RepairInfo({ route, navigation }) {
    const code = route.params.data;
    const [datas, setDatas] = useState([]);
    const [brand, setBrand] = useState('');
    const [storeName, setStoreName] = useState('');
    const [shippingDate, setShippingDate] = useState('');
    const [send, setSend] = useState('')
    const [repairDetailId,setRepairDetailId] = useState('')
    const [storeId, setStoreId] = useState(0);
    const [receiverName, setReceiverName] = useState('');

    const [isReceiverNull,setIsReceiverNull] =useState(false)
    
    const [receiverSet,setReceiverSet] = useState(null);
    
    const [receiver,setReceiver] = useState();

    const images = route.params.images;
    
    const alertFunction = () => {
        Alert.alert(
            "서비스카드 오류",
            "올바른 서비스 카드가 아닙니다",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    const getTargetData = async (code) => {
        const { data } = await axios.get(ip + `/api/RepairDetailInfo?code=${code}&shop_id=${store.getState().shopId}`);
        console.log(data)
        if (data === null || data === '') {
            alertFunction();
            navigation.goBack();
        }
        else {
            let date;
            setBrand(data.data['brand_name'])
            setStoreName(data.data["store_name"])
            setStoreId(data.data['store_id'])
            setReceiverName(data.data["receiver_name"])
            
            if (data.data["repair1_store_id"] === store.getState().shopId) {
                setShippingDate(formatDate(new Date(data.data["repair1_complete_date"])))
                setRepairDetailId(data.data["repair1_detail_id"])
                date = data.data["repair1_complete_date"]
            } else if (data.data["repair2_store_id"] === store.getState().shopId) {
                setShippingDate(formatDate(new Date(data.data["repair2_complete_date"])))
                setRepairDetailId(data.data["repair2_detail_id"])
                date = data.data["repair2_complete_date"] 
            } else if (data.data["repair3_store_id"] === store.getState().shopId) {
                setShippingDate(formatDate(new Date(data.data["repair3_complete_date"])))
                setRepairDetailId(data.data["repair3_detail_id"])
                date = data.data["repair3_complete_date"] 
            }
            if(Object.keys(data.returnd).length){
                setIsReceiverNull(true)
                let items=[
                    { label: data.data["store_name"], value: data.data['store_id'] },
                    { label: '본사', value: 1 }
                    ]
                setReceiver((
                    <RNPickerSelect
                    placeholder={{ label: '[필수] 옵션을 선택하세요', value: null }}
                    style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black',placeholder:{color: '#AD8E5F'}} }
                    onValueChange={(value) => {
                        setReceiverSet(value)
                        items.map((el)=>{
                            if(el.value === value){
                                console.log(el.label,date)
                                setDatas(
                                    
                                        { receipt_id: data.data["receipt_id"] ,
                                         code: code ,
                                         brand: data.data['brand_name'] ,
                                         storeName: data.data["store_name"] ,
                                         storeId: data.data['store_id'] ,
                                         shippingDate: date ,
                                         receiver: el.value ,
                                         receiver_name: el.label }
                                    
                                )
                            }
                        })
                        

                    }}
                    items={items}
                />
                ))
            }else{
                setDatas(
                    
                        { receipt_id: data.data["receipt_id"] ,
                         code: code ,
                         brand: data.data['brand_name'] ,
                         storeName: data.data["store_name"] ,
                         storeId: data.data['store_id'] ,
                         shippingDate: date ,
                         receiver: data.data['receiver'] ,
                         receiver_name: data.data['receiver_name'] }
                    
                )
                setReceiverSet(data.data["store_id"])
                setReceiver((
                    <InputText>{data.data["receiver_name"]}</InputText>
                ))
            }

        }

    };
    useEffect(() => {
        console.log(code)
        getTargetData(code);
    }, []);
    
    
    return (
        <Container>
            <Contents style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, paddingTop: 24 }}>


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
                {receiver}
                <TopText />


            </Contents>
            <Button onPress={() =>{ 
                if(receiverSet !== null){
                    if(isReceiverNull){
                        postSendRepairInfo(datas.receiver,formatDate(new Date()),1,0,repairDetailId)
                    }
                    navigation.navigate('DetectCode',{ toGo: "ProductSend", datas: datas })
                }else{
                    Alert.alert(
                        "발송지 미설정",
                        "받는곳을 선택해 주세요",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }

            }}>
                행낭 코드 스캔
            </Button>

            <Bottom navigation={navigation} />

        </Container>
    )
}