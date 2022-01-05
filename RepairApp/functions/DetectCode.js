import React, { Component } from 'react';
import { Text,} from 'react-native';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components';
import Button from '../components/Button';


class DetectCode extends Component {

    constructor(props) {
        super(props);
        this.camera = null;
    }    

    onBarCodeRead(scanResult) {

       console.log(scanResult.data);
       console.log(scanResult.type);
              
        if (scanResult.data !== null) {

            if(String(scanResult.type).substring(8) === 'Code128'){
                console.log(scanResult.data)
            }
        }
        this.props.navigation.replace('RepairDetail',{data: scanResult.data})
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
                        // onPress={ ()=> this.props.navigation.navigate('InputAlternativeNumber')}
                        onPress = {() => this.props.navigation.navigate('RepairDetail')}
                        >
                        <Text>
                            코드 번호 수동 입력
                        </Text>
                    </Button>
                </ButtonView>
            </Container>
        );
        }
}

export default DetectCode;

const Container = styled.View`
    flex: 1;
`;

const ButtonView = styled.View`
  align-items: center;
`;

const styles = {
    preview: {
        flex: 0.9,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
};

