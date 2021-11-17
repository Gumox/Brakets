import React,{useState ,useEffect} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';

import _ from 'lodash';

import { Image,Text, View, Dimensions } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux'
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';

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
    padding: 15px;
    margin-bottom : 10px;
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;

const Half = styled.View`
    width : 100%;
    height : 20%;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
`;

const HalfLine = styled.View`
    width : 45%;
    height : 100%;
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
                  <Half>
                    <HalfLine>
                    <Text>시즌</Text>
                    <Input  
                      onChangeText = {onChangeText}
                      value = {text}
                              // onChange={(event) => {
                              //     const {eventCount, target, text} = event.nativeEvent;
                              //     setProuctName(text);
                              //   }
                              // }
                          />
                      </HalfLine>

                      <HalfLine>
                    <Text>스타일</Text>
                  <Input  
                    onChangeText = {onChangeText}
                    value = {text}
                            // onChange={(event) => {
                            //     const {eventCount, target, text} = event.nativeEvent;
                            //     setProuctName(text);
                            //   }
                            // }
                        />
                        </HalfLine>
                  </Half>

                  <Half>
                    <HalfLine>
                    <Text>컬러</Text>
                    <Input  
                    onChangeText = {onChangeText}
                    value = {text}
                            // onChange={(event) => {
                            //     const {eventCount, target, text} = event.nativeEvent;
                            //     setProuctName(text);
                            //   }
                            // }
                        />
                    </HalfLine>
                    <HalfLine>

                    <Text>사이즈</Text>
                    <Input  
                    onChangeText = {onChangeText}
                    value = {text}
                            // onChange={(event) => {
                            //     const {eventCount, target, text} = event.nativeEvent;
                            //     setProuctName(text);
                            //   }
                            // }
                        />
                        </HalfLine>
                  </Half>
                
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
            </Contents>s

            <Button onPress = {() => {navigation.navigate('TakeOverPage3')}}>다음 : (3)고객 요구</Button>
                    
            
            <Bottom navigation={navigation}/>
        </Container>
    )
}
export default TakeOverPage;