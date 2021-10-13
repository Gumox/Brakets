import React from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import SelectButton from '../components/SelectButton';
import _ from 'lodash';

import { Image,Text,Button, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";

import styled from 'styled-components/native';

const TouchableView = styled.TouchableOpacity`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
`;


function StartPage( { navigation } ) {
    

    return(
        <Container>
            <Contents>
                <SelectButton onPress={ ()=> navigation.navigate( 'ShopStepOne' ) }>
                    시작
                </SelectButton>
                <TouchableView>
                    <ImgIcon source={require('../Icons/calendar.png')}/>
                </TouchableView>
                
                
            </Contents>
        </Container>
    )
}
export default StartPage;
