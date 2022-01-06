import React from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import Bottom from '../../components/Bottom';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import RNPickerSelect from 'react-native-picker-select';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { Alert, BackHandler } from 'react-native';
import store from '../../store/store';
import { getList } from '../../Functions/GetSendList';
import Contents from '../../components/Contents';
import ContainView from '../../components/ContainView';

const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;

const InputView = styled.View`
    align-items: center;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;

const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;

// 구조 분해 할당, Destructuring Assignment
function LookupPage3({ route,navigation }) {
    const data =route.params.data
    console.log(data)
    
    return (
        <ContainView>
            <CenterText>

            </CenterText>
            
            <InputView>
            <Button onPress={() =>{
                
                navigation.popToTop()
                
            }}>
                변경 사항 저장
            </Button >
            </InputView>
            <Bottom navigation={navigation} />
        </ContainView>
    )
}
export default LookupPage3;

