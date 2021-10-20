import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Container from '../components/Container';

import { RNCamera } from 'react-native-camera';
import store from '../store/store';


export default class ScanScreen extends Component {
  
  onSuccess = async (e) => {
    const {route}=this.props;
    console.log(route.params.key);
    const check = e.data.substring(0, 30);
    console.log('scanned data: ' + check);
    this.setState({
        result: e,
        scan: false,
        ScanResult: true
    })
    
    if (check === 'http') {
        
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));


    } else {
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        
        if(route.params.key !=null){
          if(route.params.key ==='ShopStepFour2'){
            store.dispatch({type:'SERVICECAED',value:check});

            if (this.camera) {
              const options = { quality: 0.9, base64: true, skipProcessing: true }
              const data = await this.camera.takePictureAsync(options); // this is photo data with file uri and base64
              const imgUri = data.uri;
             
              store.dispatch({type:'TAKE',take:imgUri});
             
            }

          }
          else if(route.params.key === 'ShopStepComplete'){
            store.dispatch({type:'BAGCODE',bag:check});
            console.log(store.getState().bagCodeValue);
          }
          
            this.props.navigation.replace(route.params.key );
           
            
            
        }
    }
    
  };
  

  render() {
    
    
    return (
      <Container>
      <QRCodeScanner
        showMarker={true}
        onRead={this.onSuccess.bind(this)}
        cameraProps={{
          ref: ref => {
            this.camera = ref;
          },
        }}
       
      />
      
    
      </Container>
      
      
    );
  }
}
AppRegistry.registerComponent('default', () => ScanScreen);