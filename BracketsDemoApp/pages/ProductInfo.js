import React from 'react';
import Contents from '../components/Contents';
import Button from '../components/Button';
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
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;


function ProductInfo({navigation}) {
   
    
    return (
        <ContainView>
            <Contents>
                <TopStateView><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
                <CenterView><TopIntro>제품 정보</TopIntro></CenterView>
                <Label>제품 바코드 / QR코드 번호</Label>
                <Input  multiline={ true }/>
                <Label>품번</Label>
                <Input  multiline={ true }/>
                <Label>제품명</Label>
                <Input  multiline={ true }/>
                <Label>시즌</Label>
                <Input  multiline={ true }/>
                <PrView>
                    <View>
                        <Label>컬러</Label>
                        <Input  multiline={ true }/>
                        <Label>사이즈</Label>
                        <Input  multiline={ true }
                            style={{ width: 150 }}/>
                        <Label>차수</Label>
                        <Input  multiline={ true }
                            style={{ width: 150 }}/>
                    </View>
                    <ContainImg>
                        <Image 
                            style={{width:150,height:180}}/>
                    </ContainImg>
                </PrView>
            </Contents>
            <CenterView>
                <Button  onPress={ ()=> navigation.navigate( 'ShopStepTwo' ) }>
                    다음: 2단계
                </Button>
            </CenterView>
        </ContainView>
    )
}

export default ProductInfo;