// npm i -S react-native-sketch 모듈 설치
// react-native link react-native-sketch

import React, { useRef,Component } from 'react';
import { AppRegistry,Alert,Text,  View, ImageBackground,StyleSheet,TouchableOpacity ,TouchableHighlight ,Modal ,Pressable, ScrollView} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import store from '../../../store/store';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import Button from '../../../components/Button';

  
import DrawBoard from './DrawBoard';


export default function ShopStepThree3 ({navigation ,route}) {
 
    console.log(store.getState().photo);
    console.log("");
    console.log("");
    console.log("");
    const  params = route.params;
    console.log(params)
    console.log("");
    console.log("");
    console.log("");

    var imageUri = store.getState().photo;

    /*const imageArray =store.getState().photoArr;
    
    imageArray.forEach(obj => {
    if(obj.index === 0){
        imageUri = obj.value; 
    } 
    });*/
    
    var imagePath  =imageUri.replace("file://", "");
    const [color,setColor] = React.useState("#ff0000");
    const [modalVisible, setModalVisible] = React.useState(false);
    console.log(imagePath);
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: imageUri}} resizeMode="cover" style ={styles.image} > 
            
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                
                <View style ={{width : "100%" }}>
                <ScrollView horizontal ={true} style={{ flexDirection: 'row' ,backgroundColor : "#eFeFeF",height: 50 , borderRadius:5 ,margin: 10 }}>
                    
                    <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: '#FFFFFF' ,margin:10}} onPress={() => {
                        setColor( "#FFFFFF");
                    }}><Text/></TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: '#CCCFFF' ,margin:10}} onPress={() => {
                        setColor( "#CCCFFF");
                    }}><Text/></TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: '#0000FF',margin:10}} onPress={() => {
                        setColor( "#0000ff");
                    }}><Text/></TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: '#FF0000',margin:10}} onPress={() => {
                        setColor( "#FF0000");
                    }}><Text/></TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: '#00FF00',margin:10}} onPress={() => {
                        setColor( "#00ff00");
                    }}><Text/></TouchableHighlight>
                    
                    <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: '#FFFA38',margin:10}} onPress={() => {
                        setColor( '#FFFA38');
                    }}><Text/></TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: '#999999',margin:10}} onPress={() => {
                        setColor( "#999999");
                    }}><Text/></TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: '#000000',margin:10}} onPress={() => {
                        setColor( "#000000");
                    }}><Text/></TouchableHighlight>

                </ScrollView>
                </View>
                <Pressable style ={{width : "100%" ,height: "100%"}}  onPress={() => {
                setModalVisible(!modalVisible)}}>
                </Pressable>
            </Modal>
            
            <View style={{ flexDirection: 'row', width:35,height:35, borderRadius :17.5 ,backgroundColor :"#ffffff" , justifyContent: "center",alignItems: 'center',}}>
            <TouchableHighlight underlayColor={"#CCC"} style={{ width:30,height:30, borderRadius :15 , backgroundColor: color}} onPress={() => {
                setModalVisible(!modalVisible)
                }}><Text></Text></TouchableHighlight>
            </View>
            <DrawBoard localSourceImagePath = {imagePath}  navigation={navigation}>{color}{params}</DrawBoard>
            </ImageBackground>
            
        
        </View>
    )

}



const styles = StyleSheet.create({
image: {
    flex:1,
    width: "100%",
    height:"90%",
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