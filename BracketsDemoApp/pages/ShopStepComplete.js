import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import styled from 'styled-components/native';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../components/StateBarSolid';
import store from '../store/store';

const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;

const RegistText= styled.Text`
    font-weight: bold;
    font-size: 30px;
    margin-bottom:10px;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#78909c;
`;
const GrayText = styled.Text`
    font-size: 20px;
    color:#858585;
`;
const CompleteV = styled.View`
    margin-bottom:25px;
    height:50px;
    background-color:#78909c;
    width:50px;
    align-items: center;
    justify-content: center;
    border-radius:25px;
`;
const VText = styled.Text`
    font-size: 30px;
    align-items: center;
    color:#ffffff;
`;

const TopStateView = styled.View`
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;
const InfoView =styled.View`
    width: 70%;
    border:2px solid  #78909c;
    border-radius:12px;
    align-items: center;
    padding:15px;
    margin-bottom: 15px;
`;
const DataView = styled.View`
    width: 100%;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const BottomText = styled.Text`
    font-size: 15px;
    align-items: center;
`;

// 구조 분해 할당, Destructuring Assignment
function ShopStepOne( { navigation } ) {
    const [barcode, setBarcode] = React.useState(store.getState().cardValue);
    const [bag, setBag] = React.useState(store.getState().bagCodeValue);
    console.log(barcode);
    console.log(store.getState().cardValue);
    
    return (
        <Container>
            
            <CenterText>
                
                <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/></TopStateView>
                <CompleteV><VText>✓</VText></CompleteV>
                <RegistText>접수 완료</RegistText>
                <BlueText>수선 접수가 정상적으로 완료</BlueText>
                <GrayText>되었습니다</GrayText>

            </CenterText>
            
            <InfoView>
                <GrayText>서비스 카드 번호</GrayText>
                <DataView><Label>{barcode}</Label></DataView>
                <GrayText>보내는곳</GrayText>
                <DataView><Label></Label></DataView>
                <GrayText>행낭 바코드</GrayText>
                <DataView><Label>{bag}</Label></DataView>
            </InfoView>  
            <BottomText>자세한 내용은 마이페이지에서</BottomText>
            <BottomText>확인 가능합니다</BottomText>
            <Button onPress={ ()=> navigation.popToTop()}>
                완료
            </Button>
        </Container>
    )
}

export default ShopStepOne;