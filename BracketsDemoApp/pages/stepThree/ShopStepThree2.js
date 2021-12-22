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
import ViewShot from "react-native-view-shot";

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
const ImageView = styled.View`

  align-items: center;
`;

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function ShopStepThree2 ({ navigation ,route}) {


  const imageArray =store.getState().photoArr;

  const viewShot = React.useRef();
  
  const imgUri=store.getState().photo;

  const imageUri = store.getState().photo;
  const imageUri2 = store.getState().drawingImage;



  const imgUri2 =store.getState().drawingImage;

  console.log(" imgUri2 : "+ imgUri2 )
  const imageP = { uri: imgUri };
  var drawingImage
  const imageD = { uri: imgUri2 };
  if (imgUri2 != ""){
    console.log("has")
    drawingImage = (
      <View style={styles.image}>
        
        <Image source={imageP} resizeMode="cover" style={styles.image1}/>
        <Image source={imageD} resizeMode="cover" style={styles.image2}/>
       
      </View>
    )
  }else{
    console.log("no")
    drawingImage = (
      <Image source={imageP} resizeMode="cover" style={styles.image}/>
    );
  }

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
    //capture();
  }, [])

  

  return (
    <ContainerBlack>
      <ViewShot ref={viewShot} style ={styles.img} options={{format: 'jpg', quality: 0.9}}>

      {drawingImage}
      
      </ViewShot>
                    
      <BottomItemBox>

      <TouchableView onPress={ ()=> {
        store.dispatch({type:'PHOTORESET',setPhoto:[]});
        store.dispatch({type:'DRAW',drawingImage: ""});
        navigation.replace( 'TakePhoto', {key : 'ShopStepThree2' } )}}><StepText>다시 찍기</StepText></TouchableView>
      <TouchableView onPress={()=>{ 
        
        if(route.params === undefined){
          navigation.navigate('ShopStepThree3')
        }
        else if(route.params.toGo=== "PhotoControl"){
          const params = route.params; 
          console.log(params);
          navigation.replace('ShopStepThree3',{index: 0, key: 0, toGo: 'PhotoControl', value: route.params.value});
        }
        
        }}><StepText>그리기</StepText></TouchableView>
      <TouchableView onPress={()=> 
      { 
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

const styles = StyleSheet.create({
    
    
  image: {
    flex:1,
    width: "99%",
    height:"99%",
    margin :10,
    justifyContent: "center",
    margin:10,
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
export default ShopStepThree2;