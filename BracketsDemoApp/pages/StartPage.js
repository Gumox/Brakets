import React from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import SelectButton from '../components/SelectButton';
import _ from 'lodash';
import styled from 'styled-components';
import Text from 'react'

const BottomView = styled.View`
    flex: 0.4;
    flex-direction: row;
    align-items: flex-end;
    /* background: red; */
`;

const BottomButton = styled.TouchableOpacity`
    width: 25%;
    height: 30%;
    background: #78909c;
    border-color: red;
    align-items: center;
    justify-content: center;
`;

const BottomButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;

const BottomEmptySpace = styled.View`
    background: #78909c;
    width: 100%;
    height: 4%;
`;

function StartPage( { navigation } ) {
    return(
        <Container>
            <Contents>
            </Contents>
            <BottomView>
                    <BottomButton onPress = {() => navigation.navigate( 'ShopStepOne')}>
                        <BottomButtonText>
                            접수
                        </BottomButtonText>
                    </BottomButton>
                    <BottomButton>
                        <BottomButtonText>
                            인수
                        </BottomButtonText>
                    </BottomButton>

                    <BottomButton>
                        <BottomButtonText>
                            조회
                        </BottomButtonText>
                    </BottomButton>
                    <BottomButton>
                        <BottomButtonText>
                            MY
                        </BottomButtonText>
                    </BottomButton>
            </BottomView>
            <BottomEmptySpace>
            </BottomEmptySpace>
        </Container>
    )
}
export default StartPage;