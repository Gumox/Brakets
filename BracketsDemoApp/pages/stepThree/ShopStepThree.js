import React from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import Bottom from '../../components/Bottom';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import RNPickerSelect from 'react-native-picker-select';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { Alert ,BackHandler} from 'react-native';
import store from '../../store/store';
import { getList } from '../../Functions/GetSendList';

const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

const Oneline = styled.View`
  flex-direction : row;
`;
const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;
const BlueText = styled.Text`
  font-size : 20px;
  color : #78909c;
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
    border:2px solid #78909c;
    margin-top:10px;
`;

// 구조 분해 할당, Destructuring Assignment
function ShopStepThree( { navigation } ) {

  const [select,setSelect] =  React.useState(null);

  const ix = store.getState().indexNumber;
  //console.log(ix);
  //console.log("                       :"+store.getState().getProductCategory);
  
  const Categories = [];
  const itemList = [];
  var i = 1;
  const productCategories = store.getState().getProductCategory;
  productCategories.forEach(obj => {
    if(obj.receiver_name !== '아디다스코리아(본사)' ){
      //key: i+'.'+obj.category_name , value:obj.category_name
      
      itemList.push({ label: i+'.'+obj.category_name, value: obj.category_name })
      var key = obj.category_name;
      Categories.push({'category_name' :obj.category_name, 'receiver_name': obj.receiver_name});
      var title = obj.receiver_name;
      i = i+1;
       //Categories.push(title : obj.receiver_name);
    }
    console.log(obj.category_name+ " : " + obj.receiver_name);
    
  });
  if(itemList[0]==undefined){
    itemList.push({ label: '...', value: '...' })
  }
  React.useEffect(()=>{
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
      <Container>
          <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
          <CenterText>
              <Title>수선정보</Title>
          </CenterText>

          <CenterText>
              <Oneline>
                  <BlueText>제품 구분 </BlueText>
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
          <DropBackground>
          <RNPickerSelect
          placeholder = {{label : '[필수] 옵션을 선택하세요',value: null}}
          style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black'} }
          onValueChange={(value) => 
            {setSelect(value)
              store.dispatch({type:"SELECTTYPESET" ,set : []});
              console.log("        :"+value);
              
              store.dispatch({type:'RESET_TYPE_STORE',reset:[]});
              //getList(value,0);
              console.log(store.getState().typeStore);

              
              Categories.forEach(obj => {
                if(value === obj.category_name){
                  console.log("???????????"+obj.receiver_name);
                  
                  store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: obj.receiver_name});
                  
                  console.log("+++");
                  console.log(store.getState().basicRepairStore);
                  
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
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
              
            }else{
              store.dispatch({type:'PHOTORESET',setPhoto:[]});
              store.dispatch({type:'PLUSINDEXNUMBER',plus:-ix});
              
              console.log("? "+ix);
              console.log(store.getState().indexNumber);
              store.dispatch({type:'SELECTTYPE',typeSelect: {key:0,value:select}})
              console.log(store.getState().selectType);
              store.dispatch({type:'DRAW',drawingImage: ""});
              
              console.log("");
              console.log("");
              console.log("");
              console.log("");
              console.log("");
              console.log("");
              console.log(store.getState().typeStore);
              
              console.log("");
              console.log("");
              console.log("");
              console.log("");
              console.log("");
              console.log("");
              navigation.navigate( 'TakePhoto', {key : 'ShopStepThree2' });
            }}}>
            다음 단계
          </Button>
          <Bottom navigation={navigation}/>
      </Container>
  )
}

export default ShopStepThree;