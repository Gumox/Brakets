import React,{useState ,useEffect} from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import SelectButton from '../components/SelectButton';
<<<<<<< Updated upstream
import _ from 'lodash';

function StartPage( { navigation } ) {
=======
import _, { size } from 'lodash';

import styled from 'styled-components/native';
import { Text } from 'react-native';
import store from '../store/store';
import { Provider } from 'react-redux'

const TouchableView = styled.TouchableOpacity`
    width: 100%;
    padding: 8px;
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

    useEffect(()=> {
        setNumber(store.getState().number);
    })
>>>>>>> Stashed changes
    return(
        <Container>
            <Contents>
                <SelectButton onPress={ ()=> navigation.navigate( 'ShopStepOne' ) }>
                    시작
                </SelectButton>
<<<<<<< Updated upstream
=======
                <TouchableView onPress={function(){
                    store.dispatch({type:'INCREM', size:state.size});
                    console.log(store.getState().number);
                    
                }}>
                    <ImgIcon source={require('../Icons/calendar.png')}/>
                </TouchableView>
                <Text>{number}</Text>
                
>>>>>>> Stashed changes
            </Contents>
        </Container>
    )
}
export default StartPage;
