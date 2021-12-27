import React,{useState ,useEffect} from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import SelectButton from '../components/SelectButton';

import _ from 'lodash';

import { Image,Text,Button, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../store/store';
import { Provider } from 'react-redux'
import { getList } from '../Functions/GetSendList';
import Bottom from '../components/Bottom';
import { CheckBox } from 'react-native-elements';
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
    height: 3%;
`;


const TouchableView = styled.TouchableOpacity`
    
    flex-direction:row;
    justify-content:space-around;
    
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const ImgIcon =styled.Image`
    width: 45px;
    height: 45px;
`;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


function StartPage( { navigation } ) {
    const state = {size:1};
    
    const [number,setNumber] =useState(store.getState().number);
    const [check1, setCheck1] = useState(false);
    const x ={"key":2};
    
    //새로고침 함수
    const [refreshing, setRefreshing] = React.useState(false);
    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {setRefreshing(false)
        
        console.log("is refreshing")});
      }, [])

   
    //console.log("여기는 start 입니다");
    

    
    return(
        <Container>
            <Contents>
                
                <SelectButton iconImg = {<ImgIcon source={require('../Icons/repair_blue.png')}/>} onPress={ ()=> 
                    //navigation.navigate( 'CameraQR')}
                    {
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


