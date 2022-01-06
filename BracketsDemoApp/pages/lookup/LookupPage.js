import React ,{useState,useCallback}from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import Bottom from '../../components/Bottom';
import { StyleSheet,Alert ,TouchableHighlight,Text, View, Dimensions} from 'react-native';
import ContainView from '../../components/ContainView';
import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../../store/store';
import axios from 'axios';
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
  const [date, setDate] = useState(inputDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [reDate, setReDate] = useState(null);
 
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
    setReDate(formatDate(currentDate))
      
  }
  const  formatDate = (inputDate)=> {
    var month = '' + (inputDate.getMonth() + 1),
        day = '' + inputDate.getDate(),
        year = inputDate.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    const value = [year, month, day].join('-');
    return value
  }
  return {
      date,
      showDatepicker,
      show,
      mode,
      onChange,
      formatDate,
      reDate
  }
}





function LookupPage( { navigation } ) {
  const [name,setName] = useState(null)
  const [pNumber,setPnumber] = useState(null);

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const customers =[];
  const startDate = useInput(new Date().addDays(-30))
  const endDate = useInput(new Date().addDays(30))
  
  const parseData=(body)=>{
  
        
    for (let i = 0; i < body.length; i++) {
        console.log(body[i].name);
        console.log(body[i].phone);
        customers.push({cName:body[i].name,cPhone:body[i].phone,cId: body[i].customer_id})
        console.log(customers)
    }

}
  
  
  const getData = useCallback(async (std,edd,name,phone) => {

    console.log("press")
    console.log(name)
    console.log(std)
    const { data } = await axios.get("http://34.64.182.76/api/lookup", {
      params: { 
        customerName:name,
        lastphone:phone,
        dateOption:"receipt_date",
        dateType: "all",
        startDate: std,
        endDate:edd
      },
    })
    console.log(data.data.length)
    //console.log(data.data)
    navigation.navigate('LookupPage2',{data:data.data})
  }, []);
  

  return (
    <Container>
      <CenterText>
      
        <Label/>
        <View style ={styles.viewHandle}><BlackText> 매장 접수일</BlackText></View>
        
        <PxView>
          <TouchableView onPress={startDate.showDatepicker}>
              <PrView>
              <View style={{flex :1}}><Text style={styles.Lavel}>{startDate.reDate}</Text></View>
              <View style={{flex :0.3}}><ImgIcon source={require('../../Icons/calendar.png')}/></View>
              </PrView>
          </TouchableView>
          {startDate.show && (
                  <DateTimePicker
                  testID="startDateTimePicker"
                  value={startDate.date}
                  mode={startDate.mode}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate)=>{
                     startDate.onChange(event, selectedDate)
                  }}
                  />
              )}
            <View style ={{justifyContent:"center",alignItems:"center",margin:"1%"}}><Text>~</Text></View>
          
          <TouchableView onPress={endDate.showDatepicker}>
              <PrView>
              <View style={{flex :1}}><Text style={styles.Lavel}>{endDate.reDate}</Text></View>
              <View style={{flex :0.3}}><ImgIcon source={require('../../Icons/calendar.png')}/></View>
              </PrView>
          </TouchableView>
          {endDate.show && (
                  <DateTimePicker
                  testID="endDateTimePicker2"
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
          onChangeText={(value)=> {
            console.log(value)
            setName(value)
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
        console.log(startDate.reDate)
        getData(startDate.reDate,endDate.reDate,name,pNumber);
        //navigation.navigate('LookupPage2')
        

        }}>
        조회
      </Button>
      <Bottom navigation={navigation}/>
    </Container>
  )
}
export default LookupPage;