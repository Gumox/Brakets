import React from 'react';
import Contents from '../components/Contents';
import ButtonBlack from '../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import { Image, View,Text} from 'react-native';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';


const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
    margin-bottom:30px;
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

    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const [dateP14, setDateP14] = React.useState(date.addDays(14));
    const [barcode, setBarcode] = React.useState(store.getState().cardValue);
    store.dispatch({type:'SERVICECAED',value:barcode});
    
    const [modalVisible, setModalVisible] = React.useState(false);
    
    const cardImgUri =store.getState().card;
    
    //console.log(cardImgUri );
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

    const styles = StyleSheet.create({
        centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
        },
        xView:{
            backgroundColor: "#78909c",
            borderRadius: 20,
        },
        modalView: {
          margin: 10,
          backgroundColor: "white",
          borderRadius: 20,
          paddingRight: 5,
          paddingLeft: 5,
          paddingTop: 15,
          paddingBottom: 15,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
        }
      });
    
    
    return (
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
            <Contents>
                
                <CenterView><TopIntro>수선증 정보</TopIntro></CenterView>
                <Label> 수선증 바코드</Label>
                <Input />
                <Label> 매장 접수일</Label>
                <Input  multiline={ true }/>
                <Label> 고객 약속일</Label>
                <Input  multiline={ true }/>
                <Label> 매장 발송일</Label>
                <Input  multiline={ true }/>
            
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