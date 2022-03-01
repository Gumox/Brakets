import React, { Component } from 'react';
import { Text,} from 'react-native';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components';
import Button from '../components/Button';

const Container = styled.View`
    flex: 1;
`;

const ButtonView = styled.View`
  align-items: center;
`;

class BarcodeScreen extends Component {

    constructor(props) {
        super(props);
        this.camera = null;
        /* this.state = { barcodeType: '' }; */
    }

    

    onBarCodeRead(scanResult) {

       /* console.log(scanResult.data);
       console.log(scanResult.type); */

       var codeType = '';
       
        if (scanResult.data !== null) {

            if( String(scanResult.type).substr(-6) === 'QRCode' ) {
                    codeType = 'qrcode'
                } else if(String(scanResult.type).substr(-10) === 'DataMatrix'){
                    codeType = 'qrcode'
                } else{
                    codeType = 'barcode'
                }
        }
        console.log(scanResult.data);
        
        this.props.navigation.replace(
            'ProductInfo',
            {codeType: codeType, code: scanResult.data, serial: ''})
        return;
    }

    render() {
        return (
            <Container>
                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    captureAudio={false}
                    autoFocus = { RNCamera.Constants.AutoFocus.on }
                    type = { RNCamera.Constants.Type.back} 
                    onBarCodeRead = { this.onBarCodeRead.bind(this) }
                    style = { styles.preview }
                >
                </RNCamera>

                <ButtonView>
                    <Button
                        onPress={ ()=> this.props.navigation.navigate('InputAlternativeNumber',{key:"ProductInfo"})}
                        >
                        <Text>
                            코드 직접 입력하기
                        </Text>
                    </Button>
                </ButtonView>
            </Container>
        );
        }
}

const styles = {
    preview: {
        flex: 0.9,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
};

export default BarcodeScreen;
