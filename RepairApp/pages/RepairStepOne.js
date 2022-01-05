import React from 'react';
import styled from 'styled-components'

import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';

import Container from '../components/Container'
import CenterText from '../components/CenterText'
import Button from '../components/Button'
import Bottom from '../components/Bottom'
import { Alert } from 'react-native';



function PickerScreen() {
  return (
    <Container>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: 'Football', value: 'football' },
          { label: 'Baseball', value: 'baseball' },
          { label: 'Hockey', value: 'hockey' },
        ]}
      />
    </Container>
  );
}

function RepairStepOne({ navigation }) {

  const [text, setText] = useState("");

  const placeHolder = "회사를 선택해주세요.";

  return (
    <Container>

      <CenterText>
        <Title>회사 설정</Title>
      </CenterText>

      <BlackText>회사를 설정하세요</BlackText>
      <MiddleView>
        <Input>
        <RNPickerSelect
            placeholder = {{label : '회사를 선택하세요.',value: null}}
            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black'} }
            onValueChange={(value) => setText(value)}
                items={[
                    { label: 'A사', value: 'A사(AAA)'}
                ]}
            />
        </Input>
      </MiddleView>


      <Button onPress={() => {(text !== null) ? (
          navigation.navigate('PhotoStepTwo')
      ) : (
          Alert.alert('회사를 선택해주세요.')
          )}}>
        조회
      </Button>
      <Bottom navigation={navigation} />
    </Container>
  )
}

export default RepairStepOne;

const MiddleView = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;

const Input = styled.TouchableOpacity`
    width: 70%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 35px;
`;

const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;

const BlackText = styled.Text`
  font-size : 15px;
  color : black;
`;

const DropBackground = styled.View`
    width: 220px;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid #78909c;
    margin-top:10px;
`;

