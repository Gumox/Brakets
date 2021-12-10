import React from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import store from "../../store/store";

import { Touchable,ImageBackground,Image, View, StyleSheet, Modal, Text  } from "react-native";


import Button from '../../components/Button';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import ButtonBlack from '../../components/ButtonBlack';


const CenterView =styled.View`
  flex:1;
  align-items: center;
`;


const BottomItemBox = styled.View`
  flex-direction: row;
  width:100%
  justify-content: space-between;
  background-color : #000000;
  margin-left : 20px;
  margin-right : 20px;
`;
const TouchableView = styled.TouchableOpacity`
    margin:10px
`;
const StepText = styled.Text`
  color : #FFFFFF
  font-size:15px
`;
const ContainerBlack = styled.View`
  background-color : #000000;
  flex :1
  align-items: center;
`;

function ShopStepThree2 ({ navigation ,route}) {

  const [modalVisible, setModalVisible] = React.useState(false);

  const imageArray =store.getState().photoArr;

  
  const [imgUri,setImageUri] =React.useState(store.getState().photo);
  console.log('in shop step 3 -2')
  
  React.useEffect(()=>{
    //setImageUri(store.getState.photo);
  },[]);

  
  const imageP = { uri: imgUri };

  const styles = StyleSheet.create({
    
    
    image: {
      flex:1,
      width: "95%",
      height:"95%",
      justifyContent: "center",
      margin:10,
    },

  });
  return (
    <ContainerBlack>
     
                                  
      
      <Image source={imageP} resizeMode="cover" style={styles.image}/>
           
      <BottomItemBox>

      <TouchableView onPress={ ()=> {
        store.dispatch({type:'PHOTORESET',setPhoto:[]});
        navigation.replace( 'TakePhoto', {key : 'ShopStepThree2' } )}}><StepText>다시 찍기</StepText></TouchableView>
      <TouchableView onPress={()=>{ 
       
        
        if(route.params === undefined){
          navigation.replace('ShopStepThree3')
        }
        else if(route.params.toGo=== "PhotoControl"){
          const params = route.params; 
          console.log(params);
          navigation.replace('ShopStepThree3',{index: 0, key: 0, toGo: 'PhotoControl', value: route.params.value});
        }
        
        }}><StepText>그리기</StepText></TouchableView>
      <TouchableView onPress={()=> 
      { 
        console.log(route.params);
        if(route.params === undefined){
          
          navigation.replace('TakePhoto', {key : 'ShopStepThree4'}); 
        }
        else if( route.params.key === "CloseShot"){
          console.log("CloseShot");
          navigation.replace('TakePhoto', {key :route.params.key,value:route.params.value ,index :route.params.index,toGo:route.params.toGo}); 
        
        }
        else if(route.params.toGo=== "PhotoControl"){
          console.log(route.params);
          //navigation.replace('PhotoControl', {key :route.params.key,value:route.params.value }); 
        }
      }
      }><StepText>사진 사용</StepText></TouchableView>
    
      </BottomItemBox>
  
    </ContainerBlack>

  );
}


export default ShopStepThree2;