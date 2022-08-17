import React,{useRef,useEffect} from "react";
import styled from "styled-components";
import store from "../../../store/store";

import {  Alert ,Image, View, StyleSheet } from "react-native";


import _ from 'lodash';
import ViewShot from "react-native-view-shot";

const CenterView =styled.View`
  flex:1;
  align-items: center;
`;


const BottomItemBox = styled.View`
  flex-direction: row;
  height:10%;
  justify-content: space-around;
  align-items: center;
  background-color : #000000;
`;
const TouchableView = styled.TouchableHighlight`
    flex:1;
    height:100%;
    align-items: center;
    justify-content: center;
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
function ShopStepThree2 ({ navigation ,route}) {

  const viewShot = useRef();
  
  const imgUri=store.getState().photo;

  const imgUri2 =store.getState().drawingImage;

  const imageP = { uri: imgUri };
  let drawingImage
  const imageD = { uri: imgUri2 };
  if (imgUri2 != ""){
    drawingImage = (
      <View style={styles.image}>
        
        <Image source={imageP} resizeMode="cover" style={styles.image1}/>
        <Image source={imageD} resizeMode="cover" style={styles.image2}/>
       
      </View>
    )
  }else{
    //console.log("no")
    drawingImage = (
      <Image source={imageP} resizeMode="cover" style={styles.image}/>
    );
  }

  const capture = () =>{
    viewShot.current.capture().then(uri => {
      //console.log('do something with ', uri);
      store.dispatch({type:'PHOTO',photo: uri});
    });
  }
  useEffect(() => {
    wait(350).then(() => {
      if(imgUri2 != ""){
        capture();
      }
    });
  }, [])

  

  return (
    <ContainerBlack>
      <ViewShot ref={viewShot} style ={styles.img} options={{format: 'jpg', quality: 0.9}}>
      
      {drawingImage}
      
      </ViewShot>
                    
      <BottomItemBox>

        <TouchableView underlayColor={"#CCC"} onPress={ ()=> {
          store.dispatch({type:'PHOTORESET',setPhoto:[]});
          store.dispatch({type:'DRAW',drawingImage: ""});
          navigation.replace( 'TakePhoto', {key : 'ShopStepThree2' } )}}><StepText>다시 찍기</StepText></TouchableView>
        <TouchableView underlayColor={"#CCC"} onPress={()=>{ 
          
          if(route.params === undefined){
            navigation.replace('ShopStepThree3')
          }
          else if(route.params.toGo=== "PhotoControl"){
            navigation.replace('ShopStepThree3',{index: 0, key: 0, toGo: 'PhotoControl', value: route.params.value});
          }
          
          }}><StepText>그리기</StepText></TouchableView>
        <TouchableView  underlayColor={"#CCC"} onPress={()=> 
        { 
          if(imgUri2 != ""){
            if(route.params === undefined){
              
              navigation.replace('TakePhoto', {key : 'ShopStepThree4'}); 
            }
            else if(route.params.toGo=== "PhotoControl"){
              //console.log(route.params);
              //navigation.replace('PhotoControl', {key :route.params.key,value:route.params.value }); 
            }
          }else{
            Alert.alert(
              "",
              "수선 부위를 표시해 주세요",
              [
                {
                  text: "취소",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "확인", onPress: () => console.log("OK Pressed") }
              ]
            );
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
export default ShopStepThree2;