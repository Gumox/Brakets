import React from 'react';
import Contents from '../../components/Contents';
import styled from 'styled-components/native';
import Container from '../../components/Container';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import CenterText from '../../components/CenterText';
import ReceiptButton from '../../components/ReceiptButton';
import ContainView from '../../components/ContainView';
import Bottom from '../../components/Bottom';
import store from '../../store/store';

const Label = styled.Text`
    font-size: 15px;
    margin: 20px;
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
    color:#000000;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#78909c;
    margin-Top:50px
`;
const GrayText = styled.Text`
    font-size: 20px;
    color:#858585;
`;
const TopStateView = styled.View`
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;

const BottomView = styled.View`
    flex: 0.4;
    flex-direction: row;
    align-items: flex-end;
    /* background: red; */
`;

const BottomButton = styled.TouchableOpacity`
    width: 25%;
    height: 30%;
    background: #78909c;
    border-color: red;
    align-items: center;
    justify-content: center;
`;

const BottomButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;

const BottomEmptySpace = styled.View`
    background: #78909c;
    width: 100%;
    height: 3%;
    border :0.6px solid #78909c;
`;


const TouchableView = styled.TouchableOpacity`
    
    flex-direction:row;
    justify-content:space-around;
    
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;

function ReceiptDivision({navigation}) {
   
    
    return (

        <Container>
            <Container>
            <Label/>
            <Label/>
            <TopIntro>접수 구분</TopIntro>
            <Label/>
            <ReceiptButton onPress={ ()=> {
                store.dispatch({type:'RECEPITION_DIVISION',receptionDivision: {name:"고객용",id:1}});
                console.log(store.getState().receptionDivision);
                navigation.navigate( 'SearchCustomer' ) }}>고객용 제품</ReceiptButton>
            
            <ReceiptButton onPress={ ()=> {
                store.dispatch({type:'RECEPITION_DIVISION',receptionDivision: {name:"선처리",id:2}});
                console.log(store.getState().receptionDivision);
                navigation.navigate( 'ShopStepOne' ) }}>매장용-선처리 제품</ReceiptButton>

            <ReceiptButton onPress={ ()=> {
                store.dispatch({type:'RECEPITION_DIVISION',receptionDivision:{name:"매장용",id:3} });
                console.log(store.getState().receptionDivision);
                navigation.navigate( 'ShopStepOne' ) }}>매장용 제품</ReceiptButton>
            </Container>
            <Bottom navigation={navigation}/>
        </Container>
        
    )
}

export default ReceiptDivision;