import React,{useState ,useEffect} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';
import _, { sortedLastIndex } from 'lodash';

import { Image,Text, View, ScrollView, Dimensions } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
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

const InfoView =styled.View`
    width: 100%;
    border:2px solid  #78909c;
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
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


function TakeOverPage( { navigation } ) {
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
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
            <InfoView>
              <Text>서비스 카드 번호</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
              <Text>접수 구분</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
              <Text>고객명</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
              <Text>고객 연락처</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
            </InfoView>

            <InfoView>
              <Text>매장 접수일</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
              <Text>고객 약속일</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
            </InfoView>
            </Contents>
            <Button onPress = {() => {navigation.navigate('TakeOverPage2')}}>다음 : (2) 제품 정보</Button>
            <Bottom></Bottom>
         
        </Container>
    )
}
export default TakeOverPage;