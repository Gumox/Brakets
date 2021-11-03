// npm i -S react-native-sketch 모듈 설치
// react-native link react-native-sketch

import React, { useRef,Component } from 'react';
import { AppRegistry,Alert,Text,  View, ImageBackground,StyleSheet,TouchableOpacity} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import store from '../../store/store';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import Button from '../../components/Button';
export default function ShopStepThree3({navigation})  {
  
 
  
  const imgUri =store.getState().photoArr[0]["value"];
  
  const imageP = { uri: imgUri };
  
  const sketchCanvas = useRef()
  const styles = StyleSheet.create({

    image: {
      flex:1,
      width: "100%",
      height:"100%",
      justifyContent: "center"
    },
    
    
  });
  return (
    <ImageBackground source={imageP} resizeMode="cover" style={styles.image}>
      
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <SketchCanvas
          style={{ flex: 1 }}
          strokeColor={'red'}
          strokeWidth={7}
          ref={sketchCanvas}
          onSketchSaved={(success, filePath) => {
            alert(filePath)
            }}
        />
        
      </View>
      <Button onPress={()=>{sketchCanvas.current.save('jpg', 'folderName', 'fileName', true, true, true, false)}}>저장</Button>
    </ImageBackground>
  )
  
}
