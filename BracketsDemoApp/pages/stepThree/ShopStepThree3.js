// npm i -S react-native-sketch 모듈 설치
// react-native link react-native-sketch

import React, { useRef,Component } from 'react';
import { AppRegistry,Alert,Text,  View, ImageBackground,StyleSheet,TouchableOpacity} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import store from '../../store/store';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import Button from '../../components/Button';
  
  
  
  
  
export default class ShopStepThree3 extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <RNSketchCanvas
                    containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                    canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                    defaultStrokeIndex={0}
                    defaultStrokeWidth={5}
                    closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Cerrar</Text></View>}
                    undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Deshacer</Text></View>}
                    clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Limpiar</Text></View>}
                    eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Borrador</Text></View>}
                    strokeComponent={color => (
                        <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                    )}
                    strokeSelectedComponent={(color, index, changed) => {
                        return (
                            <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                        )
                    }}
                    strokeWidthComponent={(w) => {
                        return (<View style={styles.strokeWidthButton}>
                                <View  style={{
                                    backgroundColor: 'white', marginHorizontal: 2.5,
                                    width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                }} />
                            </View>
                        )}}
                    saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
                    savePreference={() => {
                        return {
                            folder: 'my_folder',
                            filename: String(Math.ceil(Math.random() * 100000000)),
                            transparent: false,
                            imageType: 'png'
                        }
                    }}
                    onSketchSaved={this.onSave}
                />
            </View>
        </View>
    )
}

onSave = async (success, path) => {
    if(!success) return;
    let imageUri;
    const myNewImagePath = RNFS.DocumentDirectoryPath + 'my_folder'

    try{
      console.log("??")
        if(path == null){
            // image has been saved to the camera roll
            // Here I am assuming that the most recent photo in the camera roll is the saved image, you may want to check the filename
            const images = await CameraRoll.getPhotos({first: 1});
            if(images.length > 0){
                imageUri = [0].image.uri;
            }else{
                console.log('Image path missing and no images in camera roll')
                return;
            }

        } else{
            imageUri = path
        }

        await RNFS.moveFile(imageUri, myNewImagePath)
    } catch (e) {
        console.log(e.message)
    }
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',

},
headerText: {
    fontSize: 5,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
},
strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
},
strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
},
functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
}
})
AppRegistry.registerComponent('example', () => ShopStepThree3);