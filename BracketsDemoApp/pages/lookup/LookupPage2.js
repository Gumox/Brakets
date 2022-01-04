import React, { useState } from 'react';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import { ScrollView ,View} from 'react-native';
import Bottom from '../../components/Bottom';
import Contents from '../../components/Contents';
import ContainView from '../../components/ContainView';
import Container from '../../components/Container';


const Alternative = styled.Text`
    font-size: 15px;
    align-items: center;
`;

const Label = styled.Text`
    font-size: 20px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
    font-weight :bold;
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
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%
`;
const ScrollItme = styled.View`
    margin-left:20px;
    margin-right:20px;
    width:150px
`;

// 구조 분해 할당, Destructuring Assignment
function LookupPage2({ navigation }) {

    const [name, setName] = useState("가가가");
    const [addr, setAddr] = useState("010-1111-1111");

    return (
        
        <Container>
            <CenterText>
                <Title>조회 결과</Title>
            </CenterText>

            <ScrollView style={{borderWidth:2,borderColor:"#78909c",borderRadius:5,width:"85%",height:"45%"}}>
                <ScrollView horizontal ={true} style={{marginBottom:15}}>
                    <PrView>
                        <Label/>
                        <ScrollItme><Label>접수일</Label></ScrollItme>
                        <Label>구분</Label>
                        <ScrollItme><Label>고객명</Label></ScrollItme>
                        <ScrollItme><Label>고객 연락처</Label></ScrollItme>
                        <ScrollItme><Label>서비스 번호</Label></ScrollItme>
                        <ScrollItme><Label>상태</Label></ScrollItme>
                    </PrView>
                </ScrollView>
                <Label/>
                
                
                

            </ScrollView>
            <Button onPress = {() =>{ 
        
                navigation.navigate('LookupPage3')


                }}>
                접수하기
            </Button>
            <Bottom navigation={navigation} />
        </Container>
    )
}
export default LookupPage2;