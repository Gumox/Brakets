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



function StartPage( { navigation } ) {
    const state = {size:1};
    
    const [number,setNumber] =useState(store.getState().number);

    const x ={"key":2};
    console.log(x["key"]);
    console.log(store.getState().photoArr[0]);
    

   
   

    for(var i =0; i<10 ;i++){
        if(store.getState().photoArr[i]!==undefined){
        console.log(store.getState().photoArr[i]["key"]);
        }
    
    }
    return(
        <Container>
            <Contents>
                <SelectButton onPress={ ()=> 
                //navigation.navigate( 'CameraQR')}
                navigation.navigate( 'ShopStepOne' ) }
                >
                    시작
                </SelectButton>

                <TouchableView onPress ={()=>  {store.dispatch({type:'ADD',add: {"key":"fdjkgkdsck"}})
                    console.log(store.getState().photoArr)
                    }}>
                    <Text>2222</Text><ImgIcon source={require('../Icons/calendar.png')}/>
                </TouchableView>
                
               
            </Contents>
        </Container>
    )
}
export default StartPage;
