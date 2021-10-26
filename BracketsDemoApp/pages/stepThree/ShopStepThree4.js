import React from 'react';
import Contents from '../../components/Contents';
import ButtonBlack from '../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import store from '../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';

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
const InfoView =styled.View`
    width: 100%;
    border:2px solid  #78909c;
    border-radius:12px;
    
    padding:15px;
`;
const DropBackground= styled.View`
    width: 220px;
    border-radius:10px;
    font-color:#ffffff
`;


function ShopStepThree4({navigation}) {

    const FullPhotoUri =store.getState().picture;

    const List=[
        { label: '맥가이버', value: '맥가이버' },
        { label: '로보캅', value: '로보캅' },
        { label: '폴리', value: '폴리' }];
    
    const itemList=['맥가이버2','로보캅2','폴리2'];
    const List2 =[];
    if (itemList !==null){
        itemList.map(x => List2.push({label:x,value:x}));
        
    }
    const List0 = [{label:List2[0].label,value:List2[0].value}]
    
    const [select,setSelect] = React.useState();

    return (
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <Contents>
            <CenterView><TopIntro>수선 정보 확인</TopIntro></CenterView>
            <Label>수선 유형</Label>
            <InfoView>

            <Text>봉제</Text>
            
            <TopStateView>
                <Image style={{width:90, height:100}}
                                    source={{uri:FullPhotoUri}}/>
                <Image/>
            </TopStateView>

            <Label>추가 요청 사항</Label>
            <Input  multiline={ true }/>
            <Label>수선처</Label>
            <DropBackground><Picker
                    placeholder={{ label: '기본위치: '+List0[0].label }}
                    onValueChange={(value) => console.log(value)}
                    items={List2}
                /></DropBackground>
                
            </InfoView>

            <Label>수선 유형 추가</Label>
            <InfoView>
            <Picker
            placeholder = {{label : '[선택] 옵션을 선택하세요',value: null}}
            style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
            onValueChange={(value) => 
              setSelect(value)
            }
            items={[
                { label: '1.원단', value: 'Material' },
                { label: '2.봉제', value: 'Plush' },
                { label: '3.부자재', value: 'Subsidiary' },
                { label: '4.아트워크', value: 'Artwork' },
                { label: '5.액세서리', value: 'Accessories' },
                { label: '6.기타', value: 'etc' }
            ]}
            />
            </InfoView>
            <Label/>
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=>
                    
                    navigation.navigate( 'ShopStepFour' ) }>
                    다음
                </ButtonBlack>
            </CenterView>
        </ContainView>
    )
    
}

export default ShopStepThree4;