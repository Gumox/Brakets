import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    width: 300px;
    height: 50px;
    background: #797979;    
    align-items: center;
    justify-content: space-between;
    border-radius:8px;
    margin:10px;
    flex-direction: row;
`;


const Label = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;

const PView = styled.View`
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
`;

function ReceiptButton(props) {
    return (
        <Container onPress={ props.onPress }>
            <Label>  </Label><Label>{props.children}</Label><Label>〉</Label>
        </Container>
    )
}

export default ReceiptButton;