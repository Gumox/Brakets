import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const BottomView = styled.View`
    height : 70px;
    flex-direction: row;
`;
const BottomButton = styled.TouchableOpacity`
    width: 25%;
    height: 100%;
    background: rgb(0,80,130);
    align-items: center;
    justify-content: center;
`;
const BottomButtonText = styled.Text`
    font-size: ${Dimensions.get('window').width*0.035}px;
    font-weight: bold;
    color: rgb(230,230,230);
`;
const BottomIcon = styled.Image`
    width:${Dimensions.get('window').width*0.08}px;
    height:${Dimensions.get('window').width*0.08}px;
    marginBottom:5px;
`;

function Bottom  (props){
  return(
  <BottomView>
      <BottomButton onPress = {() => props.navigation.navigate( 'ReceiptDivision')}>
            <BottomIcon source={require('../Icons/writing.png')}/>
            <BottomButtonText>
                접수
            </BottomButtonText>
      </BottomButton>
      <BottomButton onPress = {() => props.navigation.navigate( 'CheckBarcode')}>
            <BottomIcon source={require('../Icons/hand.png')}/>
            <BottomButtonText>
                인수
            </BottomButtonText>
      </BottomButton>

      <BottomButton onPress = {() => props.navigation.navigate( 'LookupPage',{code:null})}>
            <BottomIcon source={require('../Icons/search2.png')}/>
            <BottomButtonText>
                조회
            </BottomButtonText>
      </BottomButton>
      <BottomButton onPress = {() => props.navigation.navigate( 'Setting')}>
            <BottomIcon source={require('../Icons/settings.png')}/>
            <BottomButtonText>
                설정
            </BottomButtonText>
      </BottomButton>
            
  </BottomView>
  );
}

export default Bottom;