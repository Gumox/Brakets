import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Dimensions
  } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Container from '../components/Container';
import { RNCamera } from 'react-native-camera';
import store from '../store/store';
import Button from '../components/Button';
import styled from 'styled-components';

import { NavigationContainer } from '@react-navigation/native';

import { stubArray } from 'lodash';




const CameraButton = styled.View`
  flex : 1;
  align-items:center;
  background-color : black;
`;
const Take = styled.View`
  height : 90px;
  width :90px;
  border-radius : 50px;
  border : solid 10px black;
  background-color : white;
  margin-bottom : 15px;
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
  margin-top : 200px;
`;

export default class TakePhoto extends Component {
  

  onSuccess = async (e) => {
  const {route}=this.props;

    console.log(route.params.key);

    console.log("go");
    if (this.camera) {
      const options = { quality: 0.9, base64: true, skipProcessing: true }
      const data = await this.camera.takePictureAsync(options); // this is photo data with file uri and base64
      const imgUri = data.uri;
     
      {/*store.dispatch({type:'TAKE',take:imgUri});*/}
      console.log (imgUri);
      store.dispatch({type:'PHOTO',photo: imgUri});
      console.log(store.getState().picture);
      
      if (route.params.key === 'ShopStepThree2'){
        console.log (route.params.key);

        this.props.navigation.replace(route.params.key);
      }

     
    }

    
  };
  
  render() {
    const {route}=this.props;
    console.log(route.params.key);




    const [read,setRead] = " ";

   

    
    return (
      <CameraButton>
        <View>
          <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
            style={{width: 500, height: 150}}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
          />
        
          <Label >제품을 평평한 곳에 놓고</Label>
          <Label >전면 또는 후면이 모두 보이도록</Label>
          <Label >제품의 전체 사진을 촬영하세요</Label>
        </View>
    
        <PressButton>
          <Touch onPress = { this.onSuccess.bind(this)}>
            <Take/>
          </Touch>
      </PressButton>

      </CameraButton>

   
    );
  }
}
AppRegistry.registerComponent('default', () => TakePhoto);