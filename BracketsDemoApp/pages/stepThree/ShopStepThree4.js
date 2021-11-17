import React,{useEffect} from 'react';
import Contents from '../../components/Contents';
import ButtonBlack from '../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions,ScrollView,BackHandler, Touchable} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import store from '../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';
import _ from 'lodash';

import GetAplStore from '../../Functions/GetAplStore';
import { getList } from '../../Functions/GetSendList';
import { changeSelectSend ,changeBasicSend} from '../../Functions/SendDataFuctions';

const RetakeView = styled.TouchableOpacity`
    padding:3px;
    background-color:#0000ff;
    border-radius:10px;
`;
const DeleteView = styled.TouchableOpacity`
    padding:3px;
    background-color:#ff0000;
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
const ContainImg =styled.TouchableOpacity`
    border:2px
    justify-content: center;
    align-items: center;
    width:75px;
    height:100px;
    margin-Left:3px;
`;
const AddTypeDleleteView =styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const DeleteButton = styled.TouchableOpacity`

`;
const ModalInsideOptionsView =styled.View`
    margin-Top:10px;
    width: 300px;
    flex-direction: row;
    justify-content: space-around;
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
    
    const index = store.getState().indexNumber
    console.log("number:   "+store.getState().indexNumber)

    const [arrayValueIndex,setArrayValueIndex] =React.useState(0);
    
    const [select,setSelect] = React.useState();
    
    const [dataList,setDataList] = React.useState([]);
    
    
    const data =store.getState().getAplType;

    const useList = store.getState().typeStore ;
    
    var useListSort = useList.sort(function(a,b){
        return a.key -b.key;
    });
    const DeleteAddType = (deleteKey) => {
        var delPhotoList =uriList;
        var delSend = List0;
        var delSendList = useList;
        var delSelectList =  store.getState().selectType;
        
        console.log("");
        console.log(delPhotoList);
        console.log("");
        console.log(delSend);
        console.log("");
        console.log(delSendList);
        for(let i = 0  ; i<delPhotoList.length;i++){
            if(delPhotoList[i].key == deleteKey){
                delPhotoList.splice(i,1);
                i--;
            }
        }
        for(let i = 0 ; i<delPhotoList.length;i++){
            if(delPhotoList[i].key > deleteKey){
                var obj = delPhotoList[i];
                obj.key=Number(obj.key) -1;
            }
        } 
        
        console.log(delPhotoList);

        for(let i = 0  ; i<delSend.length;i++){
            if(i == deleteKey){
                delSend.splice(i,1);
               break;
            }
        } 
        console.log(delSend);
        for(let i = 0  ; i<delSendList.length;i++){
            if(i == deleteKey){
                delSendList.splice(i,1);
                break;
            }
        }
        for(let i  = 0 ; i < delSelectList.length;i++){
            console.log(delSelectList[i]);
            if(delSelectList[i].key==deleteKey){
                delSelectList.splice(i,1);
               i--;
            }
        }
        for(let i = 0 ; i<delSelectList.length;i++){
            if(delSelectList[i].key > deleteKey){
                var obj = delSelectList[i];
                obj.key=Number(obj.key) -1;
            }
        } 
        console.log(delSendList);

        store.dispatch({type:"SELECTTYPESET" ,set: delSelectList})
        store.dispatch({type:'PLUSINDEXNUMBER',plus:-1});
        store.dispatch({type:'PHOTORESET',setPhoto:delPhotoList});
        store.dispatch({type:'RESET_BASIC_REPAIR_STORE',reset: delSend});
        store.dispatch({type:'RESET_TYPE_STORE',reset: delSendList});
        
        console.log("before nvi===================================================")
        navigation.replace("ShopStepThree4");
    }
    const [List0,setList0] = React.useState( store.getState().basicRepairStore);
    //전단계 찍은 사진들 쌓은 부분 ---
    var photoOutput= [];
    var photoVisiable = [];
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
    // ---
    const [refreshing, setRefreshing] = React.useState(false);
    
    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => {setRefreshing(false)
        

        });
    }, []);
    var addDataList = [];
    
    React.useEffect(()=>{
        
        console.log(store.getState().typeStore[0]);
        console.log("xxxxxxxxxxxx"+store.getState().typeStore);
        
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



    console.log("")
       
    console.log("")
    console.log("")
    console.log("")
   

    // 수선유형 추가하면 쌓이는 부분 //
    var output=[];
    var chlidDataList = [];
    var inputTexts = [];
    var selectedTypeLists = [];
    var basicLavel = store.getState().basicRepairStore;
    console.log(basicLavel)

    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    if(store.getState().indexNumber>0){
        for (var i = 1; i < store.getState().indexNumber+1; i++) {
            
            const myKey = i;

            const [cSendList,setCSendList] = React.useState(useListSort[myKey].sendList);

            const keySelectedType = store.getState().selectType[myKey].value;
            selectedTypeLists[myKey] = ( store.getState().selectType[myKey]);
            const cBasicLavel = basicLavel[myKey].basicSend;
            
            store.dispatch({type:'RESET_TYPE_STORE',reset:useList});
           
            console.log(store.getState().typeStore);
            React.useEffect(()=>{
                //OnRefresh();
            },[]);
            
           
            var indexUriList =[];
            var photoImages =[];

           
            console.log('myKey    :'+myKey);
            uriList.forEach(element => {
                if(element.key == i){
                    indexUriList.push(element);
                   
                }
            });
            for(var j=0; j < indexUriList.length ; j++){
                const img = indexUriList[j];
                console.log(img);
                var photoImage =(
                
                    <Pressable  key = {j} onPress={() => {
                        console.log(myKey);
                        console.log(img.index);
                        console.log(img.value);
                        navigation.navigate("PhotoControl",{key: myKey ,value: img.value,index:img.index});
                        }}>
                    <Image  style={{width:90, height:100,marginLeft:3}}source={{uri:indexUriList[j].value}}/>
                    </Pressable>
                );
                photoImages[j] =(photoImage);
            }
            
            var tempItem=  (
                <View key ={myKey} >
                    <Label/>
                    <InfoView>
                        <AddTypeDleleteView>
                            <View/>
                            <DeleteButton onPress ={() =>{
                                DeleteAddType(myKey)
                            }
                            }>
                            <Image style={{width:20, height:20}} source ={require("../../Icons/cancel.png")}/>
                            </DeleteButton></AddTypeDleleteView>
                            <View style = {{width :180}}>
                            <Picker
                                placeholder = {{label : keySelectedType,value: keySelectedType}}
                                style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
                                onValueChange={(value) =>
                                {
                                    selectedTypeLists[myKey] = ( {key : myKey ,value : value});
                                    //console.log(selectedTypeLists);
                                    changeSelectSend(value,myKey);
                                    changeBasicSend(value,myKey);
                                    wait(500).then(() => {
                                        console.log("??");
                                        console.log(store.getState().typeStore[myKey].sendList);
                                        useListSort = store.getState().typeStore.sort(function(a,b){
                                            return a.key -b.key;
                                        })
                                        console.log(useListSort[myKey].sendList);
                                        setCSendList(useListSort[myKey].sendList);
                                        console.log(cSendList);
                                        console.log("AAAAAAAAAAAAAAAAA");
                                        ///change///
                                        
                                    });
                                }
                                }
                                items={[
                                    { label: '1.원단', value: '원단' },
                                    { label: '2.봉제', value: '봉제' },
                                    { label: '3.부자재', value: '부자재' },
                                    { label: '4.아트워크', value: '아트워크' },
                                    { label: '5.액세서리', value: '악세사리' }
                                ]}
                            />
                            </View>
                        
                        <ScrollView horizontal ={true} style={{marginLeft:8,marginRight:8,marginTop:5,marginBottom:5}}>
                            
                                {photoImages}
                                
                                <ContainImg onPress={()=>{
                                    navigation.navigate("TakePhoto",{key:"AddPhoto",value:myKey,index:indexUriList[myKey].length})
                                }}>
                                <Image style={{width:40, height:40}} source ={require("../../Icons/camera.png")}/><Text>사진</Text><Text>추가</Text></ContainImg>
                                
                        </ScrollView>

                        <Label>추가 요청 사항</Label>
                        <Input  
                            multiline={ true }
                            
                            onChangeText={ value => inputTexts[myKey] =( value)  }/>
                        <Label>수선처</Label>
                        <Picker
                           
                            placeholder={{ label: '기본위치: ' + cBasicLavel,value:cBasicLavel }}
                            style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
                            onValueChange={(value) => console.log(value)}
                            items={store.getState().typeStore[myKey].sendList}
                        />
                        </InfoView>
                
                </View>
            );
            output[i] = (tempItem);

        }
    }


    selectedTypeLists[0] = ( store.getState().selectType[0]);

    const [sendList,setSendList] = React.useState(useListSort[0].sendList);
    return (
        
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <Contents>
            <CenterView><TopIntro>수선 정보 확인</TopIntro></CenterView>
            <Label>수선 유형</Label>
            <InfoView>

            <View style = {{width :180}}>
            <Picker
                placeholder = {{label : selectedType,value: selectedType}}
                style = { {width: 100,border :'solid', borderWidth : '3', borderColor : 'black'} }
                onValueChange={(value) =>
                {
                    selectedTypeLists[0] = ( {key : 0 ,value : value});
                    changeSelectSend(value,0);
                    changeBasicSend(value,0);
                    wait(500).then(() => {
                        console.log("??");
                        console.log(store.getState().typeStore[0].sendList);
                        useListSort = store.getState().typeStore.sort(function(a,b){
                            return a.key -b.key;
                        })
                        setSendList(useListSort[0].sendList);
                    });
                    //getList(value,0);
                }
                }
                items={[
                    { label: '1.원단', value: '원단' },
                    { label: '2.봉제', value: '봉제' },
                    { label: '3.부자재', value: '부자재' },
                    { label: '4.아트워크', value: '아트워크' },
                    { label: '5.액세서리', value: '악세사리' }
                ]}
            /></View>

            <ScrollView horizontal ={true}  style={{marginLeft:8,marginRight:8,marginTop:5,marginBottom:5}}>
                
                    {photoOutput}
                    <ContainImg onPress={()=>{
                        navigation.navigate("TakePhoto",{key:"AddPhoto",value:0,index: photoUri.length})
                        }}>
                        <Image style={{width:40, height:40}} source ={require("../../Icons/camera.png")}/><Text>사진</Text><Text>추가</Text></ContainImg>
                  
            </ScrollView>

            <Label>추가 요청 사항</Label>
            <Input 
                 multiline={ true }
                 
                 onChangeText={ value => inputTexts[0]=( value ) }/>
            <Label>수선처</Label>
            <Picker
                placeholder={{ label: '기본위치: '+store.getState().basicRepairStore[0].basicSend, value:store.getState().basicRepairStore[0].basicSend}}
                style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
                onValueChange={(value) => console.log(value)}
                items={store.getState().typeStore[0].sendList}
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
                    store.dispatch({type:'RESET_BASIC_REPAIR_STORE',reset:basicLavel});
                    
                    store.dispatch({type:'PLUSINDEXNUMBER',plus:1});
                    //index = store.getState().indexNumber;

                    store.dispatch({type:'SELECTTYPE',typeSelect: {key :(index+1) , value : value}});

                    console.log(store.getState().selectType);
                    console.log("arrayValueIndex: "+(index+1));
                    console.log(value + "    "+ (index+1));


                    
                    data.forEach(obj => {
                        if(value === obj.repair_name){
                        console.log(obj.receiver_name);
                        
                        store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStoreAdd: {key: (index+1) ,basicSend :obj.receiver_name}});
                        
                        
                        }
                    });


                    getList(value,(index+1));

                
                navigation.replace("TakePhoto",{key:"FullShot",value:(index+1)});
                }
            }
            items={[
                { label: '1.원단', value: '원단' },
                { label: '2.봉제', value: '봉제' },
                { label: '3.부자재', value: '부자재' },
                { label: '4.아트워크', value: '아트워크' },
                { label: '5.액세서리', value: '악세사리' }
            ]}
            />
            </InfoView>
            <Label/>
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=>
                    {
                     console.log(inputTexts);
                     //store.dispatch({type:'SELECTTYPESET',set:[]});
                     store.dispatch({type:'SELECTTYPESET',set:selectedTypeLists})
                     store.dispatch({type:'ADD_REQUESR',addRequest:inputTexts});
                     console.log(store.getState().addRequest)
                     navigation.navigate( 'ShopStepThree5' );
                    }
                }>
                    다음
                </ButtonBlack>
            </CenterView>
        </ContainView>
    )
    
}

export default ShopStepThree4;