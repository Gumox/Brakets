import React ,{useCallback}from "react";
import store from "../store/store";
import Container from "../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import { Image ,Pressable,View,Text,Dimensions,StyleSheet,BackHandler} from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import styled from "styled-components";
import ip from "../serverIp/Ip";
import axios from "axios";


const BottomItemBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
  min-Height:50px;
 
`;

const TouchableView = styled.TouchableHighlight`
    flex:1
    align-items: center;
    padding:10px
    background-color : #000000;
    minHeight:50px;
`;

export default function AddPhotoControl({ navigation ,route}){
    const selected= route.params.img;
    const code =route.params.code;
    const saved = store.getState().needPhotos;
    const changeData =[];
    const DeletePhoto = () =>{
        console.log(saved)
        saved.forEach(obj => {
            if(selected !== obj.photo){
                changeData.push(obj)
            }else{

                if(obj.repair_need_id !== undefined){
                    deleteFunction(obj.repair_need_id)
                }
            }
        });

        
        store.dispatch({type:"SET_NEED_PHOTOS",needPhotos: changeData});
    }
    
    const deleteFunction = useCallback(async (id) => {
        const { data } = await axios.post(ip + `/api/needRepair/deleteNeedImage?repair_need_id=${id}`);
        console.log(data)
    });


    return(
        <Container style = {{backgroundColor : '#000000'}}>
            
            <View>
                            
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