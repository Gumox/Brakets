import React,{useEffect} from 'react';
import Contents from '../../components/Contents';
import ButtonBlack from '../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import store from '../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';
import { isInteger } from 'lodash';

const TouchableView = styled.TouchableOpacity`
    width: 100%;
    background-color:#d6d6d6;
    border-radius:10px;
`;
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

const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
    margin:10px;
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
const DropBackground= styled.View`
    width: 220px;
    border-radius:10px;
    font-color:#ffffff
`;
const ContainImg =styled.View`
    background-color:#d6d6d6;
    justify-content: center;
    align-items: center;
`;

function ShopStepThree4({route,navigation}) {
    const uriList=store.getState().photoArr;
    const fullPhotoUri =uriList[0].value;
    const photoUri =uriList[1].value;

    const selectType = store.getState().selectType[0]; 
    console.log(selectType);
    
    
    const [arrayValueIndex,setArrayValueIndex] =React.useState(0);
    
    const [select,setSelect] = React.useState();

    const [data, setData] = React.useState([]);
    const ix = 1;
    
    const [isLoading, setLoading] = React.useState(true);
    const bodyData = {"repair":"type",
    "category": ix,
    "receipt": ix}

    var index = 0;

    const getAplType = async () => {
       try {
        const response = await fetch('http://13.125.232.214/api/getRepairInfo',{method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(bodyData)
        });
        
        const json = await response.json();
        setData(json.body);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    const [dataList, setDataList] = React.useState([]);
    const [isLoadingStore, setLoadingStore] = React.useState(true);

    const dataSet = {
        "repair":"store",
        "category": ix,
        "receipt": ix,
        "name": selectType
        }
    const getAplStore = async () => {
        try {
         const response = await fetch('http://13.125.232.214/api/getRepairInfo',{method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
         body: JSON.stringify(dataSet)
         });
         
         const json = await response.json();
         setDataList(json.body);
         //console.log(data);
       } catch (error) {
         console.error(error);
       } finally {
         setLoadingStore(false);
       }
     }
    
    
    const itemList=[];
    for(var i =0 ; i<dataList.length;i++){
        itemList.push( dataList[i].receiver_name)
    }
    
    //console.log(itemList);
    const List =[];

    if (itemList !==null){
        itemList.map(x => List.push({label:x,value:x}));
        
    }
    //console.log(data)
    const List0 = []
    for(var i =0 ; i<data.length;i++){
        if(data[i].repair_name===selectType){
            List0.push({label:data[i].receiver_name,value:data[i].receiver_name})
        }
    }
    //console.log(List0);
    var output=[];
    
    
    React.useEffect(()=>{
        //getAplType();
        
        //getAplStore();
        
        
        
    },[]);
    if(store.getState().indexNumber>0){
        for (i = 1; i < store.getState().indexNumber+1; i++) {
            console.log("hello"+i);
            var indexUriList =[];
            var photoImages =[];
            uriList.forEach(element => {
                if(element.key == i){
                    indexUriList.push(element);
                    console.log(indexUriList);
                }
            });
            for(var j=0; j < indexUriList.length ; j++){
                var photoImage =(
                    <Image  key = {j} style={{width:90, height:100}}source={{uri:indexUriList[j].value}}/>
                );
                photoImages[j] =(photoImage);
            }
            
            var tempItem=  (
                <View key ={i} >
                    <Label/>
                    <InfoView>

                        <Text>수선</Text>

                        <TopStateView>
                            {photoImages}
                            
                            <ContainImg><Image style={{width:90, height:100}}/></ContainImg>
                            
                        </TopStateView>

                        <Label>추가 요청 사항</Label>
                        <Input  multiline={ true }/>
                        <Label>수선처</Label>
                            
                        </InfoView>
                
                </View>
            );
            output[i] = (tempItem);

        }
    }
    
    return (
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <Contents>
            <CenterView><TopIntro>수선 정보 확인</TopIntro></CenterView>
            <Label>수선 유형</Label>
            <InfoView>

            <Text>{selectType}</Text>
            
            <TopStateView>
                <Image style={{width:90, height:100}}
                                    source={{uri:fullPhotoUri}}/>
                <Image style={{width:90, height:100}}
                                    source={{uri:photoUri}}/>
                <ContainImg><Image style={{width:90, height:100}}/></ContainImg>
                
            </TopStateView>

            <Label>추가 요청 사항</Label>
            <Input  multiline={ true }/>
            <Label>수선처</Label>
            <Picker
                placeholder={{ label: '기본위치'}}
                style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
                onValueChange={(value) => console.log(value)}
                items={List}
            />
                
            </InfoView>
            {output}
            <Label>수선 유형 추가</Label>
            <InfoView>
            <Picker
            placeholder = {{label : '[선택] 옵션을 선택하세요',value: null}}
            style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
            onValueChange={(value) =>
            {
              setSelect(value)
              
              store.dispatch({type:'SELECTTYPE',typeSelect: value})
              console.log(store.getState().selectType)
              store.dispatch({type:'PLUSINDEXNUMBER',plus:1});
              index = store.getState().indexNumber;
              console.log("arrayValueIndex: "+index);
              navigation.replace("TakePhoto",{key:"FullShot",value:index});
            }
            }
            items={[
                { label: '1.원단', value: 'Material' },
                { label: '2.봉제', value: 'Plush' },
                { label: '3.부자재', value: 'Subsidiary' },
                { label: '4.아트워크', value: 'Artwork' },
                { label: '5.액세서리', value: 'Accessories' },
                { label: '6.기타', value: 'etc' }
            ]}
            />
            </InfoView>
            <Label/>
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=>
                    
                    navigation.navigate( 'ShopStepFour' ) }>
                    다음
                </ButtonBlack>
            </CenterView>
        </ContainView>
    )
    
}

export default ShopStepThree4;