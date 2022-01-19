import React, { Component } from 'react';
import { Text,Image,Dimensions,View} from 'react-native';
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

            // TODO: Code Type 종류 구분
            if(String(scanResult.type).substring(8) === 'Code128'){
                console.log(scanResult.data)
            }

            if(this.props.route.params['toGo'] != undefined){
                if(this.props.route.params['toGo'] === "RepairMore"){
                    this.props.navigation.replace('RepairMore',{data: scanResult.data})
                }
                else if(this.props.route.params['toGo'] === "RepairInfo"){
                    this.props.navigation.replace('RepairInfo',{data: scanResult.data})
                }
                else if(this.props.route.params['toGo'] === "ProductSend"){
                    this.props.navigation.replace('ProductSend',{data: scanResult.data})
                }
                else{
                    this.props.navigation.replace('RepairDetail',{data: scanResult.data})
                }
            }
        }
        
        return;
    }

    render() {
        return (
            <Container>
                <View style={{ flex:1}}>
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
                    <View
                        style ={{
                        position : 'absolute',
                        left: 0,
                        top: 0,
                        width: (Dimensions.get('window').width),
                        height: (Dimensions.get('window').height)*0.8,
                        justifyContent:"center",
                        alignItems:"center",
                        }}
                    >
                        <Image 
                            source={require('../Icons/scan_yellow.png')} 
                            style={{
                                width: (Dimensions.get('window').width)/2,
                                height:(Dimensions.get('window').width)/2,
                                opacity:0.6,
                            }}/>
                    </View>
                </View>
                <ButtonView>
                    <Button
                        onPress = {() => this.props.navigation.navigate('InputAlternativeNumber')}
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
    background-color:#000000;
    flex:0.25;
    justify-content: center;
    align-items: center;
`;

const styles = {
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
};

