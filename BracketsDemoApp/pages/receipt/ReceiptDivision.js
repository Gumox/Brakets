import React, { useEffect, useState } from 'react';
import Contents from '../../components/Contents';
import styled from 'styled-components/native';
import Container from '../../components/Container';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import CenterText from '../../components/CenterText';
import ReceiptButton from '../../components/ReceiptButton';
import ContainView from '../../components/ContainView';
import Bottom from '../../components/Bottom';
import RNPickerSelect from 'react-native-picker-select';
import store from '../../store/store';
import { Alert, View } from 'react-native';

const Label = styled.Text`
    font-size: 15px;
    margin: 20px;
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
    color:#000000;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#78909c;
    margin-Top:50px
`;
const GrayText = styled.Text`
    font-size: 20px;
    color:#858585;
`;
const TopStateView = styled.View`
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
`;

const BottomView = styled.View`
    flex: 0.4;
    flex-direction: row;
    align-items: flex-end;
    /* background: red; */
`;



const BottomEmptySpace = styled.View`
    background: #78909c;
    width: 100%;
    height: 3%;
    border :0.6px solid #78909c;
`;


const TouchableView = styled.TouchableOpacity`
    
    flex-direction:row;
    justify-content:space-around;
    
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;

const PicckerView = styled.View`
    width:200px;
    border:3px solid #797979;
    border-radius:12px;
`;
function ReceiptDivision({navigation}) {
   
    const [itemList,setItemList] = useState([]);
    const info =store.getState().userInfo;
    const [seletStore,setSeletStore] = useState(null); 
    
    useEffect(()=>{
        let i = 1;
        let list = []
        info.forEach(obj => {
            list.push({ label: i+'.'+obj.name, value: obj.store_id, brandId: obj.brand_id })
            i = i +1;
        });
        setItemList(list)
        console.log(itemList)
    },[]);
    
    return (

        <Container>
            <Container>
            <Label/>
            <Label/>
            <TopIntro>접수 구분</TopIntro>
            <PicckerView>
                <RNPickerSelect
                placeholder = {{label : '매장을 선택하세요', value: null }}
                style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : '#000000', color:"#000000"} }
                onValueChange={(value) => 
                    {   
                        itemList.forEach(obj => {
                            if(obj.value === value ){
                                        
                                store.dispatch({ type: 'STORE_ID', store_id: value  })
                                store.dispatch({type:"BRAND_ID",brand_id:obj.brandId })
                                setSeletStore(value)
                            }
                            

                        });
                        console.log(store.getState().store_id)
                        console.log(store.getState().brand_id)
                    
                    }
                }
                items={itemList}
                />
            </PicckerView>
            <Label/>
            <ReceiptButton onPress={ ()=> {
                if(seletStore === null){
                    Alert.alert(            
                        "",             
                        "메장을 선택하세요",                   
                        [                              
                            { text: "확인"},
                        ]
                    )
                }
                else{

                console.log("204")
                store.dispatch({type:'RECEPITION_DIVISION',receptionDivision: {name:"고객용",id:1}});
                console.log(store.getState().receptionDivision);
                navigation.navigate( 'SearchCustomer' ) }
                
            }}>고객용 제품</ReceiptButton>
            
            <ReceiptButton onPress={ ()=> {
                if(seletStore === null){
                    Alert.alert(            
                        "",             
                        "메장을 선택하세요",                   
                        [                              
                            { text: "확인"},
                        ]
                    )
                }
                else{
                    store.dispatch({type:'RECEPITION_DIVISION',receptionDivision: {name:"선처리",id:2}});
                    console.log(store.getState().receptionDivision);
                    navigation.navigate( 'SearchCustomer' )
                }
            }}>매장용-선처리 제품</ReceiptButton>

            <ReceiptButton onPress={ ()=> {
                if(seletStore === null){
                    Alert.alert(            
                        "",             
                        "메장을 선택하세요",                   
                        [                              
                            { text: "확인"},
                        ]
                    )
                }
                else{
                    store.dispatch({type:'RECEPITION_DIVISION',receptionDivision:{name:"매장용",id:3} });
                    console.log(store.getState().receptionDivision);
                    navigation.navigate( 'SearchCustomer' ) 
                }
            }}>매장용 제품</ReceiptButton>
            </Container>
            <Bottom navigation={navigation}/>
        </Container>
        
    )
}

export default ReceiptDivision;