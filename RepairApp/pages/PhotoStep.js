import React from 'react';
import styled from 'styled-components/native';
import Container from '../components/Container';
import ReceiptButton from '../components/ReceiptButton';
import Bottom from '../components/Bottom';


export default function PhotoStep({ navigation }) {


    return (

        <Container>
            <Container>
                <Label />
                <Label />
                <TopIntro>수선 촬영 선택</TopIntro>
                <Label />
                <ReceiptButton onPress={() =>
                    // console.log('aaa')}>
                    navigation.navigate('DetectCode',{toGo : ""})}>
                    수선 완료 사진 촬영 
                </ReceiptButton>

                <ReceiptButton onPress={() => navigation.navigate('DetectCode',{toGo : "RepairMore"})}>
                    추가 수선 필요 부위 촬영
                </ReceiptButton>

            </Container>
            <Bottom navigation={navigation} />
        </Container>

    )
}


const Label = styled.Text`
    font-size: 15px;
    margin: 20px;
`;
const TopIntro = styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
    color:#000000;
`;