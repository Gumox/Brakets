import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
const Container = styled.TouchableOpacity`
    width:140px;
    height:120px;
    background: rgb(0,80,130);
    border-radius:12px;
    margin:10px;
`;

const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    padding-Top : 20px;
    padding-Left : 20px;
`;
function SelectButton(props) {
    return (
        <Container onPress={ props.onPress }>
            <View>
            <View style={{flexDirection:"row"}}><Label>{props.children}</Label></View>
            <View style={{ paddingTop:10,paddingLeft:15,flexDirection:"row-reverse" }}>{props.iconImg}</View> 
            </View>
        </Container>
    )
}

export default SelectButton;