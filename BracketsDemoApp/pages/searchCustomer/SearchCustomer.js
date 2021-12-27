import React ,{useState}from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import Bottom from '../../components/Bottom';
import CustomerSearchBox from './CustomerSearchBox';
import CustomSearch from './CustomSearch';
import { Alert } from 'react-native';
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
    border-radius:10px
`;
// 구조 분해 할당, Destructuring Assignment
function SearchCustomer( { navigation } ) {

  const [pNumber,setPnumber] = useState(null);

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const items =[];
  const parseData=(body)=>{
  
        
    for (let i = 0; i < body.length; i++) {
        console.log(body[i].name);
        console.log(body[i].phone);
        items.push({name:body[i].name + " : "+body[i].phone,cName:body[i].name,cPhone:body[i].phone})
        console.log(items)
    }

}
  const getCustomer = async (bodyData) => {
            
    try {
        const response = await fetch('http://13.125.232.214/api/getCustomer ',{method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(bodyData)
        });
        const json = await response.json();
        setData(json.body);
        console.log(json.body);
        parseData(json.body);
        setLoading(false);
    
    } catch (error) {
        
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
              getCustomer({"lastphone":pNumber})
              console.log("ㅇㅇㅇㅇ");
              console.log(data);
              //navigation.navigate('CustomerInfo')
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