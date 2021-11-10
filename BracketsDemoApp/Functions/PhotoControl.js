import React from "react";
import store from "../store/store";
import Container from "../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import { Image ,Pressable,View,Text} from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";

export default function PhotoControl({ navigation ,route}){
    const [selected,setSelected] = React.useState( route.params);

    const saved = store.getState().photoArr;

    const changeData =[];
    const DeletePhoto = () =>{
        for (let i = 0; i < saved.length; i++) {
            const element = array i;
            if(element.value == selected.value){
                saved.splice(i,1);
                i--;
            }

        }
        console.log(saved);
    }
    const RetakePhoto = () =>{

    }
    return(
        <Container>
            <View  >
                
                <ImageZoom cropWidth={320}
                        cropHeight={400}
                        imageWidth={300}
                        imageHeight={400}>
                        <Image style={{width:300, height:400}}
                        source={{uri:selected.value}}/>
                </ImageZoom>
                <Pressable><Text>다시찍기</Text></Pressable>
                <Pressable ><Text>확인</Text></Pressable>
                <Pressable><Text>삭제</Text></Pressable>
            </View>
        </Container>
    )
}