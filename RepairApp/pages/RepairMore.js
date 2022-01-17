import React, { useState, useEffect,useCallback } from 'react';
import { Text, Image, Alert, View, Pressable } from 'react-native';
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
import Ip from '../serverIp/Ip';

function RepairMore({ navigation, route }) {
    const code = route.params.data;
    
    const [cardId, setCardID] = useState(code);
    const [brandNum, setBrandNum] = useState('');
    const [storeName, setStoreName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [styleNum, setStyleNum] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [require,setRequire] = useState('');

    const [image,setImage] = useState('')

    const [shippingDate, setShippingDate] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [shippingPlace, setShippingPlace] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [btnDisabled, setBtnDiabled] = useState(true);
    const [beforeImages,setBeforeImages] =useState([]);        //제품 수선 전 세부 사진
   
    const getTargetData = useCallback(async (receiptId) => {
        const { data } = await axios.get(Ip+`/api/RepairDetailInfo?code=${receiptId}`);
        console.log(data)
        setBrandNum(data.data['brand_name'])
        setStoreName(data.data['store_name'])
        setCustomerName(data.data['customer_name'])
        setStyleNum(data.data['style_code'])
        setColor(data.data['color'])
        setSize(data.data['size'])
        setRequire(data.data["store_message"])
        setImage(data.data["image"])
        
        const beforeImgList =[]                         
        for (let i = 0; i < data.imageList.length; i++) {
            const element = data.imageList[i];
            
            beforeImgList.push(Ip+element["before_image"])
            
        }
        
        setBeforeImages(beforeImgList)
        
    });
    
    var beforeImageViews =[];

    for (let i = 0; i < beforeImages.length; i++) {
        const element = beforeImages[i];
        const key = i
        const before =(
            <View  key = {key}  style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                <Pressable >
                    <Image style={{width:100,height:120, margin:15, padding:10, marginLeft:30}} source={{uri : element}}></Image>
                </Pressable>
                <Pressable >
                    <Image style={{width:100,height:120, margin:15, padding:10, marginRight:30}} source={{uri : element}}></Image>
                </Pressable>
            </View>
        )
        beforeImageViews[key] =(before)
    }
    useEffect(() => {
        getTargetData(code);
        console.log("shipping date is: " + shippingDate);

    }, [shippingDate]);

    

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date.toLocaleDateString('ko-kr'));
        setShippingDate(date.toLocaleDateString('ko-kr'));
        console.log("shipping date is" + shippingDate);
        hideDatePicker();
    };

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
                    <View style={{minWidth: 100}}>
                        <Label>전체 사진</Label>
                        <View style = {{flexDirection:"row", alignItems: "center",justifyContent:"space-around"}}>
                            <Pressable onPress={() => {navigation.navigate('PhotoDraw',{photo : Ip+image })}}>
                                <Image
                                    style={{ width: 150, height: 150 }}
                                    resizeMode='contain'
                                    source={
                                        { uri: Ip+image }
                                    }
                                />
                            </Pressable>
                            <View style={{justifyContent:"center",alignItems:"center"}}>
                                <SmallLabel>
                                전체 사진을 클릭한 후,
                                </SmallLabel>
                                <SmallLabel>
                                추가 수선이 필요한 부위를 
                                </SmallLabel>
                                <SmallLabel>
                                표시하세요
                                </SmallLabel>
                            </View>
                            
                        </View>
                    </View>

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




                <BottomView>
                    <SmallButton onPress={() =>
                        navigation.navigate('RepairStepOne')

                    }>
                        <Text>
                            취소
                        </Text>
                    </SmallButton>

                    <SmallButton
                        onPress={() => {
                            (btnDisabled == true) ? (
                                Alert.alert('수선처 발송일을 입력해주세요')
                            ) : (
                            console.log('저장 기능 구현')
                        )
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


export default RepairMore;

const DatePickerButton = styled.TouchableOpacity``;

const DateInput = styled.TextInput`
    color: #000000; 
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50px;
`;

const PickerView = styled.TouchableOpacity`
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
`;

const ContainImg = styled.View`
    margin-top: 15px;
    background-color:#d6d6d6;
    border-radius:12px;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
`;

const AttachImg = styled.TouchableOpacity`
    margin-top: 15px;
    background-color:#d6d6d6;
    border-radius:12px;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
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
