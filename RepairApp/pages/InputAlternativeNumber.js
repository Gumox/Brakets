import React, {useState} from 'react';
import styled from 'styled-components';
import Bottom from '../components/Bottom';
import Button from '../components/Button';
import { Text } from 'react-native';

function FindRoute({navigation}, _route, _prdCode,_datas){
    console.log("--------------------------------")
    console.log(_route)

    if(_route != undefined){
        switch(_route) {
            case "RepairMore":
                navigation.replace('RepairMore', {data: _prdCode});
                break;
            case "RepairInfo":
                console.log(_prdCode)
                navigation.replace('RepairInfo', {data: _prdCode})
                break;
            case "ProductSend":
                navigation.navigate('ProductSend', {data: _prdCode ,datas: _datas})
                break;
            case "RepairDetail":
                navigation.navigate('RepairDetail', {data: _prdCode ,datas: _datas})
                break;
            default:
          }
        
    }
}


function InputAlternativeNumber({ navigation, route }) {

    const [prdCode, setPrdCode] = useState('');
    const toGo = route.params['toGo'];
    console.log(toGo)
    let datas;
    if(route.params['datas']){
        datas = route.params['datas']
        console.log(datas)
    }

    return (
        <>
            <Container>
                    <TitleView>
                        <Label> 대체 코드 입력 </Label>
                    </TitleView>

                    <InputView>
                        <Input                         
                        editable={true}
                        keyboardType='numeric'
                        selectTextOnFocus={false}
                        value={prdCode}
                        onChangeText={text => setPrdCode(text)}
                    />
                    </InputView>
                <Button
                    onPress = {() => FindRoute({navigation}, route.params.toGo, prdCode,datas)}
                >
                    <Text>
                        조회
                    </Text>

                </Button>

            </Container>
            <Bottom navigation={navigation} />
        </>
    );
}

export default InputAlternativeNumber;

const Container = styled.View`
    flex: 1;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px
    align-Items: center;
    justify-content: center;
`;

const OverallView = styled.View`
    padding: 15px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px;
    margin-bottom: 30px;
    width: 100%;
`;

const TitleView = styled.View`
    align-Items: center;
    margin: 10px;
`;

const InputView = styled.View`
    margin: 10px;
    width: 90%;
`;

const Label = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color:#000000;
`;

const Input = styled.TextInput`
    width: 100%;
    font-size: 20px;
    border : 1.5px;
    color: #000000;
    border-radius:10px
    height: 40px;
`;