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
import { Alert, View,Text,Appearance } from 'react-native';
import {useNetInfo}from "@react-native-community/netinfo";
import checkChangedUserInfo from '../../Functions/CheckChangedUserinfo';

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
const PickerView = styled.View`
    height:5%;
    width:90%;
    height:45px
    width:80%;
    border:3px solid rgb(0,80,130);
    border-radius:12px;
    justify-content: center;
    padding-left: 5px;
`;
function ReceiptDivision({navigation}) {
   
    const [itemList, setItemList]= useState([]);
    const info = store.getState().userInfo;
    const [seletStore, setSeletStore] = useState(store.getState().store_id); 
    
    const storeName = store.getState().storeName;
    
    const storeId = store.getState().store_id;

    const [shopInShop,setShopInShop] = useState();
    
    const netInfo = useNetInfo();
    const colorScheme = Appearance.getColorScheme();
    let bgColor = "rgb(255,255,255)"
    if (colorScheme === 'dark') {
    // Use dark color scheme
        bgColor = "rgb(153,153,153)"
    }

    useEffect(()=>{
        var i =1;
        var list =[]
        info.forEach(obj => {
            list.push({ label: i+'.'+obj.name, value: obj.store_id, brandId: obj.brand_id ,name:obj.name})
            i = i +1;
        })
        setItemList(list)
        if(list.length<2){
            let text =(list[0].label).split('.');
            store.dispatch({ type: 'STORE_ID', store_id: list[0].value  })
            store.dispatch({type:"BRAND_ID",brand_id:list[0].brandId })
            store.dispatch({ type: 'storeName', storeName: list[0].name })
            setSeletStore(list[0].value)
            setShopInShop(
                    <Text style={{marginLeft:"5%"}}>
                        {text[1]}
                    </Text>
            )
        }else{
            setShopInShop(
                <RNPickerSelect
                    placeholder = {{label : storeName, value: storeId }}
                    style = { {border :'solid', marginBottom : 50, borderWidth : 3, borderColor : '#000000'} }
                    onValueChange={(value) => 
                        {   
                            list.forEach(obj => {
                                if(obj.value === value ){
                                    store.dispatch({ type: 'STORE_ID', store_id: value  })
                                    store.dispatch({type:"BRAND_ID",brand_id:obj.brandId })
                                    store.dispatch({ type: 'storeName', storeName: obj.name })
                                    setSeletStore(value)
                                }
                            });
                        
                        }
                    }
                    items={list}
                />
            )
        }
    },[]);
    
    useEffect(() => {
         checkChangedUserInfo(navigation)
    }, []);

    return (
        <>
            <Container style= {{backgroundColor:"#ffffff"}}>
            <Label/>
            <Label/>
            <TopIntro>접수 구분</TopIntro>
            <PickerView style={{backgroundColor: bgColor}}>
                {
                    shopInShop
                }
            </PickerView>
            <Label/>
            <ReceiptButton onPress={ ()=> {
                if(seletStore === null){
                    Alert.alert(            
                        "",             
                        "매장을 선택하세요",                   
                        [                              
                            { text: "확인"},
                        ]
                    )
                }
                else{
                    store.dispatch({ type: "STORE_CLEAR" })
                    store.dispatch({type:'RECEPITION_DIVISION',receptionDivision: {name:"고객용",id:1}});
                    console.log(store.getState().receptionDivision);
                    if(netInfo.isConnected){
                        navigation.navigate( 'SearchCustomer' ) 
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    }
                }
            }}>고객용 제품</ReceiptButton>
            
            <ReceiptButton onPress={ () => {
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
                    store.dispatch({ type: "STORE_CLEAR" })
                    store.dispatch({type:'RECEPITION_DIVISION',receptionDivision: {name:"매장용-선처리",id:2}});
                    console.log(store.getState().receptionDivision);
                    if(netInfo.isConnected){
                        navigation.navigate( 'SearchCustomer' )
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    } 
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
                    store.dispatch({ type: "STORE_CLEAR" })
                    store.dispatch({type:'RECEPITION_DIVISION',receptionDivision:{name:"매장용",id:3} });
                    console.log(store.getState().receptionDivision);
                    if(netInfo.isConnected){
                        navigation.navigate( 'ShopStepOne' )
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    }
                }
            }}>매장용 제품</ReceiptButton>
            </Container>
            <Bottom navigation={navigation}/>
        </>
    )
}

export default ReceiptDivision;