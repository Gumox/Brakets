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


const TouchableView = styled.TouchableOpacity`
    
    flex-direction:row;
    justify-content:space-around;
    
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
`;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


function StartPage( { navigation } ) {
    const state = {size:1};
    
    const [number,setNumber] =useState(store.getState().number);

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
                <SelectButton onPress={ ()=> 
                //navigation.navigate( 'CameraQR')}
                navigation.navigate( 'ShopStepOne' ) }
                >
                    시작
                </SelectButton>

                <TouchableView onPress ={()=>  {
                    OnRefresh();
                }}>
                    <Text>2222</Text><ImgIcon source={require('../Icons/calendar.png')}/>
                </TouchableView>
                
               
            </Contents>
        </Container>
    )
}
export default StartPage;
