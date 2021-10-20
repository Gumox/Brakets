import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import styled from 'styled-components/native';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
import RNPickerSelect from 'react-native-picker-select';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import ShopStepThree2 from './ShopStepThree2';


const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

const Oneline = styled.View`
  flex-direction : row;
`;
const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;
const BlueText = styled.Text`
  font-size : 20px;
  color : #78909c;
`;
const GrayText = styled.Text`
  font-size : 20px;
  color : #858585;
`;

const BlackText = styled.Text`
  font-size : 15px;
  color : black;
`;



// 구조 분해 할당, Destructuring Assignment
function ShopStepThree( { navigation } ) {
    
    return (
        <Container>
            <TopStateView></TopStateView>
            <CenterText>
                <Title>수선정보</Title>
            </CenterText>

            <CenterText>
                <Oneline>
                    <BlueText>수선 유형 </BlueText>
                    <GrayText>선택 후</GrayText>
                </Oneline>
                <Oneline>
                    <BlueText>수선 위치</BlueText>
                    <GrayText>를 체크하고 </GrayText>
                </Oneline>
                <Oneline>
                    <BlueText>제품 사진</BlueText>
                    <GrayText>을 촬영하세요</GrayText>
                </Oneline>
                
            </CenterText>

            <BlackText>수선유형선택</BlackText>
            <RNPickerSelect
            placeholder = {{label : '[필수] 옵션을 선택하세요'}}
            style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black'} }
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '1.원단', value: 'Material' },
                { label: '2.봉제', value: 'Plush' },
                { label: '3.부자재', value: 'Subsidiary' },
                { label: '4.아트워크', value: 'Artwork' },
                { label: '5.액세서리', value: 'Accessories' },
                { label: '6.기타', value: 'etc' }
            ]}
          />

            <Button onPress={ ()=> navigation.navigate( 'TakePhoto', {key : 'ShopStepThree2' } )}>
                다음 단계
            </Button>
        </Container>
    )
}

export default ShopStepThree;