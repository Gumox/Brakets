import React ,{useState}from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import Bottom from '../../components/Bottom';
import { StyleSheet,Alert ,TouchableHighlight,Text, View, Dimensions} from 'react-native';
import ContainView from '../../components/ContainView';
import DateTimePicker from '@react-native-community/datetimepicker';
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
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border-radius:10px
`;
const Label = styled.Text`
    font-size: 12px;
    margin:10px;
`;
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%
    justify-content: center;
`;
const PxView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%
`;
const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
    margin:5px;
`;

const TouchableView = styled.TouchableOpacity`
    width: 44%;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid #78909c;
`;

const styles = StyleSheet.create({
  viewHandle: {
      
    width: (Dimensions.get('window').width)*0.75,
    marginBottom:10,
  },
  Lavel:{
    fontSize:(Dimensions.get('window').width)*0.04,
    margin:10,
  },
    
})





Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}





const useInput=(inputDate)=> {
  const [date, setDate] = React.useState(inputDate);
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
  };
  const showDatepicker = () => {
      showMode('date');
  };

  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      console.log(currentDate)
  }
  const  formatDate = ()=> {
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  return {
      date,
      showDatepicker,
      show,
      mode,
      onChange,
      formatDate
  }
}





function LookupPage( { navigation } ) {
  const [pNumber,setPnumber] = useState(null);

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const customers =[];

  const startDate = useInput(new Date())
  const endDate = useInput(new Date().addDays(30))
  console.log(startDate.formatDate());
  const parseData=(body)=>{
  
        
    for (let i = 0; i < body.length; i++) {
        console.log(body[i].name);
        console.log(body[i].phone);
        customers.push({cName:body[i].name,cPhone:body[i].phone,cId: body[i].customer_id})
        console.log(customers)
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
        const json = await response.json();
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
      
        <Label/>
        <View style ={styles.viewHandle}><BlackText> 매장 접수일</BlackText></View>
        
        <PxView>
          <TouchableView onPress={startDate.showDatepicker}>
              <PrView>
              <Text style={styles.Lavel}>{startDate.formatDate()}</Text>
              <ImgIcon source={require('../../Icons/calendar.png')}/>
              </PrView>
          </TouchableView>
          {startDate.show && (
                  <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate.date}
                  mode={startDate.mode}
                  is24Hour={true}
                  display="default"
                  onChange={startDate.onChange}
                  />
              )}
            <View style ={{justifyContent:"center",alignItems:"center",margin:"1%"}}><Text>~</Text></View>
          
          <TouchableView onPress={endDate.showDatepicker}>
              <PrView>
              <Text style={styles.Lavel}>{endDate.formatDate()}</Text>
              <ImgIcon source={require('../../Icons/calendar.png')}/>
              </PrView>
          </TouchableView>
          {endDate.show && (
                  <DateTimePicker
                  testID="dateTimePicker2"
                  value={endDate.date}
                  mode={endDate.mode}
                  is24Hour={true}
                  display="default"
                  onChange={endDate.onChange}
                  />
              )}


        </PxView>
            <Label/>
            
        <View style ={styles.viewHandle}><BlackText>고객명</BlackText></View>
        <DropBackground>
        <Input
          maxLength={4}
          keyboardType='numeric'
          onChangeText={(value)=> {
            console.log(value)
            setPnumber(value)
          }}
          onSubmitEditing = {(event) => (
            console.log(">>>")
            )}
        ></Input>
        </DropBackground>

        <View style ={styles.viewHandle}><BlackText>연락처 (뒤 4자리)</BlackText></View>
        <DropBackground>
        <Input
          maxLength={4}
          keyboardType='numeric'
          onChangeText={(value)=> {
            console.log(value)
            setPnumber(value)
          }}
          onSubmitEditing = {(event) => (
            console.log(">>>")
          )}
        ></Input>
        </DropBackground>
      </CenterText>
      <Label/>      
      <Button onPress = {() =>{ 
        
        navigation.navigate('LookupPage2')
        

        }}>
        조회
      </Button>
      <Bottom navigation={navigation}/>
    </Container>
  )
}
export default LookupPage;