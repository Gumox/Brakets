import React,{useState ,useEffect} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';

import _ from 'lodash';

import { Image,Text,Button, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux'

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
    width: 20px;
    height: 20px;
`;
const InfoView =styled.View`
    width: 100%;
    border:2px solid  #78909c;
    border-radius:12px;
    margin:20px;
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
            <Contents>
            <Text>인수2</Text>
          
            </Contents>
            <InfoView>
              <Text>시즌-스타일</Text>

              <Text>컬러-사이즈</Text>
              <Text>제품 바코드/qr코드 번호</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
              <Text>차수</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
              <Text>상품 교환</Text>
              <Input  
                onChangeText = {onChangeText}
                value = {text}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />
              <Text>판매가</Text>
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

            <Button onPress = {() => {navigation.navigate('TakeOverPage3')}}
                    title = "다음:(3)고객 요구"></Button>
            
            <BottomView>
                    <BottomButton onPress = {() => navigation.navigate( 'StartPage')}>
                        <BottomButtonText>
                            접수
                        </BottomButtonText>
                    </BottomButton>
                    <BottomButton onPress = {() => navigation.navigate( 'TakeOverPage')}>
                        <BottomButtonText>
                            인수
                        </BottomButtonText>
                    </BottomButton>

                    <BottomButton onPress = {() => navigation.navigate( 'LookupPage')}>
                        <BottomButtonText>
                            조회
                        </BottomButtonText>
                    </BottomButton>
                    <BottomButton onPress = {() => navigation.navigate( 'MyPage')}>
                        <BottomButtonText>
                            MY
                        </BottomButtonText>
                    </BottomButton>
            </BottomView>
            <BottomEmptySpace>
            </BottomEmptySpace>
        </Container>
    )
}
export default TakeOverPage;