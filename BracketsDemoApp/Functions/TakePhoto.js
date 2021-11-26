import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Dimensions,
  Image,
  Vibration
  } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Container from '../components/Container';
import { RNCamera } from 'react-native-camera';
import store from '../store/store';
import Button from '../components/Button';
import styled from 'styled-components';

import { NavigationContainer } from '@react-navigation/native';

import { stubArray } from 'lodash';

//카메라 멘트 정렬
const CameraView = styled.View` 
  flex : 1;
  align-items : center;
  justify-content : center;
`;

const CameraButton = styled.View`
  flex : 1;
  align-items:center;
  background-color : black;
`;
const Take = styled.View`
  width : 70px;
  height : 70px;
  border-radius : 50px;
  background-color : white;
  
`;

const Touch  = styled.TouchableOpacity`
`;

const Label = styled.Text`
  text-align : center;
  color : white;
  font-size : 12px;
`;
const PressButton = styled.View`
  flex : 1;
  flex-direction : row;
  justify-content : space-between;
  align-items : center;
  
`;
const CancelView = styled.View`
  flex : 1;
  align-items : flex-start;
  justify-content : center;
  padding : 10px;
`;
const CancelText = styled.Text`
  color : white;
  margin-right : 10px;
`;
const ImgIcon =styled.Image`
    width: 30px;
    height: 30px;
    border-radius : 50px;
    background-color : gray;
`;
const ChangeView = styled.View`
  flex : 1;
  align-items : flex-end;
  justify-content : center;
  padding-right :10px;
`;


export default class TakePhoto extends Component {
  

  onSuccess = async (e) => {
  const {route}=this.props;

  console.log("to go: "+route.params.key);


    //console.log("go");
    if (this.camera) {
      const options = { quality: 0.9, base64: true, skipProcessing: true }
      const data = await this.camera.takePictureAsync(options); // this is photo data with file uri and base64
      const imgUri = data.uri;
     
      
      console.log (imgUri);
      console.log(store.getState().photoArr);

      if (route.params.key === 'ShopStepThree2'){
        //console.log ("ShopStepThree2: "+route.params.key);
        store.dispatch({type:'ADD',add: {key:0,value:imgUri,index:0}});
        
        this.props.navigation.replace(route.params.key);
      }
      else if (route.params.key === 'ShopStepThree4'){
        //console.log ("ShopStepThreeX: "+route.params.key);
          
        store.dispatch({type:'ADD',add: {key:0,value:imgUri,index:1}});
        

        this.props.navigation.replace(route.params.key);
      } 
      else if(route.params.key === "FullShot") {
        //console.log(route.params.value);
        const addPhoto = {key: route.params.value,value:imgUri,index:0};
       
        console.log(addPhoto);
        store.dispatch({type:'ADD',add: addPhoto});
        
        console.log(store.getState().photoArr);
        this.props.navigation.replace("ShopStepThree2",{key:"CloseShot",value:route.params.value});

      }
      else if(route.params.key==="CloseShot"){
        
        const addPhoto = {key: route.params.value,value:imgUri,index:1};
        
        //console.log(addPhoto);
        store.dispatch({type:'ADD',add: addPhoto});
        this.props.navigation.pop();
        this.props.navigation.replace("ShopStepThree4",{value:route.params.value});
      }
      else if(route.params.key === "AddPhoto"){
        const addPhoto = {key: route.params.value,value:imgUri,index: route.params.index};
        
        //console.log(addPhoto);
        store.dispatch({type:'ADD',add: addPhoto});
        this.props.navigation.pop();
        this.props.navigation.replace("ShopStepThree4",{value:route.params.value});
      }
      else if(route.params.key === "RetakePhoto"){
        const addPhoto = {key: route.params.value,value:imgUri,index: route.params.index};
        
        //console.log(addPhoto);
        store.dispatch({type:'ADD',add: addPhoto});
        this.props.navigation.pop();
        this.props.navigation.replace("PhotoControl",addPhoto);
      }
    }  
  };
  
  render() {
    const {route}=this.props;
    console.log("to go: "+route.params.key);
    //console.log(route.params.key);
    console.log(route.params.value);
    //console.log(store.getState().photoArr);
    var readText1 = " ";
    var readText2 = " ";
    var readText3 = " ";

    
    if(route.params.key === 'ShopStepThree2'||route.params.key === "FullShot"){
      readText1 ="제품을 평평한 곳에 놓고";
      readText2 ="전면 또는 후면이 모두 보이도록";
      readText3 = "제품의 전체 사진을 촬영하세요";
    }
    if(route.params.key === 'ShopStepThree4'||route.params.key ==="CloseShot"){
      readText1 ="표시한 수선 필요 부위를";
      readText2 ="자세히 볼 수 있도록";
      readText3 = "근접해서 사진을 촬영하세요";
    }
    state = {}
    return (
      <CameraButton>
        <View>
            <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
              style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.8}}
              type={RNCamera.Constants.Type.back}
              captureAudio={false}
            >
            <CameraView>
                <Label >{readText1}</Label>
                <Label >{readText2}</Label>
                <Label >{readText3}</Label>
            </CameraView>
            </RNCamera>
        </View>
    
        <PressButton>
          <CancelView> 
          <Touch onPress = {() => this.props.navigation.replace( 'ShopStepThree' )}>
              <CancelText>취소</CancelText>
          </Touch>
          </CancelView>

          <Touch onPress = { this.onSuccess.bind(this)}>
              <Take/>
          </Touch>

          <ChangeView>
            <Touch onPress = { this.onSuccess.bind(this)}>
              <ImgIcon source={require('../Icons/changeType.png')}/>
            </Touch>
          </ChangeView>


        </PressButton>

      </CameraButton>

   
    );
  }
}
AppRegistry.registerComponent('default', () => TakePhoto);