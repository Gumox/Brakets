import React from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import SelectButton from '../components/SelectButton';
import _ from 'lodash';

function StartPage( { navigation } ) {
    return(
        <Container>
            <Contents>
                <SelectButton onPress={ ()=> navigation.navigate( 'ShopStepOne' ) }>
                    시작
                </SelectButton>
            </Contents>
        </Container>
    )
}
export default StartPage;
