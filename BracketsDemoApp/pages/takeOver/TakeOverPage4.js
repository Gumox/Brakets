import React,{useState ,useEffect} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import Button from '../../components/Button';
import _ from 'lodash';

import { Image,Text, View, Dimensions } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux';
import Bottom from '../../components/Bottom';

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
const InfoView =styled.View`
    width: 100%;
    border:2px solid  #78909c;
    border-radius:12px;
    margin : 10px;
    padding:15px;
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


function TakeOverPage4( { navigation } ) {
    const state = {size:1};
    
    const [number,setNumber] =useState(store.getState().number);
    const [text, onChangeText] = React.useState();
    const x ={"key":2};
    
    //새로고침 함수
    const [refreshing, setRefreshing] = React.useState(false);
    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {setRefreshing(false)
        
        console.log("is refreshing")});
      }, [])
    

    
    return(
        <Container >
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
              

              </Contents>
              
              <Bottom navigation={navigation}/>
          </Container>
    )
}
export default TakeOverPage4;