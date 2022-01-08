import React ,{useState}from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import Bottom from '../../components/Bottom';
import { Alert } from 'react-native';
import store from '../../store/store';
const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;

const BlackText = styled.Text`
  margin-Top : 15px ;
  font-size : 15px;
  color : black;
`;
const DropBackground= styled.View`
    width: 300px;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid #78909c;
    margin-top:10px;
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border-radius:10px;
`;

// 구조 분해 할당, Destructuring Assignment
function SearchCustomer( { navigation } ) {

  const [pNumber,setPnumber] = useState(null);

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const customers =[];
  const parseData=(body)=>{
  
        
    for (let i = 0; i < body.length; i++) {
        console.log(body[i].name);
        console.log(body[i].phone);
        customers.push({cName:body[i].name,cPhone:body[i].phone,cId: body[i].customer_id});
        console.log(customers);
    }

}
  const getCustomer = async (bodyData) => {
            
    try {
        const response = await fetch('http://34.64.182.76/api/getCustomer ',{method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(bodyData)
        });
        console.log(response.body.data);
        const json = await response.json(); // !!!
        setData(json.body);
        console.log(json.body);
        parseData(json.body);
        setLoading(false);
        console.log("?????-------*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-")
        navigation.navigate('CustomerSearchList',{customers:customers})
    } catch (error) {
        console.log(error)
        console.log("?????-------")
    } finally {
        setLoading(false);
    }
}

  return (
      <Container>
          <CenterText>
              <Title>고객 조회</Title>
          
            <BlackText>연락처 (뒤 4자리)</BlackText>
            <DropBackground>
            <Input
              maxLength={4}
              keyboardType='numeric'
              onChangeText={(value)=> {
                console.log(value)
                setPnumber(value)
              }}
              onSubmitEditing = {(event) => (getCustomer({"lastphone":pNumber}))}
            ></Input>
            </DropBackground>
          </CenterText>

          <Button onPress = {() =>{ 
            if(pNumber != null&&pNumber.length>3){

              setData([]);
              console.log(data);
              store.dispatch({type:'CUSTOMER_SIGN',customerSign: ""});
              getCustomer({"lastphone":pNumber})
              
             
            }
            else {
              Alert.alert(            
                "",             
                "연락처 (뒤 4자리)를 입력하세요",                   
                [                              
                    { text: "확인"},
                ]
            )
            }
            

            }}>
            조회
          </Button>
          <Bottom navigation={navigation}/>
      </Container>
  )
}
export default SearchCustomer;