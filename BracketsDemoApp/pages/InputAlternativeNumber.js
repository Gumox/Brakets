import React, { useState } from 'react';
import { View,Text } from 'react-native';
import Container from '../components/Container';
import Contents from '../components/Contents';
import Button from '../components/Button';
import styled from 'styled-components/native';
import JustView from '../components/JustView';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
//import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
import TopInfoLess from '../components/TopInfoLess';
import Bottom from '../components/Bottom';
import store from '../store/store';
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
const TopStateView = styled.View`
    
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;
function InputAlternativeNumber({navigation}) {
   
    
    const [input, setInput] = useState('');


    return (
        <Container>
            <TopStateView><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
            
            <TopInfoLess></TopInfoLess>
            <JustView>
                <Label>대체 품번을 입력하세요</Label>
                    <Input
                        value = {input}
                        onChange={(event) => {
                            const {eventCount, target, text} = event.nativeEvent;
                            setInput(text);
                            }
                        }
                style={{ width: 250 }}/>
            </JustView>
            <Button 
                onPress={ () => (input != '') ? (
                        navigation.navigate( 'ProductInfo', {codeType: 'qrcode', code: input} )
                    ) : (
                        Alert.alert(            
                            "입력 코드 오류",             
                            "코드를 입력하세요",                   
                            [                              
                                { text: "확인"},
                            ]
                        )
                    )                   
                    }>
                    다음
            </Button>
            <Bottom navigation={navigation}/>
        </Container>
    )
}

export default InputAlternativeNumber;