import React from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import store from "../../store/store";

import { Touchable,ImageBackground,Image, View, StyleSheet, Modal, Text } from "react-native";


import Button from '../../components/Button';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import ButtonBlack from '../../components/ButtonBlack';

const CenterView =styled.View`
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
function ShopStepThree2 ({ navigation ,route}) {

  const [modalVisible, setModalVisible] = React.useState(false);

  const imageArray =store.getState().photoArr;

  //console.log(imageArray[0]);
  
  const [imgUri,setImageUri] =React.useState();

  React.useEffect(()=>{
    if(route.params === undefined){
      //console.log("at 3-1")
      setImageUri(store.getState().photoArr[0]["value"]);

    }else if( route.params.key === "CloseShot"){
      console.log("CloseShot");
      var indexUriList = [];
      //console.log(indexUriList);
      imageArray.forEach(element => {
                if(element.key == store.getState().indexNumber){
                    indexUriList.push(element);
                    //console.log(indexUriList);
                }
            });
      
      setImageUri(indexUriList[0]["value"]);
    }  
  },[]);
  
  const imageP = { uri: imgUri };

  const styles = StyleSheet.create({
    
    
    image: {
      flex:1,
      width: "100%",
      height:"100%",
      justifyContent: "center"
    },

  });
  return (
    <Container>
     
                                  
        
          <ImageBackground source={imageP} resizeMode="cover" style={styles.image}>
            
          </ImageBackground>
          <BottomItemBox>

          <TouchableView onPress={ ()=> navigation.replace( 'TakePhoto', {key : 'ShopStepThree2' } )}><StepText>다시 찍기</StepText></TouchableView>
          <TouchableView onPress={()=> navigation.replace('ShopStepThree3')}><StepText>그리기</StepText></TouchableView>
          <TouchableView onPress={()=> 
          { 
            if(route.params === undefined){
              navigation.replace('TakePhoto', {key : 'ShopStepThree4'}); 
            }
            else if( route.params.key === "CloseShot"){
              console.log("CloseShot");
               navigation.replace('TakePhoto', {key :route.params.key,value:route.params.value }); 
            
            }
          }
          }><StepText>사진 사용</StepText></TouchableView>

          </BottomItemBox>
      
    </Container>

  );
}


export default ShopStepThree2;