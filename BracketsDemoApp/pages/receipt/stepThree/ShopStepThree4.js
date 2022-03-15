import React,{useEffect} from 'react';
import Contents from '../../../components/Contents';
import ButtonBlack from '../../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions,ScrollView,BackHandler, Touchable} from 'react-native';
import StateBarSolid from '../../../components/StateBarSolid';
import StateBarVoid from '../../../components/StateBarVoid';
import TopInfo from '../../../components/TopInfo';
import Bottom from '../../../components/Bottom';
import store from '../../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';
import _ from 'lodash';
import ip from '../../../serverIp/Ip';
import { getList } from '../../../Functions/GetSendList';
import { changeSelectSend ,changeBasicSend,changeSelectType} from '../../../Functions/SendDataFuctions';
import {useNetInfo}from "@react-native-community/netinfo";


const Label = styled.Text`
    color:#000000;
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
`;
const Input = styled.TextInput`
    color:#000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
    color:#000000;
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
`;
const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;
const InfoView =styled.View`
    width: 100%;
    border:2px solid  #78909c;
    border-radius:12px;
    
    padding:15px;
`;
const ContainImg =styled.TouchableOpacity`
    border:2px
    justify-content: center;
    align-items: center;
    width:75px;
    height:100px;
    margin-Left:3px;
`;



function ShopStepThree4({route,navigation}) {

    const uriList=[];
    uriList.push(store.getState().photo);
    uriList.push(store.getState().detailPhoto);
    
    const selectedType = store.getState().selectType[0].value; 
    const index = store.getState().indexNumber;
    const [sendList,setSendList] = React.useState([]);
    const [itemList , setItemList] = React.useState([]);
    const productCategories = store.getState().getProductCategory;
    const  [receiverList,setReceiverList] = React.useState(store.getState(). receiverList);

    const netInfo = useNetInfo();

    const ProductCategoriesClassify =()=>{
        var items  = [];
        var category = [];
        var i = 1;
        var j = 1;
        console.log("?????????????????*-*-*-*-*-*?????????????")
        productCategories.forEach(obj => {
            
            console.log(obj)
            category.push({ label: i+'.'+obj.category_name, value: obj.category_name });
            i = i+1;
           
            
        });
        receiverList.forEach(obj =>{
            items.push({ label: j+'.'+obj.receiver_name, value: obj.receiver_name });
            j = j+1;
        });
        setItemList(category);
        setSendList(items);
    } 
    
   
    const getRepairList = async (id) => {
        const bodyData = {
            category: store.getState().receptionDivision.id,
            receipt: store.getState().requirement.id,
            season_id: store.getState().season_id,
            pcategory_id: id
  
          }
        try {
            const response = await fetch(ip+'/api/getRepairList',{method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bodyData)
            });
            const json = await response.json();
            
    
            store.dispatch({type: 'RECIVER_LIST' ,receiverList: json.list})
            store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore:json.list[0].receiver_name });
            
            setReceiverList(store.getState(). receiverList);
            
            setSendList([]);
            ProductCategoriesClassify();
            console.log("YYYYYYY");
            console.log(store.getState().basicRepairStore)
            console.log(bodyData)
            console.log(json.list)
         
            
        } catch (error) {
          console.error(error);
        } finally {

        }
    }
    var photoOutput= [];
    var photoAdd;
    if(store.getState().photoArr.length>0){
        const addPhotos = store.getState().photoArr;
        console.log(addPhotos);
        for (let i = 0; i < addPhotos.length; i++) {
        
            uriList.push(addPhotos[i]);
        }
        
    }
         
    for(var i =0; i<uriList.length;i++){
        
        const img = uriList[i];
        const index = i;
        var tempPhoto = (
        <View key={index}>
            
            <Pressable onPress={() => {
                navigation.navigate("PhotoControl",{value: img,index: index})
                }}>
                <Image key = {index} style={{width:90, height:100 ,marginLeft:2}} source={{uri: img}}/>
            </Pressable>
        </View>
        );
        photoOutput[i] = (tempPhoto);
    }
    if(uriList.length<5){
        photoAdd =(
            <ContainImg onPress={()=>{
                    
                    navigation.navigate("TakePhoto",{key:"AddPhoto",value:0,index: index});
                
                }}>
                <Image style={{width:40, height:40}} source ={require("../../../Icons/camera.png")}/><Text>사진</Text><Text>추가</Text></ContainImg>
        );
    }
    // ---
    const [refreshing, setRefreshing] = React.useState(false);
    

    
    React.useEffect(()=>{
        ProductCategoriesClassify();


    },[]);
   
    var inputTexts = [];
    var selectedTypeLists = [];

    selectedTypeLists[0] = ( store.getState().selectType[0]);
    
   
    const [basicSend,setBasicSend] = React.useState(store.getState().basicRepairStore)

    return (
        
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <TopInfo></TopInfo>
            <Contents>
            <CenterView><TopIntro>수선 정보</TopIntro></CenterView>
            <Label>제품 구분</Label>
            <InfoView>

            <View style = {{width :180}}>
            <Picker
                placeholder = {{label : selectedType,value: selectedType}}
                style = { {width: 100,border :'solid', borderWidth : '3', borderColor : 'black',placeholder:{color: '#78909c'}} }
                onValueChange={(value) =>
                {
                    selectedTypeLists[0] = ( {key : 0 ,value : value});
                    productCategories.forEach(obj => {
                        if(value === obj.category_name){
                            console.log("???????????"+obj.pcategory_id);
                            
                            getRepairList(obj.pcategory_id);
                            
                            console.log(store.getState().basicRepairStore);
                            
                          }
                    });
                    changeSelectType(value,0);
                   
                    setBasicSend(store.getState().basicRepairStore);
                    
                
                }
                }
                items={itemList}
            /></View>

            <ScrollView horizontal ={true}  style={{marginLeft:8,marginRight:8,marginTop:5,marginBottom:5}}>
                
                    {photoOutput}
                    {photoAdd}
            </ScrollView>

            <Label>매장 접수 내용</Label>
            <Input 
                 multiline={ true }
                 
                 onChangeText={ value => inputTexts[0]=( value ) }/>
            <Label>수선처</Label>
            <Picker
                placeholder={{ label: '기본위치: '+ basicSend,value: basicSend}}
                
                style = { {border :'solid', borderWidth : '3', borderColor : 'black' ,placeholder:{color: '#78909c'}} }
                onValueChange={(value) =>{
                    store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: value});
                    console.log(store.getState().basicRepairStore);
                    setBasicSend(store.getState().basicRepairStore);
                }}
                items={sendList}
            />
                
            </InfoView>
            
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=>
                    {
                        store.dispatch({type:'SELECTTYPESET',set:selectedTypeLists})
                        store.dispatch({type:'ADD_REQUESR',addRequest:inputTexts});
                        if(netInfo.isConnected){
                            navigation.navigate( 'ShopStepThree5' );
                        }else{
                            alert("네트워크 연결 실패\n 연결 상태를 확인해주세요")
                        }
                    }
                }>
                    다음
                </ButtonBlack>
            </CenterView>
            <Bottom navigation={navigation}/>
        </ContainView>
    )
    
}

export default ShopStepThree4;