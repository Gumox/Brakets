import React,{useEffect} from 'react';
import Contents from '../../components/Contents';
import ButtonBlack from '../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions,ScrollView,BackHandler, Touchable} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import Bottom from '../../components/Bottom';
import store from '../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';
import _ from 'lodash';

import { getList } from '../../Functions/GetSendList';
import { changeSelectSend ,changeBasicSend,changeSelectType} from '../../Functions/SendDataFuctions';


const Label = styled.Text`
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
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
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

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

function ShopStepThree4({route,navigation}) {

    const uriList=store.getState().photoArr;
    const indexSort =uriList.sort(function (a,b) {
        return a.index -b.index;
    })
    const keySort = indexSort.sort(function(a,b){
        return a.key -b.key;
    })
    const photoUri=[];
    indexSort.forEach(obj=> {
        if(obj.key === 0){
            photoUri.push(obj);
        }
    });
    
    const selectedType = store.getState().selectType[0].value; 
    
    const index = store.getState().indexNumber;

    const [arrayValueIndex,setArrayValueIndex] =React.useState(0);
    
    const [select,setSelect] = React.useState();
    
    const [dataList,setDataList] = React.useState([]);
    
    
    //const data =store.getState().getAplType;

    const useList = store.getState().typeStore ;
    
    var useListSort = useList.sort(function(a,b){
        return a.key -b.key;
    });

    const [sendList,setSendList] = React.useState([]);

    const [itemList , setItemList] = React.useState([]);
    
    const productCategories = store.getState().getProductCategory;
    
    const ProductCategoriesClassify =()=>{
        var items  = [];
        var category = [];
        var i = 1;
        var j = 1;
        productCategories.forEach(obj => {
            if(obj.receiver_name !== '아디다스코리아(본사)' ){
            
                category.push({ label: i+'.'+obj.category_name, value: obj.category_name })
                var key = obj.category_name;
                i = i+1;
            }
           
            if(selectedType === obj.category_name){
                items.push({ label: j+'.'+obj.receiver_name, value: obj.receiver_name });
                j = j+1;
                
            }
        });
        setItemList(category);
        setSendList(items);
    } 
    
   
    
    const [List0,setList0] = React.useState( store.getState().basicRepairStore);
    //전단계 찍은 사진들 쌓은 부분 ---
    var photoOutput= [];
    var photoAdd;
    var imageModalsVisiable = []; 
    for(var i =0; i<photoUri.length;i++){
        
        const img = photoUri[i];
        var tempPhoto = (
        <View key={i}>
            
            <Pressable onPress={() => {
                navigation.navigate("PhotoControl",{key: 0 ,value: img.value,index:img.index})
                }}>
                <Image key = {i} style={{width:90, height:100 ,marginLeft:2}} source={{uri:photoUri[i].value}}/>
            </Pressable>
        </View>
        );
        photoOutput[i] = (tempPhoto);
    }
    if(photoUri.length<5){
        photoAdd =(
            <ContainImg onPress={()=>{
                    
                    navigation.navigate("TakePhoto",{key:"AddPhoto",value:0,index: photoUri.length});
                
                }}>
                <Image style={{width:40, height:40}} source ={require("../../Icons/camera.png")}/><Text>사진</Text><Text>추가</Text></ContainImg>
        );
    }
    // ---
    const [refreshing, setRefreshing] = React.useState(false);
    
    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => {setRefreshing(false)
        

        });
    }, []);
    var addDataList = [];
    
    React.useEffect(()=>{
        ProductCategoriesClassify();
        
        const backAction = () => {
            navigation.goBack();
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => {
              backHandler.remove();
            }

    },[]);
   
    var inputTexts = [];
    var selectedTypeLists = [];

    selectedTypeLists[0] = ( store.getState().selectType[0]);
    
    const [basicSend,setBasicSend] = React.useState(store.getState().basicRepairStore[0].basicSend)

    //const [sendList,setSendList] = React.useState(useListSort[0].sendList);
    return (
        
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <Contents>
            <CenterView><TopIntro>수선 정보 확인</TopIntro></CenterView>
            <Label>제품 구분</Label>
            <InfoView>

            <View style = {{width :180}}>
            <Picker
                placeholder = {{label : selectedType,value: selectedType}}
                style = { {width: 100,border :'solid', borderWidth : '3', borderColor : 'black',placeholder:{color: '#78909c'}} }
                onValueChange={(value) =>
                {
                    selectedTypeLists[0] = ( {key : 0 ,value : value});
                   
                    changeBasicSend(value,0);
                    changeSelectType(value,0);
                    wait(500).then(() => {
                        setSendList([]);
                        
                        setBasicSend(store.getState().basicRepairStore[0].basicSend);

                        ProductCategoriesClassify();
                        
                    });
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
                    store.dispatch({type:'RESET_BASIC_REPAIR_STORE',reset:[]});
                    store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStoreAdd: {key: 0 ,basicSend :value}});
                    console.log(store.getState().basicRepairStore[0].basicSend);
                }}
                items={sendList}
            />
                
            </InfoView>
            
            <Label/>
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=>
                    {
                     store.dispatch({type:'SELECTTYPESET',set:selectedTypeLists})
                     store.dispatch({type:'ADD_REQUESR',addRequest:inputTexts});
                     navigation.navigate( 'ShopStepThree5' );
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