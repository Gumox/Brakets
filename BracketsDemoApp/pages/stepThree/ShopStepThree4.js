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
    width:90px;
    height:100px;
`;

function ShopStepThree4({route,navigation}) {
    const uriList=store.getState().photoArr;
    
    console.log(uriList);
    const photoUri =[];
    uriList.forEach(obj=> {
        if(obj.key === 0){
            photoUri.push(obj);
        }
    });
    const selectedType = store.getState().selectType[0]; 
    console.log(selectedType);
    
    var index = 0;

    const [arrayValueIndex,setArrayValueIndex] =React.useState(0);
    const [select,setSelect] = React.useState();

    //get Type 함수: 선택한 유형의 기본 수선 장소
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
              
              store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStoreAdd: obj.receiver_name});
              
              console.log("====: "+store.getState().basicRepairStore);
              
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
    
    const [isLoadingStore, setLoadingStore] = React.useState(true);
    var chlidList=[];
    //get store : 선택한 유형의 다른 수선장소들
    const getAplStore = async (value,key) => {
      const dataSet = {
        "repair":"store",
        "category": 1,
        "receipt": 1,
        "name": value
        }
        console.log(dataSet);
        try {
            const response = await fetch('http://13.125.232.214/api/getRepairInfo',{method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSet)
            });
            
            const json = await response.json();
            if(key>0){
                console.log("is in here ")
                chlidDataList[key] =(json.body);
                
                console.log(chlidDataList[key]);
                chlidList.push( DataParseForDropdownList(chlidDataList[key]));
                const cData=DataParseForDropdownList(chlidDataList[key]);
                store.dispatch({type:"TYPESTORE",typeStoreAdd: cData});
                //return(json.body);
            }else{
                setDataList(json.body);
                console.log(dataList);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingStore(false);
        }
        
    }
    
    const [dataList,setDataList] = React.useState([]);
    
    const DataParseForDropdownList = (dataList)=>{
        console.log(dataList);
        const itemList=[];
        for(var i =0 ; i<dataList.length;i++){
            itemList.push( dataList[i].receiver_name)
        }
        
        //console.log(itemList);
        const Lists =[];
    
        if (itemList !==null){
            itemList.map(x => Lists.push({label:x,value:x}));
            
        }
        return(Lists);
    }

    const List = DataParseForDropdownList(dataList);
    const List0 = store.getState().basicRepairStore;
    //전단계 찍은 사진들 쌓은 부분
    var photoOutput= [];
    
    for(var i =0; i<photoUri.length;i++){
        var tempPhoto = (
            <Image key = {i} style={{width:90, height:100}} source={{uri:photoUri[i].value}}/>
        );
        photoOutput[i] = (tempPhoto);
    }
    
    React.useEffect(()=>{
        getAplStore(selectedType,0);  
    },[]);
    // 수선유형 추가하면 쌓이는 부분 //
    var output=[];
    var chlidDataList = [];
    if(store.getState().indexNumber>0){
        for (var i = 1; i < store.getState().indexNumber+1; i++) {
            
            const keySelectedType = store.getState().selectType[i];
            var xxx=[];
            console.log("???????"+keySelectedType);
            React.useEffect(()=>{
                console.log("+++++++++++++++++++++++++++++++++");
                console.log(i+"번")
                //getAplStore(keySelectedType,i);
                console.log(store.getState().typeStore)
            },[]);
            
            const cList =store.getState().typeStore[i-1][0];
            const cBasicLavel = store.getState().basicRepairStore[i];
            console.log("======:"+ cList);
            console.log(Object.assign({}, cList))

            console.log("get data: "+xxx);
            var indexUriList =[];
            var photoImages =[];
            uriList.forEach(element => {
                if(element.key == i){
                    indexUriList.push(element);
                    //console.log(indexUriList);
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

                        <Text>{keySelectedType}</Text>

                        <TopStateView>
                            {photoImages}
                            
                            <ContainImg><Image style={{width:40, height:40}} source ={require("../../Icons/plus.png")}/></ContainImg>
                            
                        </TopStateView>

                        <Label>추가 요청 사항</Label>
                        <Input  multiline={ true }/>
                        <Label>수선처</Label>
                        <Picker
                            key ={i}
                            placeholder={{ label: '기본위치: ' + cBasicLavel }}
                            style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
                            onValueChange={(value) => console.log(value)}
                            items={Object.assign({}, cList)}
                        />
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

            <Text>{selectedType}</Text>
            
            <TopStateView>
                {photoOutput}
                <ContainImg><Image style={{width:40, height:40}} source ={require("../../Icons/plus.png")}/></ContainImg>
                
            </TopStateView>

            <Label>추가 요청 사항</Label>
            <Input  multiline={ true }/>
            <Label>수선처</Label>
            <Picker
                placeholder={{ label: '기본위치: '+List0[0]}}
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
              getAplType(value,index);
              console.log("arrayValueIndex: "+index);
              getAplStore(value,index);
              
              navigation.replace("TakePhoto",{key:"FullShot",value:index});
            }
            }
            items={[
                { label: '1.원단', value: '원단' },
                { label: '2.봉제', value: '봉제' },
                { label: '3.부자재', value: '부자재' },
                { label: '4.아트워크', value: '아트워크' },
                { label: '5.액세서리', value: '악세사리' },
                { label: '6.기타', value: '기타' }
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