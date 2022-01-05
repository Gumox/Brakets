import React, { useState } from 'react';
import { Text, Image, Alert } from 'react-native';
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

import Contents from '../components/Contents';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import SmallButton from '../components/SmallButton';
import Bottom from '../components/Bottom';


function RepairDetail({ navigation, route }) {

    const [cardId, setCardID] = useState('');
    const [brandNum, setBrandNum] = useState('');
    const [storeName, setStoreName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [styleNum, setStyleNum] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    const [shippingDate, setShippingDate] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [shippingPlace, setShippingPlace] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [btnDisabled, setBtnDiabled] = useState(true)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setShippingDate(date);
        console.log(shippingDate);
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


                    <Label>브랜드 번호</Label>
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
                    <BiggerInput multiline={true}>
                        
                    </BiggerInput>
                </OverallView>

                <OverallView>
                    <PictureView>
                        <Label>전체 사진</Label>
                        <ContainImg>
                            <Image
                                style={{ width: 120, height: 120 }}
                                resizeMode='contain'
                                source={
                                    { uri: "https://image.adidas.co.kr/upload/prod/basic/source/H41391-05-01.jpg" }
                                }
                            />
                        </ContainImg>
                    </PictureView>

                    <Label>근접 사진</Label>
                    <EnlargedPictureView>

                        <PictureView>
                            <SmallLabel>수선 전</SmallLabel>
                            <SmallLabel>(BEFORE)</SmallLabel>
                            <ContainImg>
                                <Image
                                    style={{ width: 120, height: 120 }}
                                    // resizeMode='contain'
                                    source={
                                        { uri: "https://image.adidas.co.kr/upload/prod/basic/source/H41391-05-01.jpg" }
                                    }
                                />
                            </ContainImg>

                            <ContainImg>
                                <Image
                                    style={{ width: 120, height: 120 }}
                                    // resizeMode='contain'
                                    source={
                                        { uri: "https://image.adidas.co.kr/upload/prod/basic/source/H41391-05-01.jpg" }
                                    }
                                />
                            </ContainImg>
                        </PictureView>

                        <PictureView>
                            <SmallLabel>수선 후</SmallLabel>
                            <SmallLabel>(AFTER)</SmallLabel>
                            <AttachImg onPress={() => navigation.navigate('Picture', { order: 'first' })}>
                                <Image
                                    style={{ width: 120, height: 120 }}
                                    // resizeMode='contain'
                                    source={
                                        (route.params == null) ? (
                                            { uri: null }
                                        ) : (
                                            { uri: route.params.firstPicture }
                                        )
                                    }
                                />
                            </AttachImg>

                            <AttachImg onPress={() => navigation.navigate('Picture', { order: 'second' })}>
                                <Image
                                    style={{ width: 120, height: 120 }}
                                    // resizeMode='contain'
                                    source={
                                        (route.params == null) ? (
                                            { uri: null }
                                        ) : (
                                            { uri: route.params.secondPicture }
                                        )
                                    }
                                />
                            </AttachImg>
                        </PictureView>

                    </EnlargedPictureView>
                </OverallView>


                <OverallView>
                    <Label>수선처 발송일</Label>
                    <PickerView
                        onPress={() => showDatePicker()}>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            locale='ko-kr'
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                    </PickerView>
                    <Label>발송 방법</Label>
                    <PickerView>
                        <RNPickerSelect
                            placeholder = {{label : '[필수] 옵션을 선택하세요',value: null}}
                            onValueChange={(value) => setShippingMethod(value)}
                                items={[
                                    { label: '1. ', value: '1.'}
                                ]}
                            /> 
                    </PickerView>
                    
                    <Label>발송 비용</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={shippingCost}
                        onChangeText={text => setShippingCost(text)}
                    />

                    <Label>받는 곳</Label>
                    <PickerView>
                        <RNPickerSelect
                            placeholder = {{label : '[필수] 옵션을 선택하세요',value: null}}
                            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black'} }
                            onValueChange={(value) => setShippingPlace(value)}
                                items={[
                                    { label: '1. ', value: '1. '}
                                ]}
                            /> 
                    </PickerView>

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
                        onPress={() => {(btnDisabled == true) ? (
                            Alert.alert('수선처 발송일을 입력해주세요')
                        ) : ( 
                            console.log('저장 기능 구현')
                        )}
                    
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

const PickerView = styled.TouchableOpacity`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 35px;
`;

const PictureView = styled.View`
    margin-bottom: 20px;
    margin-right: 30px;
`;

const EnlargedPictureView = styled.View`
    flex-direction: row;
    padding: 15px;
`;

const MiddleView = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
`;

const BottomView = styled.View`
    flex-direction: row;
    justify-content: center;
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
`;

const SmallLabel = styled.Text`
    font-size: 12px;
    margin-bottom: 7px;
    padding-left: 45px;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 35px;
`;

const BiggerInput = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
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