import React,{useState ,useEffect} from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import SelectButton from '../components/SelectButton';

import _ from 'lodash';

import styled from 'styled-components/native';
import store from '../store/store';

const BottomView = styled.View`
    flex: 0.4;
    flex-direction: row;
    align-items: flex-end;
    /* background: red; */
`;

const BottomButton = styled.TouchableOpacity`
    width: 25%;
    height: 30%;
    background: rgb(0,80,130);
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
    background: rgb(0,80,130);
    width: 100%;
    height: 3%;
`;


const TouchableView = styled.TouchableOpacity`
    
    flex-direction:row;
    justify-content:space-around;
    
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;

const ImgIcon =styled.Image`
    width: 45px;
    height: 45px;
`;


function StartPage( { navigation } ) {
    const state = {size:1};
    
    const [number,setNumber] =useState(store.getState().number);
    const [check1, setCheck1] = useState(false);
    const x ={"key":2};
    
    
    
    return(
        <Container>
            <Contents>
                
                <SelectButton iconImg = {<ImgIcon source={require('../Icons/repair_blue.png')}/>} onPress={ ()=> 
                    //navigation.navigate( 'CameraQR')}
                    {
                        store.dispatch({type:"STORE_CLEAR"})
                        navigation.navigate( 'ReceiptDivision' ) 
                        //getList("부자재",0);
                    }
                }>
                        시작
                    </SelectButton>
            </Contents>
        </Container>
    )
}
export default StartPage;