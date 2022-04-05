import React,{useEffect,useState} from 'react';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../../components/CenterText';
import _, { values } from 'lodash';
import TopInfo from '../../../components/TopInfo';
import Bottom from '../../../components/Bottom';
import StateBarSolid from '../../../components/StateBarSolid';
import StateBarVoid from '../../../components/StateBarVoid';
import RNPickerSelect from 'react-native-picker-select';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { Alert ,BackHandler,View,Text,Appearance} from 'react-native';
import store from '../../../store/store';
import ip from '../../../serverIp/Ip';
import { GetRepairList } from '../../../Functions/GetRepairList';
import {useNetInfo}from "@react-native-community/netinfo";

const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

const Oneline = styled.View`
  flex-direction : row;
`;
const Title = styled.Text`
  color:#000000;
  font-size : 24px;
  font-weight : bold;
`;
const BlueText = styled.Text`
  font-size : 20px;
  color : rgb(0,80,130);
`;
const GrayText = styled.Text`
  font-size : 20px;
  color : #858585;
`;

const BlackText = styled.Text`
  font-size : 15px;
  color : black;
`;
const DropBackground= styled.View`
    width: 220px;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid rgb(0,80,130);
    margin-top:10px;
`;

// 구조 분해 할당, Destructuring Assignment
function ShopStepThree( { navigation } ) {

  const [select,setSelect] =  useState(null);

  const ix = store.getState().indexNumber;
  const Categories = [];
  const itemList = [];
  var i = 1;
  const productCategories = store.getState().getProductCategory;

  productCategories.forEach(obj => {
    if(obj.receiver_name !== '아디다스코리아(본사)' ){
      
      itemList.push({ label: i+'.'+obj.category_name, value: obj.category_name })
      var key = obj.category_name;
      Categories.push({'category_name' :obj.category_name, 'pcategory_id': obj.pcategory_id, 'service_date':  obj.service_date});
      var title = obj.receiver_name;
      i = i+1;
    }
    
  });
  const netInfo = useNetInfo();
 



  const [isLoading, setLoading] = useState(true);
  const colorScheme = Appearance.getColorScheme();
    let bgColor = "rgb(255,255,255)"
    if (colorScheme === 'dark') {
    // Use dark color scheme
        console.log("dark")
        bgColor = "rgb(153,153,153)"
    }

  
    
  const getRepairList = async (id) => {
      const bodyData = {
        "category": store.getState().receptionDivision.id,
        "receipt": store.getState().requirement.id,
        "season_id": store.getState().season_id,
        "pcategory_id": id

        }
        console.log(bodyData)
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
        
       
        setLoading(false);
          
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  }
  useEffect(()=>{
    console.log(Categories)
    console.log(itemList)
    
    const backAction = () => {
        store.dispatch({type:'SELECTTYPESET',set:[]});
        navigation.goBack();
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
  },[]);
  return (
      <Container style= {{backgroundColor:"#ffffff"}}>
          <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
          <TopInfo></TopInfo>

          <CenterText>
              <Title>수선정보</Title>
          </CenterText>

          <CenterText
            style={{marginBottom: '20%'}}
          >
              <Oneline>
                  <BlueText>제품 구분</BlueText>
                  <GrayText>선택 후</GrayText>
              </Oneline>
              <Oneline>
                  <BlueText>수선 위치</BlueText>
                  <GrayText>를 체크하고 </GrayText>
              </Oneline>
              <Oneline>
                  <BlueText>제품 사진</BlueText>
                  <GrayText>을 촬영하세요</GrayText>
              </Oneline>
          </CenterText>

          <BlackText>제품 구분 선택</BlackText>
          <DropBackground
            style = {{width: '75%', height: '7%', marginBottom: '5%',backgroundColor: bgColor}}
          >
          <RNPickerSelect
            placeholder = {{label : '[필수] 옵션을 선택하세요', value: null}}
            style = { {border :'solid', borderWidth : 3, borderColor : 'black', padding: 2} }
            onValueChange={(value) => 
            {setSelect(value)
              store.dispatch({type:"SELECTTYPESET" ,set : []});
              
              store.dispatch({type:'RESET_TYPE_STORE',reset:[]});
              //getList(value,0);

              
              Categories.forEach(obj => {
                if(value === obj.category_name){
                  
                  getRepairList(obj.pcategory_id);
                  store.dispatch({type:"SERVICE_DATE",serviceDate:obj.service_date});
                  
                }

              });
             
            }
          }
          items={itemList}
        />
        </DropBackground>

          <Button onPress={()=> {
            if(select=== null){
              Alert.alert(
                "",
                "수선유형을 선택해 주세요",
                [
                  {
                    text: "취소",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "확인", onPress: () => console.log("OK Pressed") }
                ]
              );
              
            }else{
              
              store.dispatch({type:'PHOTORESET',setPhoto:[]});
              store.dispatch({type:'PLUSINDEXNUMBER',plus:-ix});
              store.dispatch({type:'SELECTTYPE',typeSelect: select})
              store.dispatch({type:'DRAW',drawingImage: ""});
              if(netInfo.isConnected){
                navigation.navigate( 'TakePhoto', {key : 'ShopStepThree2' });
              }else{
                Alert.alert("네트워크 연결 실패\n 연결 상태를 확인해주세요","")
              }
              
            }}}>
            다음 단계
          </Button>
          <Bottom navigation={navigation}/>
      </Container>
  )
}

export default ShopStepThree;