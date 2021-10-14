import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { RNCamera } from 'react-native-camera';
import store from '../store/store';
export default class ScanScreen extends Component {
  
  onSuccess = e => {
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
                console.log(store.getState().cardValue);
              }
              else if(route.params.key === 'ShopStepComplete'){

              }
               this.props.navigation.replace(route.params.key );
               
            }
        }
    
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        
       
      />
    );
  }
}



AppRegistry.registerComponent('default', () => ScanScreen);