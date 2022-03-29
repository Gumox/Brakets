import React from "react";
import styled from 'styled-components/native';

import {
    Text,
    StyleSheet,
    Dimensions,
  } from 'react-native';
  import { CheckBox } from 'react-native-elements';
function CheckBoxText({
    checkBoxEvent=()=>{},
    checkBoxColor,
    color,
    text,
    check
}) {
    let fontColor ="#000000"
    let onCheckBoxColor ="#007aff"
    if(color){
        fontColor = color;
    }
    if(checkBoxColor){
        onCheckBoxColor = checkBoxColor;
    }
    return (
        <LaView >
        <CheckBoxView style={{width:5,height:52}}>
        <CheckBox
            checked={check}
            checkedColor={onCheckBoxColor}
            onPress={() =>{
              checkBoxEvent()
            }}
          />
        </CheckBoxView>
        
        <Text style={{color:fontColor, fontSize:15, marginLeft:25}}>{text}</Text>
        
      </LaView>
    )
}

export default CheckBoxText;


const styles = StyleSheet.create({
    viewHandle: {
  
      width: (Dimensions.get('window').width) * 0.75,
      marginBottom: 10,
    },
})

const CheckBoxView =styled.View`
  align-items: center;
  padding:-5px;
  justify-content: center;
`;
const LaView = styled.View`
    flex-direction: row;
    align-items:center;
`;