import React from "react";
import store from "../store/store";
import Container from "../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import { Image ,Pressable,View,Text,Dimensions,StyleSheet,BackHandler} from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import styled from "styled-components";



const BottomItemBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
 
`;

const TouchableView = styled.TouchableHighlight`
    flex:1
    align-items: center;
    padding:10px
    background-color : #000000;
`;

export default function AddPhotoControl({ navigation ,route}){
    const selected= route.params.img;
    const code =route.params.code;
    const saved = store.getState().needPhotos;
    const changeData =[];
    const DeletePhoto = () =>{
        saved.forEach(obj => {
            console.log(obj.photo)
            console.log(selected)
            if(selected !== obj.photo){
                changeData.push(obj)
                console.log("??")
            }
        });
        
        console.log(changeData)
        store.dispatch({type:"SET_NEED_PHOTOS",needPhotos: changeData});
        console.log(store.getState().needPhotos)
    }
    /*const RetakePhoto = () =>{
        console.log(  "value: " +selected.value+"    index: "+selected.index);
        if(selected.index>1){
            DeletePhoto();
        }else{
            store.dispatch({type:'DRAW',drawingImage: ""});
        }
        navigation.replace("TakePhoto",{key:"RetakePhoto",index:selected.index});

    }*/


    React.useEffect(()=>{

    },[]);


    return(
        <Container style = {{backgroundColor : '#000000'}}>
            
            <View >
                            
                <ImageZoom cropWidth={Dimensions.get('window').width-10}
                        cropHeight={ Dimensions.get('window').height-50}
                        imageWidth={Dimensions.get('window').width-10}
                        imageHeight={ Dimensions.get('window').height-10}>
                        <Image style={{width:Dimensions.get('window').width-10, height: Dimensions.get('window').height-50}}
                        source={{uri:selected}}/>
                </ImageZoom>
                
            </View>
            <BottomItemBox>
            <TouchableView underlayColor={"#CCC"} onPress ={ () =>{navigation.goBack();}}><Text style = {{color : "#ffffff"}}>확인</Text></TouchableView>
            <TouchableView underlayColor={"#CCC"}onPress ={ () =>{ {
                DeletePhoto();
                navigation.replace("RepairMore",{data:code});
                }}}><Text style = {{color : "#ffffff"}}>삭제 </Text></TouchableView>
            </BottomItemBox>
            
        </Container>
    )
}