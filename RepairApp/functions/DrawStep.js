import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import store from "../store/store";

import {  Alert ,Touchable,ImageBackground,Image, View, StyleSheet, Modal, Text  } from "react-native";

import Button from '../components/Button';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
import ButtonBlack from '../components/ButtonBlack';
import ViewShot from "react-native-view-shot";

const CenterView =styled.View`
  flex:1;
  align-items: center;
`;


const BottomItemBox = styled.View`
  flex-direction: row;
  
  justify-content: space-around;
 
`;
const TouchableView = styled.TouchableHighlight`
    flex:1
    align-items: center;
    padding:10px
    background-color : #000000;
`;
const StepText = styled.Text`
  color : #FFFFFF
  font-size:15px
`;
const ContainerBlack = styled.View`
  
  flex :1
  align-items: center;
`;
const ImageView = styled.View`

  align-items: center;
`;

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function DrawStep ({ navigation ,route}) {

  const viewShot = React.useRef();
  
  const imgUri=route.params.image;

  const imgUri2 =store.getState().addRepairImageUri;

  console.log(" imgUri2 : "+ imgUri2 )
  const imageP = { uri: imgUri };
  var drawingImage
  const imageD = { uri: imgUri2 };
  
  console.log("has")
  drawingImage = (
    <View style={styles.image}>
      
      <Image source={imageP} resizeMode="cover" style={styles.image1}/>
      <Image source={imageD} resizeMode="cover" style={styles.image2}/>
      
    </View>
  )
  

  const capture = () =>{
    viewShot.current.capture().then(uri => {
      console.log('do something with ', uri);
      store.dispatch({type:'PHOTO',photo: uri});
    });
  }
  React.useEffect(() => {
    wait(250).then(() => {
      if(imgUri2 != ""){
        capture();
      }
    });
    console.log("??")
  }, [])

  

  return (
    <ContainerBlack>
      <ViewShot ref={viewShot} style ={styles.img} options={{format: 'jpg', quality: 0.9}}>
      
      {drawingImage}
      
      </ViewShot>
                    
      <BottomItemBox>

      <TouchableView underlayColor={"#CCC"} onPress={ ()=> {
          navigation.goback();
      }}><StepText>다시 그리기</StepText></TouchableView>
      <TouchableView  underlayColor={"#CCC"} onPress={()=> 
        {
          console.log(store.getState().photo)
          navigation.replace("RepairMore",{data:route.params.data})
        }
      }><StepText>사진 사용</StepText></TouchableView>
    
      </BottomItemBox>
  
    </ContainerBlack>

  );
}

const styles = StyleSheet.create({
    
    
  image: {
    flex:1,
    width: "100%",
    height:"100%",
    justifyContent: "center",
    
  },
  img: {
    flex:1,
    width: "100%",
    height:"100%",
    justifyContent: "center",
    alignItems: 'center',
    
  },
  image1: {
    width: "100%",
    height:"100%",
    justifyContent: "center",
    alignItems: 'center',
    position : 'absolute',
    left:0,
    top:0,
   
  },
  image2: {
    
    width: "100%",
    height:"100%",
    justifyContent: "center",
    alignItems: 'center',
    position : 'absolute',
    left:0,
    top:0,
   
  }
  
  });
export default DrawStep;