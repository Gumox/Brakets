import React from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import Bottom from '../../components/Bottom';
import RNPickerSelect from 'react-native-picker-select';

const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;

const BlackText = styled.Text`
  font-size : 15px;
  color : black;
`;
const DropBackground= styled.View`
    width: 220px;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid #78909c;
    margin-top:10px;
`;

// 구조 분해 할당, Destructuring Assignment
function SearchCustomer( { navigation } ) {

  return (
      <Container>
          <CenterText>
              <Title>고객 조회</Title>
          </CenterText>

          <CenterText>
            <BlackText>연락처 (뒤 4자리)</BlackText>
            <DropBackground>
            
            </DropBackground>
          </CenterText>

          <Button onPress = {() => navigation.navigate('LookupPage2')}>
            조회
          </Button>
          <Bottom navigation={navigation}/>
      </Container>
  )
}
export default SearchCustomer;