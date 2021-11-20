import React, { useState } from 'react';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import Bottom from '../../components/Bottom';
import Contents from '../../components/Contents';
import ContainView from '../../components/ContainView';


const Alternative = styled.Text`
    font-size: 15px;
    align-items: center;
`;

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
function LookupPage2({ navigation }) {

    const [name, setName] = useState("가가가");
    const [addr, setAddr] = useState("010-1111-1111");

    return (
        <>
            <ContainView>
                <CenterText>
                    <Title>고객 정보</Title>
                </CenterText>

                <Contents>
                    <Label>이름</Label>
                    <Input
                        editable={false}
                        selectTextOnFocus={true}
                        value = {name}
                        /* onChange={() => }*/
                    />

                    <Label>연락처</Label>
                    <Input
                        editable={false}
                        selectTextOnFocus={true}
                        value = {addr}
                    /* onChange = { () => } */
                    />
                </Contents>
                <InputView>
                    <Alternative onPress={() => navigation.navigate('LookupPage3')}>
                        고객 정보 변경하기
                    </Alternative>
                    <Button>
                        접수하기
                    </Button>
                </InputView>
                <Bottom navigation={navigation} />
            </ContainView>
        </>

    )
}
export default LookupPage2;