import React, { Component, useState, useRef } from 'react';
import { Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components';
import { Alert } from 'react-native';


function Picture({ navigation, route }) {

    const [firstPicture, setFirstPicture] = useState(null);
    const [secondPicture, setSecondPicture] = useState(null);
    const [clicked, setClicked] = useState(false);

    const cameraRef = useRef(null);

    const order = route.params.order;

    const takePhoto = async () => {
        // console.log('cameraRef', cameraRef);
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,
            });
            console.log('order is '+ order);
            console.log('firstPicture uri is: ', data.uri);

            setClicked(true);

            if(order == 'first'){
                setFirstPicture(data.uri)
            } else if(order == 'second'){
                setSecondPicture(data.uri)
            }
        }
    };

    const showCamera = () => {
        return(
            <>
                <RNCamera
                    ref={cameraRef}
                    style={{
                        width: 500,
                        height: 600,
                    }}
                    captureAudio={false}/>

                <CameraView>
                    <Touchable onPress={takePhoto}>
                        <OuterGreyButton />
                    </Touchable>
                </CameraView>
            </>
        )
    }

    const renderImage = () => {
        return (
            <>
            <Image
                style={{
                    width: 500, 
                    height:600
                }}
                source={
                    (order == 'first') ? (
                        { uri: firstPicture }
                    ) : (
                        { uri: secondPicture }
                    )
                }
                
            />

            <View>            
                <Button
                    style={{ alignItems: 'flex-start' }}
                    onPress={() => {
                        (order == 'first') ? (
                            setFirstPicture(null),
                            setClicked(false)
                        ) : (
                            setSecondPicture(null),
                            setClicked(false)
                        )
                    }}
                >
                    <Text>
                        다시 찍기
                    </Text>
                </Button>

                <Button
                    style={{ alignItems: 'flex-end' }}
                    onPress={() => {
                        navigation.navigate('RepairDetail', { firstPicture: firstPicture, secondPicture: secondPicture })
                    }}
                >
                    <Text>
                        사진 사용
                    </Text>
                </Button>
            </View>
            </>
        );
    }

    return (
        (clicked == false) ? (
            showCamera()
        ) : (
            renderImage()
        )

    )
}

export default Picture;

const CameraView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 15px;
    background-color: black;
`;


const View = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 15px;
    background-color: black;
`;

// TODO: need to change naming
const OuterGreyButton = styled.View`
    width: 75px;
    height: 75px;
    margin-right: 15px;
    border-radius: 50px;
    background-color: white;
`;

const Text = styled.Text`
    font-size: 15px;
    color: white;
`;

const Button = styled.TouchableOpacity`
`;

const Touchable = styled.TouchableOpacity`
`;


