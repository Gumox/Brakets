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
function LookupPage3({ navigation }) {

    const [name, setName] = React.useState("가가가");
    const [addr, setAddr] = React.useState("010-1111-1111");
    
    return (
        <ContainView>
            <CenterText>
                <Title>고객 정보 변경</Title>
            </CenterText>

            <Contents>
                <Label>이름</Label>
                <Input
                    editable={true}
                    selectTextOnFocus={true}
                    value = {name}
                    onChange={(event) => {
                        const {eventCount, target, text} = event.nativeEvent;
                        setName(text);
                    }
                        }
                />

                <Label>연락처</Label>
                <Input
                    editable={true}
                    selectTextOnFocus={true}
                    value = {addr}
                    onChange={(event) => {
                        const {eventCount, target, text} = event.nativeEvent;
                        setAddr(text);
                    }
                }
                />
            </Contents>
            <InputView>
            <Button onPress={() =>
            (
                Alert.alert(
                    "고객 정보 변경",
                    "변경된 고객 정보가 저장되었습니다.",
                    [
                        { text: "확인" },
                    ]),
                navigation.goBack()
            )
            }>
                변경 사항 저장
            </Button >
            </InputView>
            <Bottom navigation={navigation} />
        </ContainView>
    )
}
export default LookupPage3;

