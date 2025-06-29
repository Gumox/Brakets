import React from 'react';
import styled from 'styled-components/native';

function Button(props) {
    return (
        <Container onPress={ props.onPress }>
            <Label>{props.children}</Label>
        </Container>
    )
}

export default Button;

const Container = styled.TouchableOpacity`
    width: 75%;
    height: 50px;
    background: #AD8E5F;
    justify-content: center;
    align-items: center;
    margin:15px;
    border-radius:12px;
`;

const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;