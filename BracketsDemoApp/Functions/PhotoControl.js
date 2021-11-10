import React from "react";
import store from "../store/store";
import Container from "../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import { Image ,Pressable,View,Text,Dimensions,StyleSheet} from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import styled from "styled-components";


const PView = styled.View`
    
    flex-direction: row;
    padding-bottom:24px;
    justify-content: space-between;
`;
const ImgView = styled.View`
    margin:12px;
`;
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
    const [selected,setSelected] = React.useState( route.params);

    const saved = store.getState().photoArr;
    console.log(saved);
    const changeData =[];
    const DeletePhoto = () =>{
        for (let i = 0; i < saved.length; i++) {
            const element = saved[i];
            if(element.value == selected.value){
                saved.splice(i,1);
                i--;
            }

        }
        console.log(store.getState().photoArr);
        store.dispatch({type:"PHOTORESET",setPhoto: saved});
        console.log(store.getState().photoArr);
        navigation.replace("ShopStepThree4");
    }
    const RetakePhoto = () =>{

    }
    return(
        <Container>
            <ImgView  >
            <View style={styles.centeredView}>
                        <View style ={styles.xView} >    
                        <View style={styles.modalView} >
                            
                            <ImageZoom cropWidth={320}
                                    cropHeight={400}
                                    imageWidth={300}
                                    imageHeight={400}>
                                    <Image style={{width:300, height:400}}
                                    source={{uri:selected.value}}/>
                            </ImageZoom>
                            
                        </View>
                        </View>
                        </View>
                <PView>
                <Pressable><Text>다시찍기</Text></Pressable>
                <Pressable ><Text>확인</Text></Pressable>
                <Pressable onPress ={ () =>{ DeletePhoto()}}><Text>삭제</Text></Pressable>
                </PView>
            
            </ImgView>
        </Container>
    )
}