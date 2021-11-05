import React from 'react';

import {
  AppRegistry,
  Text,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from '../components/Button';
import styled from 'styled-components';

const ButtonView = styled.View`
  align-items: center;
`;

const Container = styled.View`
  flex: 1
`;

const View = styled.View`
  padding-bottom: 550px
`;
  
function ScanScreen ({navigation}) {

  onSuccess = e => {

    const check = e.data.substring(0, 4);
    console.log('scanned data: ' + check)
    console.log(e.data.type)

    if (check === 'http') {
            
      // Linking
      //     .openURL(e.data)
      //     .catch(err => console.error('An error occured', err));
      alert('해당 QR코드는 링크가 포함된 QR코드 입니다.')

    } else {
      navigation.replace( 
        'ProductInfo',
        {codeType: 'QRcode' ,code: e.data, serial: ''}
      )
      console.log('type of code is ' + e.type)
      }
    }

  return(
    <>
      <Container>
        <View>
          <QRCodeScanner 
            containerStyle={{height:550}}
            cameraStyle={[{height:550}]}
            onRead={this.onSuccess}
          />
        </View>
        <ButtonView>
          <Button onPress={ ()=> 
            navigation.navigate('InputAlternativeNumber')
          }>
          <Text>
            코드 직접 입력하기
          </Text>
        </Button>
        </ButtonView>
        
      </Container>
    </>
  );
  }

export default ScanScreen;

AppRegistry.registerComponent('default', () => ScanScreen);