// npm i -S react-native-sketch 모듈 설치
// react-native link react-native-sketch

import React, { useRef,Component } from 'react';
import { AppRegistry,Alert,Text,  View, ImageBackground,StyleSheet,TouchableOpacity} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import store from '../../store/store';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import Button from '../../components/Button';

  
import DrawBoard from './DrawBoard';


export default class ShopStepThree3 extends Component {
  render() {
      console.log(store.getState().photoArr[0]["value"]);
      console.log("");
      console.log("");
      console.log("");
      var imageUri = store.getState().photoArr[0]["value"];
      var imagePath  =imageUri.replace("file://", "")
      console.log(imagePath);
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: imageUri}} resizeMode="cover" style ={styles.image} > 
                <DrawBoard localSourceImagePath = {imagePath}  navigation={this.props.navigation}></DrawBoard>
                </ImageBackground>
            
            </View>
        )
    }
}



const styles = StyleSheet.create({
image: {
    flex:1,
    width: "100%",
    height:"100%",
    justifyContent: "center",
    alignItems: 'center',
    
   
    },
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:"#000000"
},
headerText: {
    fontSize: 5,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
},
strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
},
strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
},
functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
}
})
AppRegistry.registerComponent('example', () => ShopStepThree3);