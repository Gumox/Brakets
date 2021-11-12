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


function ShopStepThree4({route,navigation}) {

    const uriList=store.getState().photoArr;
    console.log(uriList)
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
    
    
    //console.log(uriList.sort);
    const selectedType = store.getState().selectType[0].value; 
    
    console.log(uriList);
    console.log("");
    var index = 0;

    const [arrayValueIndex,setArrayValueIndex] =React.useState(0);
    
    const [select,setSelect] = React.useState();
    
    const [data, setData] = React.useState([]);
    
    
    const [isLoading, setLoading] = React.useState(true);
    //get Type 함수: 선택한 유형의 기본 수선 장소  
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
        const json = await response.json();
        const xData = json.body;
        xData.forEach(obj => {
            if(value === obj.repair_name){
              
              store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStoreAdd: obj.receiver_name});
              
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
                chlidDataList[key] =(json.body);
                console.log("rkrkrkrk");
                console.log(chlidDataList[key]);
                //chlidList.push( DataParseForDropdownList(chlidDataList[key]));
                const cData=DataParseForDropdownList(chlidDataList[key]);
                console.log(cData);
                store.dispatch({type:"TYPESTORE",typeStoreAdd: cData});
                
            }else{
                setDataList(json.body);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingStore(false);
        }
        
    }
    
    const [dataList,setDataList] = React.useState([]);
    
    const DataParseForDropdownList = (dataList)=>{
 
        const itemList=[];
        for(var i =0 ; i<dataList.length;i++){
            itemList.push( dataList[i].receiver_name)
        }
        
        const Lists =[];
    
        if (itemList !==null){
            itemList.map(x => Lists.push({label:x,value:x}));
            
        }
        return(Lists);
    }
    const DeleteAddType = (deleteKey,deleteType) => {
        var delList =uriList;
        var delSend = List0;
        store.dispatch({type:'DELETE_KEY_SELECT_TYPE',deleteTypeKey:deleteKey});
        
        console.log(delSend);
        for(let i = 0  ; i<delList.length;i++){
            if(delList[i].key == deleteKey){
                delList.splice(i,1);
                i--;
            }
        }
        for(let i = 0 ; i<delList.length;i++){
            if(delList[i].key > deleteKey){
                var obj = delList[i];
                obj.key=Number(obj.key) -1;
            }
        } 
        for(let i = 0  ; i<delSend.length;i++){
            if(delSend[i] == deleteKey){
                delSend.splice(i,1);
                i--;
            }
        }
        console.log(delSend);
        store.dispatch({type:'PLUSINDEXNUMBER',plus:-1});
        store.dispatch({type:'PHOTORESET',setPhoto:delList});
        store.dispatch({type:'RESET_BASIC_REPAIR_STORE',reset: delSend});
        
        //OnRefresh();
        navigation.replace("ShopStepThree4");
    }

    const List = DataParseForDropdownList(dataList);
    const List0 = store.getState().basicRepairStore;
    //전단계 찍은 사진들 쌓은 부분 ---
    var photoOutput= [];
    var photoVisiable = [];
    var imageModalsVisiable = []; 
    for(var i =0; i<photoUri.length;i++){
        //photoVisible[i]=(false)
        
        const img = photoUri[i];
        var tempPhoto = (
        <View key={i}>
            
            <Pressable onPress={() => {
                console.log(img);
                navigation.navigate("PhotoControl",{key: 0 ,value: img.value,index:img.index})
                }}>
                <Image key = {i} style={{width:90, height:100 ,marginLeft:2}} source={{uri:photoUri[i].value}}/>
            </Pressable>
        </View>
        );
        photoOutput[i] = (tempPhoto);
    }
    // ---
    React.useEffect(()=>{
        getAplStore(selectedType,0);  
        const backAction = () => {
            //store.dispatch({type:'PHOTORESET',setPhoto:[]});
            navigation.goBack();
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => {
              backHandler.remove();
              setLoading(false);
              setLoadingStore(false);
            }

    },[]);
    // 수선유형 추가하면 쌓이는 부분 //
    var output=[];
    var chlidDataList = [];
    var inputTexts = [];
    var selectedTypeLists = [];
    if(store.getState().indexNumber>0){
        for (var i = 1; i < store.getState().indexNumber+1; i++) {
            
            const keySelectedType = store.getState().selectType[i].value;
            selectedTypeLists[i] = ( store.getState().selectType[i]);
            //console.log(i+":get: "+keySelectedType);
        
            React.useEffect(()=>{
              
                //getAplStore(keySelectedType,i);
                console.log("???????");
                console.log(store.getState().typeStore[0])
            },[]);
            
            const cList=store.getState().typeStore[i-1];
            const cBasicLavel = store.getState().basicRepairStore[i];
           
            var indexUriList =[];
            var photoImages =[];

            const myKey = i;
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
            
            /*console.log("025852025852:   "+myKey);*/
            console.log("CLIST Y")
            console.log(cList);
            /*console.log("??????");
            console.log(chlidList[myKey]);*/
            var tempItem=  (
                <View key ={myKey} >
                    <Label/>
                    <InfoView>
                        <AddTypeDleleteView>
                            <View/>
                            <DeleteButton onPress ={() =>{
                                DeleteAddType(myKey)
                            /*console.log(myKey)*/}
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
                                    console.log(selectedTypeLists);
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
                           
                            placeholder={{ label: '기본위치: ' + cBasicLavel }}
                            style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
                            onValueChange={(value) => console.log(value)}
                            items={cList}
                        />
                        </InfoView>
                
                </View>
            );
            output[i] = (tempItem);

        }
    }
    selectedTypeLists[0] = ( store.getState().selectType[0]);
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
                    console.log(selectedTypeLists);
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
             
              store.dispatch({type:'PLUSINDEXNUMBER',plus:1});
              index = store.getState().indexNumber;

              store.dispatch({type:'SELECTTYPE',typeSelect: {key :index , value : value}});
              console.log(store.getState().selectType);
              
              getAplType(value,index);
              console.log("arrayValueIndex: "+index);
              console.log(value + "    "+ index);
              getAplStore(value,index);
              
              navigation.replace("TakePhoto",{key:"FullShot",value:index});
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