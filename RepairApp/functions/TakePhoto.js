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

import { RNCamera } from 'react-native-camera';
import store from '../store/store';
import styled from 'styled-components';


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
  padding: 5px;
  
`;
const CancelView = styled.View`
  flex : 1;
  align-items : flex-start;
  justify-content : center;
  padding : 10px;
`;
const CancelText = styled.Text`
  color : white;
  margin-right : 15px;
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

    if (this.camera) {
      const options = { quality: 0.9, base64: true, skipProcessing: true ,fixOrientation : true,forceUpOrientation: true,orientation:"portrait"}
      const data = await this.camera.takePictureAsync(options); // this is photo data with file uri and base64
      const imgUri = data.uri;
      RNCamera.Constants.AutoFocus.on
      
      if (route.params.key === 'CloseShot'){
        if(route.params.store == 1){
          store.dispatch({type:'STORE_AFTER_IMAGE1',afterImageUri1:imgUri});
        }
        else if(route.params.store == 2){
          store.dispatch({type:'STORE_AFTER_IMAGE2',afterImageUri2:imgUri});
        }
        else if(route.params.store == 3){
          store.dispatch({type:'STORE_AFTER_IMAGE3',afterImageUri3:imgUri});
        }
        else if(route.params.store == 4){
          store.dispatch({type:'STORE_AFTER_IMAGE4',afterImageUri4:imgUri});
        }
        else if(route.params.store == 5){
          store.dispatch({type:'STORE_AFTER_IMAGE5',afterImageUri5:imgUri});
        }
        
        this.props.navigation.replace("RepairDetail",{data:route.params.data});
      }else{
        store.dispatch({type:'NEED_PHOTOS',needPhotos:{photo:imgUri}});
        this.props.navigation.replace("RepairMore",{data:route.params.code});
      }
     
    }  
  };
  
  render() {
    const {route}=this.props;
    var readText1 = " ";
    var readText2 = " ";
    var readText3 = " ";

    
    
    if(route.params.key ==="CloseShot"){
      readText1 ="수선  부위를";
      readText2 ="자세히 볼 수 있도록";
      readText3 ="근접해서 사진을 촬영하세요";
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
          <Touch onPress = {() => this.props.navigation.goBack()}>
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