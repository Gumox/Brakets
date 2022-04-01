import React,{useEffect} from 'react';
import Contents from '../../../components/Contents';
import Button from '../../../components/Button';
import styled from 'styled-components/native';
import ContainView from '../../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions,ScrollView,BackHandler, Touchable} from 'react-native';
import StateBarSolid from '../../../components/StateBarSolid';
import StateBarVoid from '../../../components/StateBarVoid';
import store from '../../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';
import _ from 'lodash';
import TopInfo from '../../../components/TopInfo';
import Bottom from '../../../components/Bottom';
import ip from '../../../serverIp/Ip';
import { PathToFlie } from '../../../Functions/PathToFlie';
import {useNetInfo}from "@react-native-community/netinfo";


function ShopStepThree5({route,navigation}) {
    const uriList=[];
    const [text,setText] = React.useState('');

    const indexSort =uriList.sort(function (a,b) {
        return a.index -b.index;
    })
    const photoUri=[];
    indexSort.forEach(obj=> {
        if(obj.key === 0){
            photoUri.push(obj);
        }
    });
    
    const selectedType = store.getState().selectType; 
    
    const [request,setRequet] =React.useState();
    const inputTexts = store.getState().addRequest;

    const receiverList =store.getState().receiverList;
    const productCategories = store.getState().getProductCategory;

    const [pcategory_id,setPcategory_id] =React.useState();
    const [receiver_id,setReceiver_id] =React.useState();
    
    const netInfo = useNetInfo();

    const updateReceipt = async (receipt_id) => {
        let formdata = new FormData();

        formdata.append("step", "3");
        formdata.append("receipt", receipt_id);
        
        formdata.append("pcategory", pcategory_id);
        formdata.append("message",request );
        formdata.append("receiver",receiver_id )
        formdata.append("store", store.getState().store_id);//임시

        formdata.append("image",  PathToFlie(indexUriList[0]));
        formdata.append("image1", PathToFlie(indexUriList[1]));
        formdata.append("image2", PathToFlie(indexUriList[2]));
        formdata.append("image3", PathToFlie(indexUriList[3]));
        formdata.append("image4", PathToFlie(indexUriList[4]));
        console.log(formdata)

        try {
            const response = await fetch(ip+'/api/updateReceipt',{method: 'POST',
            headers: {
                'Accept': '',
                'Content-Type': 'multipart/form-data'
                },
            body: formdata
            });
            const json = await response.json();
            console.log(json)
            navigation.navigate( 'ScanScreen',{key:'ShopStepFour'} )
           
        } catch (error) {
            console.error(error);
        } finally {

        }
    }
    
    useEffect(()=>{
        if(inputTexts == ''){
            setRequet("없음")
        }else{
            console.log(inputTexts[0])
            setRequet(inputTexts[0]);
        }
        receiverList.forEach(obj => {
            if(obj.receiver_name ==store.getState().basicRepairStore){
                console.log(store.getState().basicRepairStore+" : "+obj.receiver_id)
                setReceiver_id(obj.receiver_id);
            }
        });
        productCategories.forEach(obj =>{
            if(obj.category_name == selectedType){
                console.log(selectedType+" : "+obj.pcategory_id)
                setPcategory_id(obj.pcategory_id)
            }
        });
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
    
    console.log("------------------------------")
    console.log()
    console.log()
    console.log(store.getState().photo)
    console.log(store.getState().detailPhoto)
    console.log()
    console.log()
    console.log("--------------------------------")
    uriList.push(store.getState().photo);
    if(store.getState().detailPhoto !=[]){
        uriList.push(store.getState().detailPhoto);
    }
    if(store.getState().photoArr.length>0){
        const addPhotos = store.getState().photoArr;
        
        for (let i = 0; i < addPhotos.length; i++) {
        
            uriList.push(addPhotos[i]);
        }
        
    }
    const indexUriList =[];
    uriList.forEach(element => {
            
        indexUriList.push(element);
       
        
    });
    let photoImages =[];
    for(let j=0; j < indexUriList.length ; j++){
        let photoImage =(
            <Image  key = {j} style={{width:90, height:100,marginLeft:3}}source={{uri:indexUriList[j]}}/>
        );
        photoImages[j] =(photoImage);
    }
    
    
    return (
        
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <TopInfo></TopInfo>
            <Contents>
            <CenterView><TopIntro>수선 정보</TopIntro></CenterView>
            

            
            
            <View  >
                   
                   <InfoView>
                       <Label>{selectedType}</Label>
                       
                       <ScrollView horizontal ={true} style={{marginLeft:8,marginRight:8,marginTop:5,marginBottom:5}}>
                               {photoImages}
                       </ScrollView>

                       <Label> 매장 접수 내용</Label>
                       <Input  
                           multiline={ true }
                           >{request}</Input> 
                       <Label>수선처</Label>
                       <SendText>{store.getState().basicRepairStore}</SendText>
                   </InfoView>
                   
               </View>
            <Label/>
            </Contents>
            <CenterView>
                <Button onPress={ ()=>{
                    if(netInfo.isConnected){ 
                        updateReceipt(store.getState().receipt_id)
                    }else{
                        alert("네트워크 연결 실패\n 연결 상태를 확인해주세요")
                    } 
                    
                    }}>
                    4단계: 서비스 바코드 스캔 
                </Button>
            </CenterView>
            <Bottom navigation={navigation}/>
        </ContainView>
    )
    
}

export default ShopStepThree5;
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

const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    color:#000000;
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

const Input = styled.Text`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    color:#000000;
    border-radius:10px;
`;
const SendText = styled.Text`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    color:#000000;
    background-color:#d6d6d6;
    border-radius:10px;
`;