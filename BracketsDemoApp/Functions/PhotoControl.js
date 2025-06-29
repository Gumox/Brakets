import React from "react";
import store from "../store/store";
import Container from "../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import { Image ,Pressable,View,Text,Dimensions,StyleSheet,BackHandler} from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import styled from "styled-components";



const ImgView = styled.View`
    margin:12px;
`;

const BottomItemBox = styled.View`
  flex-direction: row;
  
  justify-content: space-around;
 
`;

const TouchableView = styled.TouchableHighlight`
    flex:1
    align-items: center;
    padding:10px;
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
        backgroundColor: "rgb(0,80,130)",
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
    const changeData =[];
    const DeletePhoto = () =>{
        for (let i = 0; i < saved.length; i++) {
            const element = saved[i];
            if(element == selected.value){
                saved.splice(i,1);
                i--;
            }

        }
        store.dispatch({type:"PHOTORESET",setPhoto: saved});
        
    }
    const RetakePhoto = () =>{
        if(selected.index>1){
            DeletePhoto();
        }else{
            store.dispatch({type:'DRAW',drawingImage: ""});
        }
        navigation.replace("TakePhoto",{key:"RetakePhoto",index:selected.index});

    }
    var output;
    
    if(selected.index === 0 || selected.index ===1){
        output=(
            <BottomItemBox>
            <TouchableView underlayColor={"#CCC"} onPress ={ () =>{RetakePhoto()}}><Text style = {{color : "#ffffff"}}> 다시찍기</Text></TouchableView>
            <TouchableView underlayColor={"#CCC"}onPress ={ () =>{navigation.replace("ShopStepThree4");}}><Text style = {{color : "#ffffff"}}>확인 </Text></TouchableView>
            </BottomItemBox>

        );
    }else{
        output=(
            <BottomItemBox>
            <TouchableView underlayColor={"#CCC"} onPress ={ () =>{RetakePhoto()}}><Text style = {{color : "#ffffff"}}> 다시찍기</Text></TouchableView>
            <TouchableView underlayColor={"#CCC"} onPress ={ () =>{navigation.replace("ShopStepThree4");}}><Text style = {{color : "#ffffff"}}>확인</Text></TouchableView>
            <TouchableView underlayColor={"#CCC"}onPress ={ () =>{ {
                DeletePhoto();
                navigation.replace("ShopStepThree4");}}}><Text style = {{color : "#ffffff"}}>삭제 </Text></TouchableView>
            </BottomItemBox>
        );
    }


    React.useEffect(()=>{
       
        const backAction = () => {
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
            <ImgView  >
            <View style={styles.centeredView}>
                            
                            <ImageZoom cropWidth={Dimensions.get('window').width-30}
                                    cropHeight={ Dimensions.get('window').height-125}
                                    imageWidth={Dimensions.get('window').width-40}
                                    imageHeight={  (Dimensions.get('window').width-40)/3*4}>
                                    
                                    <Image style={{width:Dimensions.get('window').width-40, height: (Dimensions.get('window').width-40)/3*4}}
                                    source={{uri:selected.value}}/>
                            </ImageZoom>
                            
                        </View>
                {output}
            
            </ImgView>
        </Container>
    )
}