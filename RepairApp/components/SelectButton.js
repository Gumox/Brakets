import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    width:120px;
    height:100px;
    background: #78909c;    
    align-items: center;
    justify-content: center;
    border-radius:12px;
    margin:10px
`;

const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;

function SelectButton(props) {
    return (
        <Container onPress={ props.onPress }>
            <Label>{props.children}</Label>
        </Container>
    )
}

export default SelectButton;