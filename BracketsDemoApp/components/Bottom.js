import React from "react";
import styled from "styled-components";

const BottomView = styled.View`
    height : 10%;
    flex-direction: row;
`;
const BottomButton = styled.TouchableOpacity`
    width: 25%;
    height: 100%;
    background: #BBDEFB;
    align-items: center;
    justify-content: center;
`;
const BottomButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;
`;
const BottomItemBox = styled.View`
  flex-direction: row;
  width:100%
  justify-content: space-between;
  background-color :#BBDEFB;
  margin-left : 20px;
  margin-right : 20px;
`;

function Bottom  (props){
  return(
  <BottomView>
      <BottomButton onPress = {() => props.navigation.navigate( 'ReceiptDivision')}>
          <BottomButtonText>
              접수
          </BottomButtonText>
      </BottomButton>
      <BottomButton onPress = {() => props.navigation.navigate( 'CheckBarcode')}>
          <BottomButtonText>
              인수
          </BottomButtonText>
      </BottomButton>

      <BottomButton onPress = {() => props.navigation.navigate( 'LookupPage')}>
          <BottomButtonText>
              조회
          </BottomButtonText>
      </BottomButton>
      <BottomButton onPress = {() => props.navigation.navigate( 'Setting')}>
          <BottomButtonText>
              설정
          </BottomButtonText>
      </BottomButton>
            
  </BottomView>
  );
}

export default Bottom;