import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import styled from 'styled-components/native';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';



const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

// 구조 분해 할당, Destructuring Assignment
function ShopRepairStep( { navigation } ) {
    
    return (
        <Container>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <CenterText>
                
            </CenterText>
            <Button onPress={ ()=> navigation.navigate( 'ShopStepFour' )}>
                다음 단계
            </Button>
        </Container>
    )
}

export default ShopRepairStep;