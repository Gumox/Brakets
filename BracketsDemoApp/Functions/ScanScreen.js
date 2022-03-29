import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Container from '../components/Container';
import { RNCamera } from 'react-native-camera';
import store from '../store/store';
import styled from 'styled-components';
import Button from '../components/Button';


export default class ScanScreen extends Component {
  
  onSuccess = async (e) => {
    const {route}=this.props;

    console.log(route.params.key);

    const check = e.data.substring(0, 30);

    console.log('scanned data: ' + check);
    
    this.setState({
        result: e,
        scan: false,
        ScanResult: true,
    })
    
    if (check === 'http') {
        
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));


    } else {
        
        
        if(route.params.key !=null){
          if(route.params.key ==='ShopStepFour'){
            store.dispatch({type:'SERVICECAED',value:check});

            if (this.camera) {
              const options = { quality: 0.9, base64: true, skipProcessing: true ,fixOrientation : true,forceUpOrientation: true,orientation:"portrait"}
              const data = await this.camera.takePictureAsync(options); // this is photo data with file uri and base64
              const imgUri = data.uri;
             
              store.dispatch({type:'TAKE',take:imgUri});
              this.props.navigation.replace(route.params.key);
            }

          }
          else if(route.params.key === 'ShopStepComplete'){
            store.dispatch({type:'BAGCODE',bag:check});
            console.log(store.getState().bagCodeValue);

            if (this.camera) {
              const options = { quality: 0.9, base64: true, skipProcessing: true ,fixOrientation : true,forceUpOrientation: true,orientation:"portrait"}
              const data = await this.camera.takePictureAsync(options); // this is photo data with file uri and base64
              const imgUri = data.uri;
             
              store.dispatch({type:'BAGTAG',bagTag:imgUri});
              this.props.navigation.replace(route.params.key);
            }
          }
          else if(route.params.key === 'TakeOverPage'){

            this.props.navigation.replace(route.params.key,{code:check});

          }else if(route.params.key === 'LookupPage'){

            this.props.navigation.replace(route.params.key,{code:check});

          }
          
          
          
           
            
            
        }
    }
    
  };
  
  render() {
    
    const {route}=this.props;
    
    return (
      <Container>
        <View style ={{backgroundColor:"#000000"}}>
          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            cameraProps={{
              ref: ref => {
                this.camera = ref;
              },
            }}
          
          />
          <Image source={require('../Icons/scan_blue.png')}
            style ={{
              width: (Dimensions.get('window').width)/2,
              height:(Dimensions.get('window').width)/2,
              position : 'absolute',
              left:(Dimensions.get('window').width)/4,
              top:(Dimensions.get('window').height)/3,
              opacity:0.6
            }}
          />
        </View>
        <View style={{width:"100%",position:"absolute", bottom:30,zIndex:10,alignItems:"center",justifyContent:"center" }}>
                    <Button
                        onPress={ ()=> this.props.navigation.navigate('InputAlternativeNumber',{key:route.params.key })}
                        >
                        <Text>
                            코드 직접 입력하기
                        </Text>
                    </Button>
                </View>
    
      </Container>
      
      
    );
  }
}
const ButtonView = styled.View`
  align-items: center;
`;