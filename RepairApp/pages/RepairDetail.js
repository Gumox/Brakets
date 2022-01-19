import React, { useState, useEffect,useCallback } from 'react';
import { Text, Image, Alert, View, Pressable, BackHandler } from 'react-native';
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";

import Contents from '../components/Contents';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import SmallButton from '../components/SmallButton';
import Bottom from '../components/Bottom';
import { TextInput } from 'react-native-gesture-handler';
import { PathToFlie } from '../functions/PathToFlie';
import Ip from '../serverIp/Ip';
import store from '../store/store';

function RepairDetail({ navigation, route }) {
    const code = route.params.data;
    const shop = store.getState().shopId;
    const [cardId, setCardID] = useState(code);
    const [brandNum, setBrandNum] = useState('');
    const [storeName, setStoreName] = useState('');
    const [receiptId,setReceiptId] = useState(0)
    const [storeId,setStoreId ] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [styleNum, setStyleNum] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [require,setRequire] = useState('');
    const [datas,setDatas] = useState([])
    const [image,setImage] = useState('')

    const [shippingDate, setShippingDate] = useState(null);
    const [shippingMethod, setShippingMethod] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [shippingPlace, setShippingPlace] = useState('');

    const [repairShop,setRepairShop] = useState('')
    const [repairDetailId,setRepairDetailId] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [btnDisabled, setBtnDiabled] = useState(true);
    const [beforeImages,setBeforeImages] =useState([]);        //제품 수선 전 세부 사진
    let beforeImgList =[]
    const alertFunctionCode = ()=>{
        Alert.alert(
            "서비스 카드 바코드를 찾을수 없습니다",
            "\n올바른 서비스 카드가 아닙니다",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          navigation.goBack();
    }  
    const alertFunction = ()=>{
        Alert.alert(
            "브랜드 불일치",
            "올바른 브랜드를 선택해 주세요",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          navigation.goBack();
    }   
    const getTargetData = useCallback(async (receiptId) => {
        const { data } = await axios.get(Ip+`/api/RepairDetailInfo?code=${receiptId}`);
        console.log(data)
        if(data.data === undefined){
            console.log("undefined")
            alertFunctionCode();
        }
        else{
            setDatas(data.data)
            if(data.data["brand_name"]!==store.getState().brand["label"]){
                console.log("Not same")
                alertFunction();
            }
            setBrandNum(data.data['brand_name'])
            setStoreName(data.data['store_name'])
            setReceiptId(data.data['receipt_id'])
            setStoreId(data.data['store_id'])
            setCustomerName(data.data['customer_name'])
            setStyleNum(data.data['style_code'])
            setColor(data.data['color'])
            setSize(data.data['size'])
            setRequire(data.data["store_message"])
            setImage(data.data["image"])

            if(data.data["repair1_store_id"]===shop){
                console.log(data.data["repair1_store_id"]+" : "+shop)
                setRepairShop(data.data["repair1_store_id"])
                setRepairDetailId(data.data["repair1_detail_id"])
            }else if(data.data["repair2_store_id"]===shop){
                console.log(data.data["repair2_store_id"]+" : "+shop)
            }else if(data.data["repair3_store_id"]===shop){
                console.log(data.data["repair3_store_id"]+" : "+shop)
            }
            
                                
            for (let i = 0; i < data.imageList.length; i++) {
                const element = data.imageList[i];
                
                beforeImgList.push(Ip+element["before_image"])
                
            }
            
            setBeforeImages(beforeImgList)
        }    
    });
    const postUpdateAfterImage = async (receipt_id,sendType,store_id,image1,image2,image3,image4) => {
        var formdata = new FormData();

        formdata.append("receipt", receipt_id )//받는곳
        formdata.append("store", store_id) //수선처

        formdata.append("image1", PathToFlie(image1));//수선사진들
        formdata.append("image2", PathToFlie(image2));
        formdata.append("image3", PathToFlie(image3));
        formdata.append("image4", PathToFlie(image4));
        console.log(formdata)

        try {
            const response = await fetch(Ip+'/api/RepairShop/sendRepairInfo/updateAfterImage',{method: 'PUT',
            headers: {
                'Accept': '',
                'Content-Type': 'multipart/form-data'
                },
            body: formdata
            });
            const json = await response.json();
            console.log(json.msg)
            if(json.msg == 'images saved'){
                navigation.popToTop();
                if(sendType === 1){
                    store.dispatch({type:"IMAGE_RESET", reset:null})
                    navigation.navigate("MailbagScan")
                }
                else{
                    store.dispatch({type:"IMAGE_RESET", reset:null})
                    navigation.navigate("PhotoStep")
                }
            }
           
        } catch (error) {
            console.error(error);
        } finally {

        }
        
    }
    
    const postSendRepairInfo = async (date,sendType,sendPay,repair_detail_id) => {
        const bodyData={
                    
            complete_date: date,
            shipment_type: sendType,
            shipment_price: sendPay,
            repair_detail_id:repair_detail_id
        }
        console.log(bodyData)
        try {
            const response = await fetch(Ip+'/api/RepairShop/sendRepairInfo',{method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bodyData)
            });
            const json = await response.json();
            console.log(json);
            
           
        } catch (error) {
            console.error(error);
        } finally {
        }
    }
    let beforeImageViews =[];
    let after ="";
    for (let i = 0; i < beforeImages.length; i++) {
        const element = beforeImages[i];
        const key = i
        let afterImage = "../Icons/camera.png"
        
        let photo ='afterImageUri'+(key+1);
        
        if(store.getState()[photo] != ""){
            console.log("image inside: "+store.getState()[photo] )
            afterImage = store.getState()[photo]
        }
        const before =(
            <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                <Pressable >
                    <Image style={{width:100,height:120, margin:15, padding:10, marginLeft:30}} source={{uri : element}}></Image>
                </Pressable>
                <Pressable onPress={()=>{navigation.navigate("TakePhoto",{key:"CloseShot",data:code ,store:(key+1)})}}>
                    <Image style={{width:100,height:120, margin:15, padding:10, marginRight:30, backgroundColor:"#828282"}} source={{uri : afterImage}}></Image>
                </Pressable>
            </View>
        )
        beforeImageViews[key] =(before)
    }
    useEffect(() => {
        getTargetData(code);
       

    }, [shippingDate]);

    

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date.toLocaleDateString('ko-kr'));
        let curruntDate =date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        console.log(curruntDate)
        setShippingDate(curruntDate);   
        console.log("shipping date is" + shippingDate);
        hideDatePicker();
    };
    const setShipping=(value)=>{
        let items=[
            { label: storeName, value: storeId },
            { label: '본사', value: 1 }
        ]
        items.forEach(obj => {
            if(obj.value === value){
                store.dispatch({type:"SHIPPING_PLACE", shippingPlace:obj.label})
            }
        });
    }

    const nowTime = dayjs();

    return (
        <ContainView>

            <Contents>
                <OverallView>
                    <Label>서비스 카드 번호</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={cardId}
                        onChangeText={text => setCardID(text)}
                    />

                    <Label>브랜드</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={brandNum}
                        onChangeText={text => setBrandNum(text)}
                    />

                    <Label>매장명</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={storeName}
                        onChangeText={text => setStoreName(text)}
                    />

                    <Label>고객명</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={customerName}
                        onChangeText={text => setCustomerName(text)}
                    />

                    <Label>스타일 No.</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={styleNum}
                        onChangeText={text => setStyleNum(text)}
                    />


                    <MiddleView>
                        <Label>컬러</Label>
                        <Input
                            editable={true}
                            selectTextOnFocus={false}
                            value={color}
                            onChangeText={text => setColor(text)}
                            style={{ width: 100 }}
                        />

                        <Label>사이즈</Label>
                        <Input
                            editable={true}
                            selectTextOnFocus={false}
                            value={size}
                            onChangeText={text => setSize(text)}
                            style={{ width: 100 }}
                        />
                    </MiddleView>

                    <Label>매장 접수 내용</Label>
                    <BiggerInput multiline={true} value={require}>
                        
                    </BiggerInput>
                </OverallView>

                <OverallView>
                    <PictureView>
                        <Label>전체 사진</Label>
                        <View style = {{justifyContent: "center", alignItems: "center"}}>
                            <Image
                                style={{ width: 120, height: 120 }}
                                resizeMode='contain'
                                source={
                                    { uri: Ip+image }
                                }
                            />
                        </View>
                    </PictureView>

                    <Label>근접 사진</Label>
                    <EnlargedPictureView>

                        <PictureView>
                            <SmallLabel>수선 전</SmallLabel>
                            <SmallLabel>(BEFORE)</SmallLabel>
                        </PictureView>

                        <PictureView>
                            <SmallLabel>수선 후</SmallLabel>
                            <SmallLabel>(AFTER)</SmallLabel>
                        </PictureView>

                    </EnlargedPictureView>
                    {beforeImageViews}
                </OverallView>


                <OverallView>
                    <Label>수선처 발송일</Label>
                    <DatePickerButton onPress={(showDatePicker)}>
                        <PrView>
                            <DateInput
                                pointerEvents="none"
                                editable={false}
                                value={shippingDate}
                            />
                        </PrView>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            locale='ko-kr'
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </DatePickerButton>

                    <Label>발송 방법</Label>
                    <PickerView>
                        <RNPickerSelect
                            placeholder={{ label: '[필수] 옵션을 선택하세요', value: null }}
                            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black',placeholder:{color: '#AD8E5F'}} }
                            onValueChange={(value) => setShippingMethod(value)}
                            items={[
                                { label: '행낭', value: 1 },
                                { label: '택배', value: 2},
                                { label: '퀵', value: 3 }
                            ]}
                        />
                    </PickerView>

                    <Label>발송 비용</Label>
                    <Input
                        editable={true}
                        keyboardType='numeric'
                        selectTextOnFocus={false}
                        value={shippingCost}
                        onChangeText={text => setShippingCost(text)}
                    />

                    <Label>받는 곳</Label>
                    <PickerView>
                        <RNPickerSelect
                            placeholder={{ label: '[필수] 옵션을 선택하세요', value: null }}
                            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black',placeholder:{color: '#AD8E5F'}} }
                            onValueChange={(value) => {
                                setShippingPlace(value)
                                setShipping(value)
                            }}
                            items={[
                                { label: storeName, value: storeId },
                                { label: '본사', value: 1 }
                            ]}
                        />
                    </PickerView>

                </OverallView>


                <BottomView>
                    <SmallButton onPress={() =>{
                        store.dispatch({type:"IMAGE_RESET", reset:null})
                        navigation.replace('RepairStepOne')
                        }

                    }>
                        <Text>
                            취소
                        </Text>
                    </SmallButton>

                    <SmallButton
                        onPress={() => {
                            if(shippingDate == null){
                                Alert.alert('수선처 발송일을 입력해주세요')
                            } 
                            else {
                                console.log('저장 기능 구현');
                                postSendRepairInfo(shippingDate,shippingMethod,shippingCost,repairDetailId)
                                postUpdateAfterImage(receiptId,shippingMethod,store.getState().shopId,store.getState().afterImageUri1,store.getState().afterImageUri2,store.getState().afterImageUri3,store.getState().afterImageUri4)
                            }
                        }

                        }
                    >
                        <Text>
                            저장
                        </Text>
                    </SmallButton>
                </BottomView>
            </Contents>

            <Bottom navigation={navigation} />
        </ContainView>
    )

}


export default RepairDetail;

const DatePickerButton = styled.TouchableOpacity`

    justify-content: center;
    align-items: center;`
    ;

const DateInput = styled.TextInput`
    color: #000000; 
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50px;
`;

const PickerView = styled.View`
    width: 100%;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50px;
`;

const PictureView = styled.View`
    minWidth: 100px;
    justify-content: center;
    align-items: center;
`;

const EnlargedPictureView = styled.View`
    flex-direction: row;
    margin-top: 15px;
    justify-content: space-around;
`;

const MiddleView = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
`;

const BottomView = styled.View`
    flex-direction: row;
    margin-bottom:30px;
    justify-content: center;
    align-items: center;                
`;
const Label = styled.Text`
    font-size: 15px;
    margin: 12px;
    color: #000000;
`;

const SmallLabel = styled.Text`
    font-size: 12px;
    margin-bottom: 7px;
    color: #000000;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    color: #000000;
    border-radius:10px
    height: 50px;
`;

const BiggerInput = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    color: #000000;
    border-radius:10px
    height: 100px;
`;

const OverallView = styled.View`
    padding: 8px;
    padding-bottom: 30px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px;
    margin-bottom: 30px;
`;
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%
    justify-content: center;
`;
