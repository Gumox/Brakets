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
  font-size : 18px;
`;
const PressButton = styled.View`
  flex : 1;
  flex-direction : row;
  align-items : center;
  
`;
const ButtonView = styled.View`
  flex : 1;
  align-items : flex-start;
  justify-content : center;
  align-items : center;
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


    if (this.camera) {
      const options = { quality: 0.9, base64: true, skipProcessing: true ,fixOrientation : true,forceUpOrientation: true,orientation:"portrait"}
      const data = await this.camera.takePictureAsync(options); // this is photo data with file uri and base64
      const imgUri = data.uri;
      RNCamera.Constants.AutoFocus.on
      

      if (route.params.key === 'ShopStepThree2'){
        store.dispatch({type:'PHOTO',photo:imgUri});
        
        this.props.navigation.replace(route.params.key);
      }
      else if (route.params.key === 'ShopStepThree4'){
          
        store.dispatch({type:'DETAIL_PHOTO',detailPhoto:imgUri});

        this.props.navigation.replace(route.params.key);
      } 
      else if(route.params.key === "AddPhoto"){
        
        store.dispatch({type:'ADD',add: imgUri});
        this.props.navigation.pop();
        this.props.navigation.replace("ShopStepThree4",{value:route.params.value});
      }

      else if(route.params.key === "RetakePhoto"){
        
        if(route.params.index === 0){
          console.log(store.getState().photoArr);
          store.dispatch({type:'PHOTO',photo:imgUri})
          this.props.navigation.replace('ShopStepThree2',{value:imgUri,index: route.params.index,toGo : "PhotoControl"});
        } 
        else if(route.params.index === 1){
          store.dispatch({type:'DETAIL_PHOTO',detailPhoto:imgUri});
          this.props.navigation.pop();
          this.props.navigation.replace("PhotoControl",{value:imgUri ,index :route.params.index });
        }
        else {
          store.dispatch({type:'ADD',add: imgUri});
          this.props.navigation.pop();
          this.props.navigation.replace("PhotoControl",{value:imgUri,index :route.params.index});
        }
      }
    }  
  };
  
  render() {
    const {route}=this.props;
    //console.log("to go: "+route.params.key);
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
          <ButtonView> 
          <Touch onPress = {() => this.props.navigation.replace( 'ShopStepThree' )}>
              <CancelText>취소</CancelText>
          </Touch>
          </ButtonView>
          <ButtonView>
          <Touch onPress = { this.onSuccess.bind(this)}>
              <Take/>
          </Touch>
          </ButtonView>

          <ButtonView>
            
          </ButtonView>


        </PressButton>

      </CameraButton>

   
    );
  }
}
AppRegistry.registerComponent('default', () => TakePhoto);