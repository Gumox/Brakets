import React from 'react';
import Contents from '../../components/Contents';
import styled from 'styled-components/native';
import Container from '../../components/Container';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import CenterText from '../../components/CenterText';
import ReceiptButton from '../../components/ReceiptButton';
import ContainView from '../../components/ContainView';
const Label = styled.Text`
    font-size: 15px;
    margin: 20px;
`;
const PView = styled.View`
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;

const CenterView =styled.View`
    align-items: center;
    
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

function ReceiptDivision({navigation}) {
   
    
    return (
        <Container>
            <Label/>
            <Label/>
            <TopIntro>접수 구분</TopIntro>
            <Label/>
            <ReceiptButton onPress={ ()=> 
                    navigation.navigate( 'ShopStepOne' ) }>고객용 제품</ReceiptButton>
            
            <ReceiptButton onPress={ ()=> 
                    navigation.navigate( 'ShopStepOne' ) }>매장용-선처리 제품</ReceiptButton>

            <ReceiptButton onPress={ ()=> 
                    navigation.navigate( 'ShopStepOne' ) }>매장용 제품</ReceiptButton>
            
            
            

        </Container>
    )
}

export default ReceiptDivision;