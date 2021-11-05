import React from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import Button from '../components/Button';
import styled from 'styled-components/native';
import JustView from '../components/JustView';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

const Label = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    justify-content: center;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    margin-top: 30px;
    background-color:#d6d6d6;
    border-radius:10px
`;

function InputAlternativeNumber({navigation}) {
   
    
    return (
        <Container>
            <JustView>
                <Label>대체 품번을 입력하세요</Label>
                <Input  multiline={ true }
                    style={{ width: 250 }}/>

            </JustView>
            <Button onPress={ ()=> navigation.navigate( 'ProductInfo' )}>
                다음
            </Button>
        </Container>
    )
}

export default InputAlternativeNumber;