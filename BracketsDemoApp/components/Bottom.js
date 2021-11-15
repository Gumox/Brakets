import React from "react";
import styled from "styled-components";

const BottomView = styled.View`
    height : 10%;
    flex-direction: row;
`;
const BottomButton = styled.TouchableOpacity`
    width: 25%;
    height: 100%;
    background: #78909c;
    align-items: center;
    justify-content: center;
`;
const BottomButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;
const BottomItemBox = styled.View`
  flex-direction: row;
  width:100%
  justify-content: space-between;
  background-color : #000000;
  margin-left : 20px;
  margin-right : 20px;
`;

function Bottom ({navigation}){
  return(
  <BottomView>
      <BottomButton onPress = {() => navigation.navigate( 'StartPage')}>
          <BottomButtonText>
              접수
          </BottomButtonText>
      </BottomButton>
      <BottomButton onPress = {() => navigation.navigate( 'TakeOverPage')}>
          <BottomButtonText>
              인수
          </BottomButtonText>
      </BottomButton>

      <BottomButton onPress = {() => navigation.navigate( 'LookupPage')}>
          <BottomButtonText>
              조회
          </BottomButtonText>
      </BottomButton>
      <BottomButton onPress = {() => navigation.navigate( 'MyPage')}>
          <BottomButtonText>
              MY
          </BottomButtonText>
      </BottomButton>
            
  </BottomView>
  );
}

export default Bottom;