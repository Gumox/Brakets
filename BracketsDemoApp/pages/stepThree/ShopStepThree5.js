import React,{useEffect} from 'react';
import Contents from '../../components/Contents';
import ButtonBlack from '../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions,ScrollView,BackHandler, Touchable} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import store from '../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';
import _ from 'lodash';

const RetakeView = styled.TouchableOpacity`
    padding:3px;
    background-color:#0000ff;
    border-radius:10px;
`;
const DeleteView = styled.TouchableOpacity`
    padding:3px;
    background-color:#ff0000;
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
const ContainImg =styled.TouchableOpacity`
    border:2px
    justify-content: center;
    align-items: center;
    width:75px;
    height:100px;
    margin-Left:3px;
`;
const AddTypeDleleteView =styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const DeleteButton = styled.TouchableOpacity`

`;
const ModalInsideOptionsView =styled.View`
    margin-Top:10px;
    width: 300px;
    flex-direction: row;
    justify-content: space-around;
`;


function ShopStepThree4({route,navigation}) {

    const [text,setText] = React.useState('');

    const uriList=store.getState().photoArr;
    const indexSort =uriList.sort(function (a,b) {
        return a.index -b.index;
    })
    const photoUri=[];
    indexSort.forEach(obj=> {
        if(obj.key === 0){
            photoUri.push(obj);
        }
    });
    
    
    console.log("++++++++++++++++++++++");
    console.log("?"+indexSort);
    //console.log(uriList.sort);
    const selectedType = store.getState().selectType[0].value; 
    
    console.log(uriList);
    console.log("");
   
    React.useEffect(()=>{
        getAplStore(selectedType,0);  
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
    // 수선유형 추가하면 쌓이는 부분 //
    var output=[];
    var chlidDataList = [];
    var inputTexts = [];
    if(store.getState().indexNumber>0){
        for (var i = 0 ;i < store.getState().indexNumber+1; i++) {
            
            const keySelectedType = store.getState().selectType[i].value;
            console.log(i+":get: "+keySelectedType);
        
            React.useEffect(()=>{
              
                //getAplStore(keySelectedType,i);
                console.log(store.getState().typeStore)
            },[]);
            
            const cList=[] ;
            cList.push(store.getState().typeStore[i-1][0]);
            const cBasicLavel = store.getState().basicRepairStore[i];
           
            var indexUriList =[];
            var photoImages =[];
            uriList.forEach(element => {
                if(element.key == i){
                    indexUriList.push(element);
                   
                }
            });
            for(var j=0; j < indexUriList.length ; j++){
                var photoImage =(
                    <Image  key = {j} style={{width:90, height:100,marginLeft:3}}source={{uri:indexUriList[j].value}}/>
                );
                photoImages[j] =(photoImage);
            }
            const myKey = i;
            console.log("025852025852:   "+myKey);
            console.log(cList);
            var tempItem=  (
                <View key ={myKey} >
                    <Label/>
                    <InfoView>
                       
                        <Text>{keySelectedType}</Text>
                        
                        <ScrollView horizontal ={true} style={{marginLeft:8,marginRight:8,marginTop:5,marginBottom:5}}>
                                {photoImages}
                        </ScrollView>

                        <Label>추가 요청 사항</Label>
                        <Input  
                            multiline={ true }
                            
                            onChangeText={ value => inputTexts[myKey] =( value)  }/>
                        <Label>수선처</Label>
                        <Picker
                            key ={myKey}
                            placeholder={{ label: '기본위치: ' + cBasicLavel }}
                            style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
                            onValueChange={(value) => console.log(value)}
                            items={cList}
                        />
                        </InfoView>
                
                </View>
            );
            output[i] = (tempItem);

        }
    }
    
    return (
        
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <Contents>
            <CenterView><TopIntro>수선 정보 확인</TopIntro></CenterView>
            <Label>총 {store.getState().indexNumber+1}개</Label>

            
            {output}
            <Label/>
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=>
                    {console.log(" : "+text);
                     console.log(" :? ");
                     console.log(inputTexts);
                    }
                /*navigation.navigate( 'ShopStepThree5' )*/ }>
                    다음
                </ButtonBlack>
            </CenterView>
        </ContainView>
    )
    
}

export default ShopStepThree4;