import ViewShot from "react-native-view-shot";

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import store from '../store/store';
import styled from "styled-components";
import Container from "../components/Container";


const BottomItemBox = styled.View`
  flex-direction: row;
  width:100%
  justify-content: space-around;
  background-color : #000000;
`;

const TouchableView = styled.TouchableOpacity`
    margin-bottom:10px
`;
const StepText = styled.Text`
  color : #FFFFFF
  font-size:15px
`;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export default class Capture extends Component{
    componentDidMount () {
       
    }
    render() {
        const imageUri = store.getState().photo;
        const imageUri2 = store.getState().drawingImage;
    return (
        <Container>
        <ViewShot ref="viewShot" style ={styles.img}>
            <Image  source={{ uri: imageUri}} resizeMode="cover" style ={styles.image}/>
            <Image  source={{ uri: imageUri2}} resizeMode="cover" style ={styles.image2}/>
            
        </ViewShot>
        <BottomItemBox>
            <TouchableView onPress={ ()=> {
            store.dispatch({type:'PHOTORESET',setPhoto:[]});
            store.dispatch({type:'DRAW',drawingImage: ""});
            navigation.replace("TakePhoto",{key:"RetakePhoto",index:selected.index});
            }}>
            <StepText>다시 찍기</StepText>
            </TouchableView>
            
            <TouchableView onPress={()=> 
                { this.refs.viewShot.capture().then(uri => {
                    console.log("do something with ", uri);
                    store.dispatch({type:'PHOTO',photo: uri});
                    wait(250).then(() => {
        
                        this.props.navigation.replace('PhotoControl',{index: 0,value: uri});
                    });
                });}
                }>
            <StepText>사진 사용</StepText>
            </TouchableView>
        </BottomItemBox>
      </Container>

    );
    }
}
const styles = StyleSheet.create({
    img: {
        flex:1,
        width: "100%",
        height:"100%",
        justifyContent: "center",
        alignItems: 'center',
        
       
    },
    image: {
        width: "100%",
        height:"100%",
        justifyContent: "center",
        alignItems: 'center',
        position : 'absolute',
        left:0,
        top:0,
       
    },
    image2: {
        
        width: "100%",
        height:"100%",
        justifyContent: "center",
        alignItems: 'center',
        position : 'absolute',
        left:0,
        top:0,
       
    }
})