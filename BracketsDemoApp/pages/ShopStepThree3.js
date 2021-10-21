// npm i -S react-native-sketch 모듈 설치
// react-native link react-native-sketch

import React from 'react';
import { Alert, Button, View } from 'react-native';
import Sketch from 'react-native-sketch';
 
export default class MyPaint extends React.Component {
  save = () => {
    this.sketch.save().then(({ path }) => {
      Alert.alert('Image saved!', path);
    });
  };
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Sketch
          ref={sketch => {
            this.sketch = sketch;
          }}
          strokeColor="#ff69b4"
          strokeThickness={3}
        />
        <Button onPress={this.save} title="Save" />
      </View>
    );
  }
}