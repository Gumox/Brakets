import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    width: 75%;
    height: 50px;
    background: #797979;    
    border-radius:8px;
    margin:10px
`;
const ContainX  =styled.View`
    align-items: center;
    justify-content: center;
`;
const PView = styled.View`
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;

const Label = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;

function ReceiptButton(props) {
    return (
        <Container onPress={ props.onPress }>
            <PView><ContainX><Label>{props.children}</Label></ContainX><Label>   ></Label></PView>
        </Container>
    )
}

export default ReceiptButton;