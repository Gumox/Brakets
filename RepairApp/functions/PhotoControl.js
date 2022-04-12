import React from "react";
import store from "../store/store";
import Container from "../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import { Image ,Pressable,View,Text,Dimensions,StyleSheet,BackHandler} from "react-native";
import styled from "styled-components";
import { SafeAreaView } from "react-native";



const ImgView = styled.View`
    width:100%
    height:45px
    align-items: center;
    flex-Direction: row-reverse;
    justify-content: space-between;
`;


const TouchableView = styled.TouchableHighlight`
    align-items: center;
    margin:10px;
    width:30px;
    height:30px;
    background-color : #000000;
`;
const StepText = styled.Text`
  color : #FFFFFF;
  font-size:15px;
`;
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    xView:{
        backgroundColor: "#78909c",
        borderRadius: 20,
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      paddingRight: 5,
      paddingLeft: 5,
      paddingTop: 15,
      paddingBottom: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
    }
  });
  

export default function PhotoControl({ navigation ,route}){
    const img = route.params.img
    const retake = route.params.retake
    let retakeView
    if(retake){
      retakeView=(
        <TouchableView underlayColor={"#CCC"} style={{borderRadius:5,width:50,justifyContent:"center",alignItems:"center"}} 
                       onPress ={ () =>{
                          navigation.navigate("TakePhoto",{key:retake.key,num:retake.num,data:retake.data})
                        }}>
          <Text style = {{color : "#ffffff",width:50}}>다시찍기</Text>
        </TouchableView>
      )
    }

    return(

      <>
      <SafeAreaView style={{flex: 0,backgroundColor: '#000'}}/>
      <Container style = {{backgroundColor : '#000000', padding: 10 }}>
            <ImgView>

            <TouchableView underlayColor={"#CCC"} style={{borderRadius:15,width:30,height:30,justifyContent:"center",alignItems:"center"}} onPress ={ () =>{navigation.goBack()}}>
                <Text style = {{color : "#ffffff",fontSize:20}}>✕</Text>
            </TouchableView>
            {retakeView}
            
            </ImgView>  
            <View >
                
                <ImageZoom cropWidth={Dimensions.get('window').width-10}
                        cropHeight={ Dimensions.get('window').height-20}
                        imageWidth={Dimensions.get('window').width-10}
                        imageHeight={ Dimensions.get('window').height-10}>
                        <Image style={{width:Dimensions.get('window').width-10, height: Dimensions.get('window').height-65}}
                        source={{uri:img}}/>
                </ImageZoom>
                
            </View>
        </Container>
        <SafeAreaView style={{flex: 0,backgroundColor: '#000'}}/>
      </>
        
    )
}