// npm i -S react-native-sketch 모듈 설치
// react-native link react-native-sketch

import React from 'react';
import { Alert, Button, View, ImageBackground,StyleSheet} from 'react-native';
import Sketch from 'react-native-sketch';
 
export default class MyPaint extends React.Component {

  save = () => {
    this.sketch.save().then(({ path }) => {
      Alert.alert('Image saved!', path);
    });
  };
 
  render() {
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
            
      </ImageBackground>
    )
  }
}