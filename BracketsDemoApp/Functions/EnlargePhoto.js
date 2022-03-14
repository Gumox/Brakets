import React from "react";
import Container from "../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import { Image ,Pressable,View,Text,Dimensions,StyleSheet,BackHandler} from "react-native";
import styled from "styled-components";





const CloseBtn = styled.TouchableOpacity`
    width: 5%;
    height: 5%;
    position: absolute;
    right: 3%;
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
  

export default function EnlargePhoto({ navigation ,route}){
    const image =route.params.image
    console.log("111111111111111111111111111111")
    console.log(route.params.image)
    console.log("111111111111111111111111111111")
    React.useEffect(()=>{
       
        const backAction = () => {
            //store.dispatch({type:'PHOTORESET',setPhoto:[]});
            navigation.pop();
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => {
              backHandler.remove();
             
            }

    },[]);


    return(
        <Container style = {{backgroundColor : '#000000'}}>
            <View style={{margin:12}}>
                <CloseBtn
                    onPress={() => {
                        navigation.goBack()}}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    >
                    <Text
                        style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}
                    >X</Text>
                </CloseBtn>
                <View style={styles.centeredView}>
                            
                            <ImageZoom cropWidth={Dimensions.get('window').width-30}
                                    cropHeight={ Dimensions.get('window').height-125}
                                    imageWidth={Dimensions.get('window').width-40}
                                    imageHeight={ Dimensions.get('window').height-140}>
                                    <Image style={{width:Dimensions.get('window').width-40, height: Dimensions.get('window').height-140}}
                                    source={{uri:image}}/>
                            </ImageZoom>
                            
                        </View>
            
            </View>
        </Container>
    )
}