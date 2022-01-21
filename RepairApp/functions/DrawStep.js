import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import store from "../store/store";

import { Image, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";

import _ from 'lodash';
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
    min-height: 10%;
    width: 50%;
    align-items: center;
    padding:10px
    background-color : #000000;
    justify-content: center;
`;
const StepText = styled.Text`
  color : #FFFFFF;
  font-size:15px;
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

  const imageP = { uri: imgUri };
  var drawingImage
  const imageD = { uri: imgUri2 };

  const capture = () =>{
    viewShot.current.capture().then(uri => {
      store.dispatch({type:'PHOTO',photo: uri});
    });
  }
  React.useEffect(() => {
    wait(250).then(() => {
      if(imgUri2 != ""){
        capture();
      }
    });
  }, [])

  

  return (
    <>
      <SafeAreaView style={{flex: 0,backgroundColor: '#000'}}/>
      <ContainerBlack>
        <ViewShot ref={viewShot} style ={styles.img} options={{format: 'jpg', quality: 0.9}}>
          <View style={styles.image}>
          
          <Image source={imageP} resizeMode="cover" style={styles.image1}/>
          <Image source={imageD} resizeMode="cover" style={styles.image2}/>
          
          </View>
        
        </ViewShot>
                      
        <BottomItemBox>

          <TouchableView underlayColor={"#CCC"} onPress={ ()=> { navigation.goBack(); }}>
            <StepText>취소</StepText>
          </TouchableView>

          <TouchableView  underlayColor={"#CCC"} onPress={()=> 
            { navigation.replace("RepairMore",{data:route.params.data})
            }
          }><StepText>사진 사용</StepText></TouchableView>
      
        </BottomItemBox>
    
      </ContainerBlack>
    </>
    

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