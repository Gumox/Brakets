import React, { useState, useEffect,useCallback } from 'react';
import { Text, Image, Alert, View, Pressable, BackHandler,TextInput} from 'react-native';
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";

import Contents from '../components/Contents';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import SmallButton from '../components/SmallButton';
import Bottom from '../components/Bottom';
import { postSendRepairInfo,postUpdateAfterImage } from '../functions/useInRepairDetail';
import Ip from '../serverIp/Ip';
import store from '../store/store';
import imgPhoto from '../Icons/camera.png' 
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [image,setImage] = useState('')

    const [shippingDate, setShippingDate] = useState(null);
    const [shippingMethod, setShippingMethod] = useState(1);
    const [shippingCost, setShippingCost] = useState("0");
    const [datas,setDatas] =useState([])
    const [shippingPlace, setShippingPlace] = useState('');

    const [repairShop,setRepairShop] = useState('')
    const [repairDetailId,setRepairDetailId] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [btnDisabled, setBtnDiabled] = useState(true);
    const [beforeImages,setBeforeImages] =useState([]);        //제품 수선 전 세부 사진
    const [afterImages,setAfterImages] =useState([]);
    
    let beforeImgList = []
    let afterImgList = []

    
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
    const getTargetData = useCallback(async (receiptId) => {
        const { data } = await axios.get(Ip+`/api/RepairDetailInfo?code=${receiptId}`);
        console.log(data.data)
        console.log()
        if(data.data === undefined){
            console.log("undefined")
            alertFunctionCode();
        }
        else{
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
                console.log("repair1_store_id")
                setRepairShop(data.data["repair1_store_id"])
                setRepairDetailId(data.data["repair1_detail_id"])
            }else if(data.data["repair2_store_id"]===shop){
                console.log("repair2_store_id")
                setRepairShop(data.data["repair2_store_id"])
                setRepairDetailId(data.data["repair2_detail_id"])
            }else if(data.data["repair3_store_id"]===shop){
                console.log("repair3_store_id")
                setRepairShop(data.data["repair3_store_id"])
                setRepairDetailId(data.data["repair3_detail_id"])
            }else{
                Alert.alert("해당 제품에 맞는 수선정보가 존재 하지 않습니다.","수선 접수를 진행해 주세요")
                navigation.goBack();
            }
            
                                
            for (let i = 0; i < data.imageList.length; i++) {
                const element = data.imageList[i];
                
                beforeImgList.push(Ip+element["before_image"])
                if(element["after_image"]!==null){
                    afterImgList.push(Ip+element["after_image"])
                }
               
                
            }
            
            setBeforeImages(beforeImgList)
            setAfterImages(afterImgList)
        }    
    });
    
    let beforeImageViews =[];
    let after ="";
    for (let i = 0; i < beforeImages.length; i++) {
        const element = beforeImages[i];
        const obj = afterImages[i];
        const key = i
        let afterImage = "../Icons/camera.png"
        
        let photo ='afterImageUri'+(key+1);
        
        if(store.getState()[photo] != ""){
            afterImage = store.getState()[photo]
        }
        let before;
        if(obj!==undefined &&store.getState()[photo] == ""){
            console.log(obj)
            before=(
                <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                    <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:element})}}>
                        <Image style={{width:100,height:120, margin:15, padding:10, marginLeft:30}} source={{uri : element}}></Image>
                    </Pressable>
                    <Pressable onPress={()=>{navigation.navigate("TakePhoto",{key:"CloseShot",data:code ,store:(key+1)})}}>
                        <Image style={{width:100,height:120, margin:15, padding:10, marginRight:30, backgroundColor:"#828282"}} source={{uri : obj}}></Image>
                    </Pressable>
                </View>
            )
        }
        else{
            before=(
                <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                    <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:element})}}>
                        <Image style={{width:100,height:120, margin:15, padding:10, marginLeft:30}} source={{uri : element}}></Image>
                    </Pressable>
                    <Pressable onPress={()=>{navigation.navigate("TakePhoto",{key:"CloseShot",data:code ,store:(key+1)})}}>
                        <Image style={{width:100,height:120, margin:15, padding:10, marginRight:30, backgroundColor:"#828282"}} source={{uri : afterImage}}></Image>
                    </Pressable>
                </View>
            )
        }
        beforeImageViews[key] =(before)
    }
    useEffect(() => {
        if(shop === null ||shop == 0){
            navigation.goBack();
            Alert.alert("","사용자 정보 연결 실패")
        }
        getTargetData(code);
       
    }, [code]);

    

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let curruntDate =date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        setShippingDate(curruntDate);   
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
                        <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:Ip+image})}}>
                        <View style = {{justifyContent: "center", alignItems: "center"}}>
                            <Image
                                style={{ width: 120, height: 120 }}
                                resizeMode='contain'
                                source={
                                    { uri: Ip+image }
                                }
                            />
                        </View>
                        </Pressable>
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
                        
                            <DateInput
                                pointerEvents="none"
                                editable={false}
                                value={shippingDate}
                            />
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
                            placeholder={{ label: '행낭', value: 1 }}
                            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black',placeholder:{color: '#AD8E5F'}} }
                            onValueChange={(value) => { setShippingMethod(value);
                                                        console.log(value)}}
                            items={[
                                { label: '행낭', value: 1 },
                                { label: '택배', value: 2},
                                { label: '퀵', value: 3 },
                                { label: '행낭 - 행낭 바코드 X', value: 4 }
                            ]}
                        />
                    </PickerView>

                    <Label>발송 비용</Label>
                    <Input
                        editable={true}
                        keyboardType='numeric'
                        selectTextOnFocus={false}
                        value={shippingCost}
                        onChangeText={vlaue => setShippingCost(vlaue)}
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
                            else if(store.getState().afterImageUri1 != null || afterImages[0] !=null){
                                console.log(shippingPlace,shippingDate,shippingMethod,shippingCost,repairDetailId,receiptId)
                                postUpdateAfterImage(receiptId,shippingMethod,store.getState().shopId,store.getState().afterImageUri1,store.getState().afterImageUri2,store.getState().afterImageUri3,store.getState().afterImageUri4)
                                postSendRepairInfo(shippingPlace,shippingDate,shippingMethod,shippingCost,repairDetailId,receiptId,navigation)
                                
                                //navigation.navigate("PhotoStep")
                                //navigation.popToTop();
                            }
                            else if(shippingPlace == null){
                                Alert.alert("","받는 곳을 입력해주세요")
                            }   
                            else {
                                Alert.alert("","수선 후 사진을 촬영해 주세요")
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
    `
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
    padding-left: 5px;
    justify-content: center;
    width: 100%;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50px;
`;

const PictureView = styled.View`
    min-Width: 100px;
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
