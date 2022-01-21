import React, { useState, useCallback } from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import Bottom from '../../components/Bottom';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import ContainView from '../../components/ContainView';
import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../../store/store';
import axios from 'axios';
import ip from '../../serverIp/Ip';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
    border:2px solid #78909c;
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
    border:2px solid #78909c;
`;
const styles = StyleSheet.create({
  viewHandle: {

    width: (Dimensions.get('window').width) * 0.75,
    marginBottom: 10,
  },
  Lavel: {
    fontSize: (Dimensions.get('window').width) * 0.04,
    margin: 10,
    color: "#000000"
  },
})

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
    reDate
  }
}


function LookupPage({ navigation }) {

  const [name, setName] = useState(null)
  const [pNumber, setPnumber] = useState(null);
  const cal = '../../Icons/calendar.png';
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const customers = [];
  const dateForm =  new Date()
  console.log(dateForm)
  dateForm.setDate(1)
  console.log(dateForm)
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

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
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


  const parseData = (body) => {

    for (let i = 0; i < body.length; i++) {
      console.log(body[i].name);
      console.log(body[i].phone);
      customers.push({ cName: body[i].name, cPhone: body[i].phone, cId: body[i].customer_id })
      console.log(customers)
    }
  }

  const getData = useCallback(async (std, edd, name, phone) => {

    console.log("press")
    console.log(name)
    console.log(std)

    const { data } = await axios.get(ip + "/api/lookup", {
      params: {
        customerName: name,
        lastphone: phone,
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
          <View style={styles.viewHandle}><BlackText> 매장 접수일</BlackText></View>

          <PxView>
            <TouchableView onPress={
              // startDate.showDatepicker
              Platform.OS === 'ios' ? (
                showDatePickerFirst
              ): (
                startDate.showDatepicker
                )
              }>
              <PrView>
                <View style={{ flex: 1, minHeight: 40, minWidth: 35 }}><Text style={styles.Lavel}>{startDate.reDate}</Text></View>
                <View style={{ flex: 0.2 }}><ImgIcon source={require(cal)} /></View>
              </PrView>
            </TouchableView>

            {startDatePicker}

            
            <View style={{ justifyContent: "center", alignItems: "center", margin: "1%" }}><Text>~</Text></View>


            <TouchableView onPress={
              // startDate.showDatepicker
              Platform.OS === 'ios' ? (
                showDatePickerSecond
              ): (
                endDate.showDatepicker
              )
              }>
              <PrView>
                <View style={{ flex: 1, minHeight: 40, minWidth: 35 }}><Text style={styles.Lavel}>{endDate.reDate}</Text></View>
                <View style={{ flex: 0.2 }}><ImgIcon source={require('../../Icons/calendar.png')} /></View>
              </PrView>
            </TouchableView>

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
          getData(startDate.reDate, endDate.reDate, name, pNumber);
          //navigation.navigate('LookupPage2')


        }}>
          조회
        </Button>
        <Bottom navigation={navigation} />
      </Container>
    </TouchableWithoutFeedback>
  )
}
export default LookupPage;