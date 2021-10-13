import React from 'react';
import Contents from '../components/Contents';
import ButtonBlack from '../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import { Image, View,Text,useState} from 'react-native';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
import DateTimePicker from '@react-native-community/datetimepicker';


const TouchableView = styled.TouchableOpacity`
    width: 100%;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
`;
const DateView = styled.View`
    width: 100%;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
    margin:10px;
`;
const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


function ShopStepFour2({navigation}) {
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const [dateP14, setDateP14] = React.useState(date.addDays(14));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateP14(currentDate.addDays(14))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    return (
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
            <Contents>
                
                <CenterView><TopIntro>서비스 카드 정보</TopIntro></CenterView>
                <Label> 서비스 카드 바코드</Label>
                <Input />
                <Label> 매장 접수일</Label>
                <TouchableView onPress={showDatepicker}>
                    <PrView>
                    <Label>{date.getFullYear()}년  {date.getMonth()+1}월  {date.getDate()}일</Label>
                    <ImgIcon source={require('../Icons/calendar.png')}/>
                    </PrView>
                </TouchableView>
                
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                <Label> 고객 약속일</Label>
                <DateView><Label>{dateP14.getFullYear()}년  {dateP14.getMonth()+1}월  {dateP14.getDate()}일</Label></DateView>
                <Label> 매장 발송 예정일</Label>
                <DateView><Label>{date.getFullYear()}년  {date.getMonth()+1}월  {date.getDate()+1}일</Label></DateView>

            
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=> navigation.navigate( 'ShopStepFive' ) }>
                    다음: 5단계
                </ButtonBlack>
            </CenterView>
        </ContainView>
    )
}

export default ShopStepFour2;