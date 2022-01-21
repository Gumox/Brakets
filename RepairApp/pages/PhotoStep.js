import React from 'react';
import styled from 'styled-components/native';
import Container from '../components/Container';
import ReceiptButton from '../components/ReceiptButton';
import Bottom from '../components/Bottom';
import store from '../store/store';

export default function PhotoStep({ navigation,route }) {
    const staffInfo = store.getState().staffInfo
    staffInfo.forEach((elt, index) => {
        console.log(elt.store_id)
        store.dispatch({ type: 'SHOP_ID', shopId: elt.store_id });

    });
    return (

        <Container>
            <Container>
                <Label />
                <Label />
                <TopIntro>수선 촬영 선택</TopIntro>
                <Label />
                <ReceiptButton onPress={() =>
                    {
                    store.dispatch({type:'STATE_RESET',photo: null})
                    navigation.navigate('DetectCode',{toGo : ""})
                    }}>
                    수선 완료 사진 촬영 
                </ReceiptButton>

                <ReceiptButton onPress={() => {
                    store.dispatch({type:'STATE_RESET',photo: null})
                    navigation.navigate('DetectCode',{toGo : "RepairMore"})
                }}>
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