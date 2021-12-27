import React,{useEffect} from 'react';
import Contents from '../../components/Contents';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions,ScrollView,BackHandler, Touchable} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import store from '../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';
import _ from 'lodash';
import ShopStepFour2 from '../ShopStepFour2';
import TopInfo from '../../components/TopInfo';
import Bottom from '../../components/Bottom';

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

const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
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

const Input = styled.Text`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
`;
const SendText = styled.Text`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;

function ShopStepThree4({route,navigation}) {
    const uriList=[];
    const [text,setText] = React.useState('');

    const indexSort =uriList.sort(function (a,b) {
        return a.index -b.index;
    })
    const photoUri=[];
    indexSort.forEach(obj=> {
        if(obj.key === 0){
            photoUri.push(obj);
        }
    });
    
    const selectedType = store.getState().selectType[0].value; 

    
    React.useEffect(()=>{
        const backAction = () => {
            
           
            navigation.goBack();
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => {
              backHandler.remove();
              
            }

    },[]);
    var output=[];
    var inputTexts = store.getState().addRequest;
    console.log(inputTexts);
        for (var i = 0 ;i < store.getState().indexNumber+1; i++) {
            
            const [request,setRequet] =React.useState();
            const keySelectedType = store.getState().selectType[i].value;
            console.log(i+":get: "+keySelectedType);
        
            React.useEffect(()=>{
              
                //getAplStore(keySelectedType,i);
                //console.log(store.getState().typeStore);
                console.log(myKey+':'+inputTexts[myKey])
                if(inputTexts[myKey] == undefined){
                    setRequet("없음")
                }else{
                    setRequet(inputTexts[myKey]);
                }
            },[]);
            
            const cBasicLavel = store.getState().basicRepairStore[i];
           
            var indexUriList =[];
            var photoImages =[];
            
            uriList.push(store.getState().photo);
            uriList.push(store.getState().detailPhoto);
            var photoOutput= [];
            var photoAdd;
            if(store.getState().photoArr.length>0){
                const addPhotos = store.getState().photoArr;
                console.log(addPhotos);
                for (let i = 0; i < addPhotos.length; i++) {
                
                    uriList.push(addPhotos[i]);
                }
                
            }
                 
           
            uriList.forEach(element => {
                
                indexUriList.push(element);
                console.log(element)
                
            });
            for(var j=0; j < indexUriList.length ; j++){
                var photoImage =(
                    <Image  key = {j} style={{width:90, height:100,marginLeft:3}}source={{uri:indexUriList[j]}}/>
                );
                photoImages[j] =(photoImage);
            }
            
            
            const myKey = i;
            var tempItem=  (
                <View key ={myKey} >
                   
                    <InfoView>
                        <Label>{keySelectedType}</Label>
                        
                        <ScrollView horizontal ={true} style={{marginLeft:8,marginRight:8,marginTop:5,marginBottom:5}}>
                                {photoImages}
                        </ScrollView>

                        <Label>추가 요청 사항</Label>
                        <Input  
                            multiline={ true }
                            >{request}</Input> 
                        <Label>수선처</Label>
                        <SendText>{store.getState().basicRepairStore}</SendText>
                    </InfoView>
                    
                </View>
            );
            output[i] = (tempItem);

        }
    
    
    return (
        
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <TopInfo></TopInfo>
            <Contents>
            <CenterView><TopIntro>수선 정보 확인</TopIntro></CenterView>
            

            
            {output}
            <Label/>
            </Contents>
            <CenterView>
                <Button onPress={ ()=>
                    
                    navigation.navigate( 'ScanScreen',{key:'ShopStepFour2'} ) }>
                    4단계: 서비스 바코드 스캔 
                </Button>
            </CenterView>
            <Bottom navigation={navigation}/>
        </ContainView>
    )
    
}

export default ShopStepThree4;