import React from "react";
import styled from 'styled-components/native';

import {
    Text,
    StyleSheet,
    Dimensions,
  } from 'react-native';
  import { CheckBox } from 'react-native-elements';
function CheckBoxTextLeft({
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
          <SideText style={{color:fontColor}}>{text}</SideText>
          <CheckBoxView>
            <CheckBox
              checked={check}
              checkedColor={onCheckBoxColor}
              onPress={() =>{
                checkBoxEvent()
              }}
            />
          </CheckBoxView>
          
      </LaView>
    )
}

export default CheckBoxTextLeft;

const SideText=styled.Text`
  font-size:15px
`;

const CheckBoxView =styled.View`
  align-items: center;
  justify-content: center;
  margin:-15px;
  height:52px;
`;
const LaView = styled.View`
    flex-direction: row;
    align-items:center;
`;