import React,{useState ,useEffect} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';
import _, { reduce, sortedLastIndex } from 'lodash';

import CheckBox from '@react-native-community/checkbox';
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
const Half = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;  
`;

const HalfLine = styled.View`
    width : 45%;
    height : 100%;
`;
const Check =styled.View`

    flex-direction : row;
    width : 40%;
    padding : 8px;
    align-items : center;
    `;
const TotalMoney = styled.View`

    flex-direction : row;
    width : 50%;
    `;

const Btn = styled.TouchableOpacity`
    width : 40%;
    height: 50px;
    background: #78909c;
    justify-content: center;
    align-items: center;
    margin:15px;
    border-radius:12px;    
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
    
    //체크박스 값 확인
    const [isSelected , setSelection] = React.useState(false);
    
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                <InfoView>
                  <Text>서비스 카드 번호</Text>
                      <Input  
                        onChangeText = {onChangeText}
                        value = {text}
                            />
                  <Text>접수 구분</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                                  
                              />
                  <Text>고객명</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                                
                              />
                  <Text>고객 연락처</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                                
                              />
                </InfoView>

                <InfoView>
                  <Text>매장 접수일</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                                
                              />
                  <Text>고객 약속일</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                              />
                </InfoView>

                <InfoView>
                    <Half>
                      <HalfLine>
                          <Text>시즌</Text>
                              <Input  
                                onChangeText = {onChangeText}
                                value = {text}
                                    
                                    />
                      </HalfLine>

                      <HalfLine>
                          <Text>스타일</Text>
                              <Input  
                                onChangeText = {onChangeText}
                                value = {text}
                                      
                                    />
                      </HalfLine>
                    </Half>

                    <Half>
                          <HalfLine>
                              <Text>컬러</Text>
                                  <Input  
                                  onChangeText = {onChangeText}
                                  value = {text}
                                        
                                      />
                          </HalfLine>

                          <HalfLine>
                              <Text>사이즈</Text>
                                  <Input  
                                  onChangeText = {onChangeText}
                                  value = {text}
                                      
                                      />
                            </HalfLine>
                        </Half>
                      
                        <Text>제품 바코드/qr코드 번호</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                                
                              />
                    <Text>차수</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                                
                              />
                    <Text>상품 교환</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                                
                              />
                    <Text>판매가</Text>
                        <Input  
                          onChangeText = {onChangeText}
                          value = {text}
                              />
              </InfoView>

              <InfoView>
                <Text>과실 구분</Text>
                <Input
                onChangeText = {onChangeText}
                value = {text}
                        
                    />

                <Text>내용 분석</Text>
                <Input
                onChangeText = {onChangeText}
                value = {text}
                        
                    />
              <Text>판정 결과</Text>
              <Input
                onChangeText = {onChangeText}
                value = {text}
                    
                    />

            </InfoView>

            <Text>수선처 : 맥가이버 </Text>
              <InfoView>
                  <Text>수선처 접수일</Text>
                  <Input
                  onChangeText = {onChangeText}
                  value = {text}

                      />
                      
                  <Text>수선처 발송일</Text>
                  <Input
                  onChangeText = {onChangeText}
                  value = {text}
          
                      />
                <Text>수선처 설명</Text>
                <Input
                  onChangeText = {onChangeText}
                  value = {text}
                
                      />

              </InfoView>

              <InfoView>
                <Text>본사 접수일</Text>
                <Input  
                  onChangeText = {onChangeText}
                  value = {text}
                    
                      />
                <Text>본사 발송일</Text>
                <Input  
                  onChangeText = {onChangeText}
                  value = {text}
                        
                      />
                <Text>본사 설명</Text>
                <Input  
                  onChangeText = {onChangeText}
                  value = {text}
                  
                      />
              </InfoView>

              <Text>매장 인수일</Text>
              <Input  
                  onChangeText = {onChangeText}
                  value = {text}
                      />
            <Half styled = {{marginBottom : 150}}>
                <Check>
                      <Text>유상수선 </Text>
                      <CheckBox
                          value = {isSelected}
                          onValueChange = {(newValue) => setSelection(newValue)}
                        />
                  </Check>
                <TotalMoney>
                    <Text>수선비</Text>
                </TotalMoney>
            </Half>
<Half style={{marginBottom : 50}}>
              <Btn onPress = {() => {}}><Text>재접수</Text></Btn> 
              <Btn onPress = {() => {}}><Text>인수완료</Text></Btn>
            </Half>      
            </Contents>
            <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default TakeOverPage;