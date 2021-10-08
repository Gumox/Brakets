import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    width: 75%;
    height: 50px;
    background: #828282;
    justify-content: center;
    align-items: center;
    margin:30px;
    border-radius:12px
`;

const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;

function ButtonBlack(props) {
    return (
        <Container onPress={ props.onPress }>
            <Label>{props.children}</Label>
        </Container>
    )
}

export default ButtonBlack;