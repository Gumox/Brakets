import React, { useState } from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import Bottom from '../../components/Bottom';
import store from '../../store/store';
import { set } from 'lodash';
import {useNetInfo}from "@react-native-community/netinfo";


const Label = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    justify-content: center;
    color:#000000;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    margin-top: 30px;
    background-color:#d6d6d6;
    border-radius:10px;
    color:#000000;
`;
const AlternativeCodeView = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 45%;
    margin-bottom: 15%;
`;

function InputAlternativeNumber({ navigation, route }) {

    const [input, setInput] = useState('');
    const key = route.params.key;

    console.log(key)
    if(key=="ShopStepFour"){
        store.dispatch({type:'SERVICECAED',value:input});
        store.dispatch({type:'TAKE',take:null});
    }
    
    return (
        <>
            <Container>
                <AlternativeCodeView>
                    <Label>바코드를  직접 입력하세요.</Label>
                    <Input
                        value={input}
                        keyboardType='numeric'
                        onChangeText={text => setInput(text)}
                        style = {{width: 300}}
                    />
                </AlternativeCodeView>

                <Button
                    onPress={() => (input != '') ? (
                        navigation.replace(key, { codeType: 'barcode', code: input })
                    ) : (
                        Alert.alert(
                            "입력 코드 오류",
                            "코드를 입력하세요",
                            [
                                { text: "확인" },
                            ]
                        )
                    )
                    }>
                    다음
                </Button>
            </Container>
            <Bottom navigation={navigation} />
        </>
    )
}

export default InputAlternativeNumber;