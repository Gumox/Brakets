import React, { useState, useEffect,useCallback } from 'react';
import { Text, Image, Alert, View, Pressable, BackHandler,TextInput,ImageBackground,Appearance,Dimensions} from 'react-native';
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
import ip from '../serverIp/Ip';
import {NeedAfterView} from "../functions/CheckNeedAfterImg"
import COLOR from '../contents/color';
import returnDate from '../functions/ReturnDate';

function RepairDetail({ navigation, route }) {
    const code = route.params.data;
    const shop = store.getState().shopId;

    const [isDataHas,setIsDataHas] = useState(false)

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
    const [shippingPlace, setShippingPlace] = useState(null);
    const [headquarterStoreId,setHeadquarterStoreId] =useState(0)
    const [headquarterStoreName,setHeadquarterStoreName] =useState('')

    const [repairShop,setRepairShop] = useState('')
    const [repairDetailId,setRepairDetailId] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [beforeImages,setBeforeImages] =useState([]);        //제품 수선 전 세부 사진
    const [afterImages,setAfterImages] =useState([]);
    const [needImages,setNeedImages] =useState([]); 
    
    const stepArr =[1,4,5]
    const [minimumDate,setMinimumDate] = useState(null)
    const [step,setStep] = useState()
    const sImageWidth = Dimensions.get("window").width/4
    const sImageHeight = sImageWidth*4/3

    const bImageWidth = Dimensions.get("window").width/3
    const bImageHeight = bImageWidth*4/3
    
    let beforeImgList = []
    let afterImgList = []

    let selectBackground = COLOR.WHITE;
    let selectTextColor = COLOR.SOIL;
    let inputTextColor = COLOR.BLACK;
    
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
        console.log("dark")
        selectBackground = COLOR.ANOTHER_GRAY;
        selectTextColor = COLOR.LIGHT_SOIL;
        inputTextColor = COLOR.WHITE;

    }
    
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
        //console.log(data.needRepairImage)
        console.log(data)
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
            setHeadquarterStoreId(data.data["headquarter_store_id"])
            setHeadquarterStoreName(data.data["headquarter_store_name"])

            if(data.data["repair1_store_id"]===shop && data.data["repair1_result_id"] ){
                console.log("repair1_store_id")
                setRepairShop(data.data["repair1_store_id"])
                setRepairDetailId(data.data["repair1_detail_id"])
                if(data.data["receiver"] === data.data['store_id'] || data.data["receiver"] === data.data['headquarter_store_id']  ){
                    setShippingPlace(data.data["receiver"])
                    setShippingDate(returnDate(data.data["repair1_complete_date"]))
                }
                setMinimumDate(new Date(data.data["repair1_register_date"]))
                setIsDataHas(true)
            }else if(data.data["repair2_store_id"]===shop && data.data["repair2_result_id"]){
                console.log("repair2_store_id")
                setRepairShop(data.data["repair2_store_id"])
                setRepairDetailId(data.data["repair2_detail_id"])
                if(data.data["receiver"] === data.data['store_id'] || data.data["receiver"] === data.data['headquarter_store_id']  ){
                    setShippingPlace(data.data["receiver"])
                    setShippingDate(returnDate(data.data["repair2_complete_date"]))
                }
                setMinimumDate(new Date(data.data["repair2_register_date"]))
                setIsDataHas(true)
            }else if(data.data["repair3_store_id"]===shop && data.data["repair3_result_id"]){
                console.log("repair3_store_id")
                setRepairShop(data.data["repair3_store_id"])
                setRepairDetailId(data.data["repair3_detail_id"])
                if(data.data["receiver"] === data.data['store_id'] || data.data["receiver"] === data.data['headquarter_store_id']  ){
                    setShippingPlace(data.data["receiver"])
                    setShippingDate(returnDate(data.data["repair3_complete_date"]))
                }
                setMinimumDate(new Date(data.data["repair3_register_date"]))
                setIsDataHas(true)
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
            setNeedImages(data.needRepairImage)
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
        //console.log(store.getState().afterImageUri1)
        if(obj!==undefined &&store.getState()[photo] == null){
            
        //console.log("in")
            before=(
                <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                    <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:element})}}>
                        <Image style={{width:sImageWidth,height:sImageHeight, margin:15, padding:10, marginLeft:30}} source={{uri : element}}></Image>
                    </Pressable>
                    <Pressable onPress={()=>{navigation.navigate("TakePhoto",{key:"CloseShot",data:code ,store:(key+1)})}}>
                        <ImageBackground style={{width:sImageWidth,height:sImageHeight, margin:15, padding:10, marginRight:30, backgroundColor:"#828282"}} source={{uri : obj}}></ImageBackground>
                    </Pressable>
                </View>
            )
        }
        else{
            before=(
                <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                    <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:element})}}>
                        <Image style={{width:sImageWidth,height:sImageHeight, margin:15, padding:10, marginLeft:30}} source={{uri : element}}></Image>
                    </Pressable>
                    <Pressable onPress={()=>{navigation.navigate("TakePhoto",{key:"CloseShot",data:code ,store:(key+1)})}}>
                        <ImageBackground style={{width:sImageWidth,height:sImageHeight, margin:15, padding:10, marginRight:30, backgroundColor:"#828282",justifyContent:"center",alignItems:"center"}} source={{uri : afterImage}}>
                            <Text style={{color:"#FFFFFF"}}>사진을</Text>
                            <Text style={{color:"#FFFFFF"}}>추가하거나</Text>
                            <Text style={{color:"#FFFFFF"}}>변경하려면</Text>
                            <Text style={{color:"#FFFFFF"}}>클릭하세요</Text>
                        </ImageBackground>
                    </Pressable>
                </View>
            )
        }
        beforeImageViews[key] =(before)
    }

    let need=NeedAfterView(needImages,navigation,code)
    let needImagesView;
    let afterNeed = store.getState().needClosePhotos;

   
    useEffect(() => {
        let isApiSubscribed = true;
        if(isApiSubscribed){
            if(shop === null ||shop == 0){
                navigation.goBack();
                Alert.alert("","사용자 정보 연결 실패")
            }
            getTargetData(code);
        }
        return () => {
            isApiSubscribed = false;
        };
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
            { label: headquarterStoreName, value: headquarterStoreId }
        ]
        items.forEach(obj => {
            if(obj.value === value){
                store.dispatch({type:"SHIPPING_PLACE", shippingPlace:obj.label})
            }
        });
    }

    return isDataHas?(
        <ContainView>

            <Contents>
                <OverallView>
                    <Label>서비스 카드 번호</Label>
                    <Input
                        editable={false}
                        selectTextOnFocus={false}
                        value={cardId}
                        onChangeText={text => setCardID(text)}
                    />

                    <Label>브랜드</Label>
                    <Input
                        editable={false}
                        selectTextOnFocus={false}
                        value={brandNum}
                        onChangeText={text => setBrandNum(text)}
                    />

                    <Label>매장명</Label>
                    <Input
                        editable={false}
                        selectTextOnFocus={false}
                        value={storeName}
                        onChangeText={text => setStoreName(text)}
                    />

                    <Label>고객명</Label>
                    <Input
                        editable={false}
                        selectTextOnFocus={false}
                        value={customerName}
                        onChangeText={text => setCustomerName(text)}
                    />

                    <Label>스타일 No.</Label>
                    <Input
                        editable={false}
                        selectTextOnFocus={false}
                        value={styleNum}
                        onChangeText={text => setStyleNum(text)}
                    />


                    <MiddleView>
                        <Label>컬러</Label>
                        <Input
                            editable={false}
                            selectTextOnFocus={false}
                            value={color}
                            onChangeText={text => setColor(text)}
                            style={{ width: 80 }}
                        />

                        <Label>사이즈</Label>
                        <Input
                            editable={false}
                            selectTextOnFocus={false}
                            value={size}
                            onChangeText={text => setSize(text)}
                            style={{ width: 80 }}
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
                                style={{ width: bImageWidth, height: bImageHeight }}
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
                    {needImages.length > 0 &&(
                        <View>
                            <Label>추가 수선 필요 부위</Label>
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
                            {need}
                        </View>
                    )}
                </OverallView>


                <OverallView>
                    <Label>수선처 발송일</Label>
                    <DatePickerButton onPress={(showDatePicker)}>
                        
                            <DateInput
                                pointerEvents="none"
                                editable={false}
                                value={shippingDate}
                                style={{backgroundColor:selectBackground, color:inputTextColor}}
                            />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            minimumDate={minimumDate}
                            mode="date"
                            locale='ko-kr'
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </DatePickerButton>

                    <Label>발송 방법</Label>
                    <PickerView style={{backgroundColor:selectBackground}}>
                        <RNPickerSelect
                            placeholder={{ label: '행낭', value: 1 }}
                            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black',placeholder:{color: selectTextColor}} }
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
                        style={{backgroundColor:selectBackground ,color:inputTextColor}}
                        value={shippingCost}
                        onChangeText={vlaue => setShippingCost(vlaue)}
                    />
                    <Label>받는 곳</Label>
                    <PickerView style={{backgroundColor:selectBackground}}>
                        <RNPickerSelect
                            placeholder={{ label: '[필수] 옵션을 선택하세요', value: null }}
                            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black',placeholder:{color: selectTextColor}} }
                            value = {shippingPlace}
                            onValueChange={(value,index) => {
                                setStep(stepArr[index])
                                setShippingPlace(value)
                                setShipping(value)
                            }}
                            items={[
                                { label: storeName, value: storeId ,step:4 },
                                { label: headquarterStoreName, value: headquarterStoreId ,step: 5}
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
                                postUpdateAfterImage(
                                                    receiptId,
                                                    shippingMethod,
                                                    store.getState().shopId,
                                                    store.getState().afterImageUri1,
                                                    store.getState().afterImageUri2,
                                                    store.getState().afterImageUri3,
                                                    store.getState().afterImageUri4,
                                                    afterNeed
                                                    )
                                postSendRepairInfo(
                                                    shippingPlace,
                                                    shippingDate,
                                                    shippingMethod,
                                                    shippingCost,
                                                    repairDetailId,
                                                    receiptId,
                                                    step,
                                                    navigation
                                                   )
                                
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
    ):<ContainView/>

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
