import React, { useState, useCallback } from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import Bottom from '../../components/Bottom';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../../store/store';
import axios from 'axios';
import ip from '../../serverIp/Ip';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useNetInfo}from "@react-native-community/netinfo";
import CheckBoxText from '../../components/CheckBoxText';

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const useInput = (inputDate) => {

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

  const formatDate = (inputDate) => {
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
    setReDate,
    reDate
  }
}


function LookupPage_1({ navigation }) {

  const [name, setName] = useState(null)
  const [pNumber, setPnumber] = useState(null);
  const shopId = store.getState().store_id;
  const cal = '../../Icons/calendar.png';
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const customers = [];
  const dateForm =  new Date()
  dateForm.setDate(1)
  const [dateCheck,setDateCheck] = useState(true)
  const startDate = useInput(dateForm);
  const endDate = useInput(new Date());

  const [isDatePickerVisibleFirst, setDatePickerVisibilityFirst] = useState(false);
  const [isDatePickerVisibleSecond, setDatePickerVisibilitySecond] = useState(false);
  
  const showDatePickerFirst = () => {
    setDatePickerVisibilityFirst(true);
  };

  const showDatePickerSecond = () => {
    setDatePickerVisibilitySecond(true);
  };

  const hideDatePickerFrist = () => {
    setDatePickerVisibilityFirst(false);
  };

  const hideDatePickerSecond = () => {
    setDatePickerVisibilitySecond(false);
  };

  

  const handleConfirmFirst = (date) => {
    startDate.onChange("", date);
    console.log('Start')
    hideDatePickerFrist();
  };

  const handleConfirmSecond = (date) => {
    endDate.onChange("sss", date);
    console.log('End')
    hideDatePickerSecond();
  };


  const getData = useCallback(async (std, edd, name, phone,shopId) => {

    console.log("press")
    console.log(name)
    console.log(std)

    const { data } = await axios.get(ip + "/api/lookup", {
      params: {
        shop: shopId,
        customerName: name,
        customerContact: phone,
        dateOption: "receipt_date",
        dateType: "all",
        startDate: std,
        endDate: edd
      },
    })

    console.log(data.data.length)
    //console.log(data.data)
    navigation.navigate('LookupPage2', { data: data.data })
  }, []);

  const netInfo = useNetInfo();
  
  const checkBoxEvent =()=>{
    if(dateCheck){
      setDateCheck(!dateCheck)
      startDate.setReDate(null)
      endDate.setReDate(null)
    }else{
      setDateCheck(!dateCheck)
    }
  }
  let startDatePicker;
                          
  let endDatePicker;

  if(Platform.OS === 'ios'){
    console.log("ios")
    startDatePicker = (
      <DateTimePickerModal
        isVisible={isDatePickerVisibleFirst}
        mode="date"
        onConfirm={handleConfirmFirst}
        onCancel={hideDatePickerFrist}
        locale='ko-kr'
      />
    )
    endDatePicker = (
    <DateTimePickerModal
        isVisible={isDatePickerVisibleSecond}
        mode="date"
        onConfirm={
          handleConfirmSecond
        }
        onCancel={hideDatePickerSecond}
        locale='ko-kr'
    />
    )
  }else{
    console.log("and")
    startDatePicker = (startDate.show && (
      <DateTimePicker
        testID="startDateTimePicker"
        value={startDate.date}
        mode={startDate.mode}
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
          startDate.onChange(event, selectedDate)
        }}
      />
    ))
    endDatePicker = (endDate.show && (
    <DateTimePicker
      testID="endDateTimePicker2"
      value={endDate.date}
      mode={endDate.mode}
      is24Hour={true}
      display="default"
      onChange={endDate.onChange}
    />))
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        
        
        
        <CenterText>
          <Label />
          <PxView>
            <CheckBoxText
              {...{checkBoxEvent}}
              checkBoxColor={"red"}
              check = {dateCheck}
              text={"매장 접수일"}
            />
          </PxView>
          
          

          <PxView>
            <TouchableOpacity
              disabled={!dateCheck}
              onPress={
              // startDate.showDatepicker
                Platform.OS === 'ios' ? (
                  showDatePickerFirst
                ): (
                  startDate.showDatepicker
                )
              
              } style={styles.touchableView}>
              <PrView>
                <View style={{ flex: 1, minHeight: 40, minWidth: 35 }}><Text style={styles.Lavel}>{startDate.reDate}</Text></View>
                <View style={{ flex: 0.2 ,marginRight:5}}><ImgIcon source={require(cal)} /></View>
              </PrView>
            </TouchableOpacity>

            {startDatePicker}

            
            <View style={{ justifyContent: "center", alignItems: "center", margin: "1%" }}><Text style={{color:"#000000"}}>~</Text></View>


            <TouchableOpacity disabled={!dateCheck}
              onPress={
              // startDate.showDatepicker
                Platform.OS === 'ios' ? (
                  showDatePickerSecond
                ): (
                  endDate.showDatepicker
                )
              } style={styles.touchableView}>
              <PrView>
                <View style={{ flex: 1, minHeight: 40, minWidth: 35 }}><Text style={styles.Lavel}>{endDate.reDate}</Text></View>
                <View style={{ flex: 0.2 ,marginRight:5}}><ImgIcon source={require('../../Icons/calendar.png')} /></View>
              </PrView>
            </TouchableOpacity>

            {endDatePicker}
            {/* {endDate.show &&  */}
          </PxView>

          <Label />
          <View style={styles.viewHandle}><BlackText>고객명</BlackText></View>
          <DropBackground>
            <Input
              onChangeText={(value) => {
                console.log(value)
                setName(value)
              }}
              onSubmitEditing={(event) => (
                console.log(">>>")
              )}
            ></Input>
          </DropBackground>

          <View style={styles.viewHandle}><BlackText>연락처 (뒤 4자리)</BlackText></View>
          <DropBackground>
            <Input
              maxLength={4}
              keyboardType='numeric'
              onChangeText={(value) => {
                console.log(value)
                setPnumber(value)
              }}
              onSubmitEditing={(event) => (
                console.log(">>>")
              )}
            ></Input>
          </DropBackground>
        </CenterText>
        <Label />
        <Button onPress={() => {
          console.log(startDate.reDate)
          if(netInfo.isConnected){
            console.log(startDate.reDate, endDate.reDate)
            getData(startDate.reDate, endDate.reDate, name, pNumber,shopId);
          }else{
            Alert.alert("네트워크 연결 실패\n 연결 상태를 확인해주세요","",{ text: "확인"})
          }
          //navigation.navigate('LookupPage2')


        }}>
          조회
        </Button>
        <Bottom navigation={navigation} />
      </Container>
    </TouchableWithoutFeedback>
  )
}
export default LookupPage_1;

const styles = StyleSheet.create({
  viewHandle: {

    width: (Dimensions.get('window').width) * 0.75,
    marginBottom: 10,
  },
  viewHandle2: {

    width: (Dimensions.get('window').width) * 0.75,
    marginLeft:-50,
  },
  Lavel: {
    fontSize: (Dimensions.get('window').width) * 0.04,
    margin: 10,
    color: "#000000"
  },
  touchableView :{
    
    width: "48%",
    borderRadius:10,
    fontColor:"#ffffff",
    borderWidth:2,
    borderStyle: "solid",
    borderColor: "rgb(0,80,130)",
  },
  selectOptions:{
    height:50,
    position:"absolute",
    right:15,
    top:15,
  }
})
const CheckBoxView =styled.View`
  align-items: center;
  padding:-5px;
  justify-content: center;
`;
const BarCodeIcon =styled.TouchableOpacity`
  width:45px;
  height:45px;
  justify-content: center;
  align-items: center;
  borderRadius:15px;
  background-color:rgba(0,100,200,0.5);

`
const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;
const BlackText = styled.Text`
  margin-Top : 15px ;
  font-size : 15px;
  color : black;
`;
const DropBackground = styled.View`
    width: 300px;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid rgb(0,80,130);
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border-radius:10px;
    color: #000000;
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
const LaView = styled.View`
    flex-direction: row;
    width: 95%
`;
const PxView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 300px;
`;
const ImgIcon = styled.Image`
    width: 20px;
    height: 20px;
    margin:5px;
`;
const TouchableView = styled.TouchableOpacity`
    width: 48%;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid rgb(0,80,130);
`;