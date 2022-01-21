import React, { useState } from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import Bottom from '../../components/Bottom';
import { set } from 'lodash';

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

    return (
        <>
            <Container>
                <AlternativeCodeView>
                    <Label>대체 코드를 입력하세요.</Label>
                    <Input
                        value={input}
                        onChangeText={text => setInput(text)}
                        style = {{width: 300}}
                    />
                </AlternativeCodeView>

                <Button
                    onPress={() => (input != '') ? (
                        navigation.navigate(key, { codeType: 'qrcode', code: input })
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