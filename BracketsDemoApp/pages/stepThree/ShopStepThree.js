import React from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
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

  const data =store.getState().getAplType;
  const ix = store.getState().indexNumber;
  //console.log(ix);
  //console.log("                       :"+store.getState().getAplType);
  
  const basicSend = store.getState().getAplType;
  React.useEffect(()=>{
    
    //setData(store.getState().getAplType);
    //console.log("uri data: "+data);
    //console.log(data);
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
  console.log("");
  console.log("");
  console.log("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  console.log(basicSend);
  console.log("");
  console.log("");
  return (
      <Container>
          <TopStateView></TopStateView>
          <CenterText>
              <Title>수선정보</Title>
          </CenterText>

          <CenterText>
              <Oneline>
                  <BlueText>수선 유형 </BlueText>
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

          <BlackText>수선유형선택</BlackText>
          <DropBackground>
          <RNPickerSelect
          placeholder = {{label : '[필수] 옵션을 선택하세요',value: null}}
          style = { {border :'solid', marginBottom : '50', borderWidth : '3', borderColor : 'black'} }
          onValueChange={(value) => 
            {setSelect(value)
              store.dispatch({type:"SELECTTYPESET" ,set : []});
              store.dispatch({type:'RESET_BASIC_REPAIR_STORE',reset:[]});
              console.log("        :"+value);
              
              store.dispatch({type:'RESET_TYPE_STORE',reset:[]});
              getList(value,0);
              console.log(store.getState().typeStore);

              data.forEach(obj => {
                if(value === obj.repair_name){
                  console.log(obj.receiver_name);
                  
                  store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStoreAdd: {key: 0 ,basicSend :obj.receiver_name}});
                  
                  console.log("+++"+store.getState().basicRepairStore);
                  
                }

              });
             
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
      </Container>
  )
}

export default ShopStepThree;