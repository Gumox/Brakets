import React from 'react';
import Contents from '../components/Contents';
import ButtonBlack from '../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import { Image, View,Text} from 'react-native';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
<<<<<<< Updated upstream

=======
import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../store/store';
>>>>>>> Stashed changes

const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
    margin-bottom:30px
    padding-bottom:30px;
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
const ContainImg =styled.View`
    margin-top: 40px;
    background-color:#d6d6d6;
    border-radius:12px;
    justify-content: center;
    align-items: center;
`;
const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;



function ShopStepFour2({navigation}) {
<<<<<<< Updated upstream
   
    
=======
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const [dateP14, setDateP14] = React.useState(date.addDays(14));
    const [dateP1, setDateP1] = React.useState(date.addDays(1));
    const [codeData,setCodeData] =React.useState(store.getState().cardValue);

    console.log(codeData);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateP14(currentDate.addDays(14));
        setDateP1(currentDate.addDays(1))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
>>>>>>> Stashed changes
    return (
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
            <Contents>
                
<<<<<<< Updated upstream
                <CenterView><TopIntro>수선증 정보</TopIntro></CenterView>
                <Label> 수선증 바코드</Label>
                <Input />
=======
                <CenterView><TopIntro>서비스 카드 정보</TopIntro></CenterView>
                <Label> 서비스 카드 바코드</Label>
                <Input value={codeData}/>
>>>>>>> Stashed changes
                <Label> 매장 접수일</Label>
                <Input  multiline={ true }/>
                <Label> 고객 약속일</Label>
<<<<<<< Updated upstream
                <Input  multiline={ true }/>
                <Label> 매장 발송일</Label>
                <Input  multiline={ true }/>
=======
                <DateView><Label>{dateP14.getFullYear()}년  {dateP14.getMonth()+1}월  {dateP14.getDate()}일</Label></DateView>
                <Label> 매장 발송 예정일</Label>
                <DateView><Label>{dateP1.getFullYear()}년  {dateP1.getMonth()+1}월  {dateP1.getDate()}일</Label></DateView>

>>>>>>> Stashed changes
            
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