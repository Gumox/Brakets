import React from 'react';
import styled from 'styled-components/native';

function SmallButton(props) {
    return (
        <Container onPress={ props.onPress }>
            <Label>{props.children}</Label>
        </Container>
    )
}

export default SmallButton;

const Container = styled.TouchableOpacity`
    width: 35%;
    height: 55px;
    background: #85817B;
    justify-content: center;
    align-items: center;
    margin:15px;
    border-radius:12px
`;

const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;