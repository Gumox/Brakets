import React from "react";
import styled from "styled-components";


function Bottom(props){
  return(
  <BottomView>

      <BottomButton onPress = { () =>  props.navigation.navigate('PhotoStep')}>
          <BottomButtonText>
              수선 촬영
          </BottomButtonText>
      </BottomButton>

      <BottomButton onPress = { () =>  props.navigation.navigate('MailbagScan')}>
          <BottomButtonText>
              행낭 스캔
          </BottomButtonText>
      </BottomButton>

      <BottomButton onPress = { () => props.navigation.navigate('RepairStepOne')}>
          <BottomButtonText>
              설정
          </BottomButtonText>
      </BottomButton>      
            
  </BottomView>
  );
}

export default Bottom;

const BottomView = styled.View`
    height : 10%;
    flex-direction: row;
    background-color: #FBDCA7;
`;
const BottomButton = styled.TouchableOpacity`
    width: 33.3%;
    height: 100%;
    background: #FBDCA7;
    align-items: center;
    justify-content: center;
`;
const BottomButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #7B7B7B;
`;
const BottomItemBox = styled.View`
  flex-direction: row;
  width:100%
  justify-content: space-between;
  background-color :#858585;
  margin-left : 20px;
  margin-right : 20px;
`;