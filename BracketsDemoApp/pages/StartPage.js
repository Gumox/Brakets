import React,{useState ,useEffect} from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import SelectButton from '../components/SelectButton';

import _ from 'lodash';

import { Image,Text,Button, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../store/store';
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



function StartPage( { navigation } ) {
    const state = {size:1};
    
    const [number,setNumber] =useState(store.getState().number);

    const x ={"key":2};
    

   
    console.log("여기는 start 입니다");
    const [data, setData] = React.useState([]);
    
    
    const [isLoading, setLoading] = React.useState(true);
    
    const getAplType = async (value,key) => {
        const bodyData = {"repair":"type",
        "category": 1,
        "receipt": 1}
        try {
        const response = await fetch('http://13.125.232.214/api/getRepairInfo',{method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(bodyData)
        });
        if(key>0){
        console.log("is in here: getAplType ");
        const json = await response.json();
        const xData = json.body;
        console.log(xData);
        xData.forEach(obj => {
            if(value === obj.repair_name){
              console.log(obj.receiver_name);
              
              //store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStoreAdd: obj.receiver_name});
              
              //console.log("+++"+store.getState().basicRepairStore);
              
            }
          });
        }else {
        
            const json = await response.json();
            setData(json.body);
        }
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }
    

    
    
    
    return(
        <Container>
            <Contents>
                <SelectButton onPress={ ()=> 
                //navigation.navigate( 'CameraQR')}
                navigation.navigate( 'ShopStepOne' ) }
                >
                    시작
                </SelectButton>

                <TouchableView onPress ={()=>  {
                    getAplType("부자재",1);
                    }}>
                    <Text>2222</Text><ImgIcon source={require('../Icons/calendar.png')}/>
                </TouchableView>
                
               
            </Contents>
        </Container>
    )
}
export default StartPage;
