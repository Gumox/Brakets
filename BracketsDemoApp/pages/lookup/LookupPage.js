import React, {useCallback ,useState,useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';
import { 
  ScrollView ,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Image,
  View,
  Dimensions,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Pressable,
  Alert
} from 'react-native';
import ip from '../../serverIp/Ip';
import Bottom from '../../components/Bottom';
import Container from '../../components/Container';
import axios from 'axios';
import {useNetInfo}from "@react-native-community/netinfo";
import LookupInfoCard from '../../components/LookupInfoCard';

import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../../store/store';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBoxText from '../../components/CheckBoxText';
import NetworkLoading from '../../components/NetworkLoading';


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
function LookupPage({ route,navigation }) {

    const scrollMinSize =(Dimensions.get('window').height)*0.
    const [data, setData] = useState([]);
    
    const [name, setName] = useState(null)
    const [pNumber, setPnumber] = useState(null);
    const shopId = store.getState().store_id;
    const cal = '../../Icons/calendar.png';
    const [isLoading, setLoading] = useState(true);
    const customers = [];
    
    const [modalVisible, setModalVisible] = useState(false);   

    const dateForm =  new Date()

    dateForm.setDate(1)
    const [dateCheck,setDateCheck] = useState(true)
    const startDate = useInput(dateForm);
    const endDate = useInput(new Date());

    
    const [doReciptCheck,setDoReciptCheck] = useState(true)
    const [compliteReceiptCheck,setCompliteReceiptCheck] = useState(true)
    const [takeReciptCheck,setTakeReciptCheck] = useState(true)
  
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
  
  
    const getData = useCallback(async (code,std, edd, name, phone,shopId,doReciptCheck,compliteReceiptCheck,takeReciptCheck) => {
      
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
          endDate: edd,
          code:code
        },
      })
      let sData =[]
      for(let item of data.data){
        if(doReciptCheck && item["step"] == 0){
          console.log("???")
          sData.push(item)
        }
        if(compliteReceiptCheck && item["step"] == 1){ 
          sData.push(item)
        }
        if(takeReciptCheck && item["step"] == 2 ){
          sData.push(item)
        }
        if(item["step"] == 4){
          sData.push(item)
        }
        if(item["step"] == 5){
          sData.push(item)
        }
        if(item["step"] == 6){
          sData.push(item)
        }
        if(item["step"] == 7){
          sData.push(item)
        }
        if(item["step"] == 8){
          sData.push(item)
        }

      }
      
      setData( sData)
      setVisable(false)
    }, []);
  
    const netInfo = useNetInfo();
    
    const checkBoxEvent =()=>{
      startDate.setReDate(null)
      endDate.setReDate(null)
      /*if(dateCheck){
        setDateCheck(!dateCheck)
      }else{
        setDateCheck(!dateCheck)
      }*/
    }

    const doReciptCheckEvent =()=>{
      if(doReciptCheck){
        setDoReciptCheck(!doReciptCheck)
      }else{
        setDoReciptCheck(!doReciptCheck)
      }
    }

    const compliteReceiptCheckEvent =()=>{
      if(compliteReceiptCheck){
        setCompliteReceiptCheck(!compliteReceiptCheck)
      }else{
        setCompliteReceiptCheck(!compliteReceiptCheck)
      }
    }

    const takeReciptCheckEvent =()=>{
      if(takeReciptCheck){
        setTakeReciptCheck(!takeReciptCheck)
      }else{
        setTakeReciptCheck(!takeReciptCheck)
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

    const getImages = useCallback(async (code,obj) => {

        console.log("press")
        const { data } = await axios.get(ip+"/api/lookup/images", {
          params: { 
            code: code
          },
        })
        navigation.navigate('LookupInfo',{data:obj,images: data.data,needImages:data.needImages})
        setVisable(false)
    }, []);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = (tof) => {
      let toValue = Dimensions.get('window').height*0.35
      if(tof){
        toValue = 0

      }
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: -toValue,
        duration: 250,
        useNativeDriver: true,
      }).start();

      setModalVisible(!tof)
    };
    
    
    useEffect(()=>{
      const code = route.params.code
      if(code){
        setVisable(true)
        getData(code,null,null, null, null,shopId,true,true,true)
                      
      }
      
    },[])
    const [visable,setVisable]= useState(false)
    return (
        
        <Container style= {{backgroundColor:"#ffffff"}}>
            
            {/* <Title>조회 결과</Title>*/}
            <CenterText >
            <View style={{width: Dimensions.get('window').width*0.9,marginTop:10}}>
              <Text style={{color:"#000000"}}>매장 접수일</Text>
            </View>
            
            <PxView>
              
              <PrView>
                
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
                    <View style={{ flex: 1,  minWidth: 35 }}><Text style={styles.Lavel}>{startDate.reDate}</Text></View>
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
                    <View style={{ flex: 1,  minWidth: 35 }}><Text style={styles.Lavel}>{endDate.reDate}</Text></View>
                    <View style={{ flex: 0.2 ,marginRight:5}}><ImgIcon source={require('../../Icons/calendar.png')} /></View>
                  </PrView>
                </TouchableOpacity>

                {endDatePicker}
                {/* {endDate.show &&  */}
              </PrView>
              <IconButton onPress ={()=>{
                        if(netInfo.isConnected){
                          setVisable(!visable)
                          getData(null,startDate.reDate, endDate.reDate, name, pNumber,shopId,doReciptCheck,compliteReceiptCheck,takeReciptCheck)
                        }else{
                            Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                        }
                      }}>
              <Image style={{width:20,height:20}} source={require('../../Icons/search.png')}/>
            </IconButton>
          </PxView>
            <FilterView>
              <TouchableOpacity style={styles.filter} onPress={() => fadeIn(modalVisible)}>
                <Text style={{color:"#000000"}}>상세 조회 필터</Text>
              </TouchableOpacity>
              
            </FilterView>       
                
            
            </CenterText>
            <View style={{height:3,margin:5,borderRadius:5,width:"97%",backgroundColor:"rgb(232,232,232)"}}/>
            <View style={{backgroundColor:"rgb(232,232,232)",width:"97%",height: "65%"}}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <LookupInfoCard data ={item} onPress={() => {
                            if(netInfo.isConnected){
                                setVisable(true)
                                getImages(item["receipt_code"],item)
                            }else{
                                Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                            }
                        }}></LookupInfoCard>
                    )}
                    //Setting the number of column
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                />
            </View>
            <NetworkLoading visable={visable} setVisable={setVisable}/>
            <Bottom navigation={navigation} />
            <Animated.View
              style={[
                styles.fadingContainer,
                {
                  // Bind opacity to animated value
                  translateY: fadeAnim
                }
              ]}
            >
              <View style ={styles.bottomView} >    
                  <View style={styles.modalView} >
                      
                   <LaView>
                   <DropBackground style={{borderBottomWidth:2,borderBottomColor:"#000000",borderStyle:"solid"}}>
                      <Input
                          placeholder={"고객명"}
                          placeholderTextColor="rgba(0,0,0,0.5)" 
                          style={{fontSize:16}}
                          value ={name}
                          onChangeText={(value) => {
                          console.log(value)
                          setName(value)
                      }}
                      onSubmitEditing={(event) => (
                          console.log(">>>")
                      )}
                      ></Input>
                    </DropBackground>
                    <DropBackground style={{borderBottomWidth:2,borderBottomColor:"#000000",borderStyle:"solid"}}>
                      <Input
                      maxLength={4}
                      placeholder={"연락처 (뒤 4자리)"}
                      placeholderTextColor="rgba(0,0,0,0.5)" 
                      keyboardType='numeric'
                      style={{fontSize:16}}
                      value={pNumber}
                      onChangeText={(value) => {
                          console.log(value)
                          setPnumber(value)
                      }}
                      onSubmitEditing={(event) => (
                          console.log(">>>")
                      )}
                      ></Input>
                        
                    </DropBackground>
                   </LaView>
                    <LaView>
                      <CheckBoxText
                        {...{checkBoxEvent : doReciptCheckEvent}}
                        checkBoxColor={"red"}
                        check = {doReciptCheck}
                        text={"접수중"}
                      />
                      <CheckBoxText
                        {...{checkBoxEvent:compliteReceiptCheckEvent}}
                        checkBoxColor={"red"}
                        check = {compliteReceiptCheck}
                        text={"접수완료"}
                      />
                      <CheckBoxText
                        {...{checkBoxEvent: takeReciptCheckEvent}}
                        checkBoxColor={"red"}
                        check = {takeReciptCheck}
                        text={"인수완료"}
                      />
                    </LaView>
                    
                  </View>
                  <IconButton style={{width:45,position:"absolute", left:25,bottom:25}} onPress={()=>{
                      navigation.navigate('ScanScreen', {key:'LookupPage'})
                    }}>
                      <Image source={require('../../Icons/barcode.png')} style={{width:32,height:18}}/>
                  </IconButton>
                  <TouchableOpacity style={{position:"absolute",right:25,bottom:30}} onPress={()=>{
                    setData([])
                    checkBoxEvent();
                    setName();
                    setPnumber();
                    setDoReciptCheck(true);
                    setCompliteReceiptCheck(true);
                    setTakeReciptCheck(true);
                    }}>
                    <Text style={{color:"#000"}}>
                      초기화
                    </Text>
                  </TouchableOpacity>
                </View>
            </Animated.View>
        </Container>
    )
}
export default LookupPage;

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
      fontSize: 16,
      margin:7,
      color: "#000000",
    },
    fadingContainer: {
      zIndex:20,
      position:"absolute",
      borderTopColor:"rgba(0,0,0,0.1)",
      borderTopWidth:2,
      borderStyle:"solid",
      bottom:-Dimensions.get('window').height*0.35,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height*0.3,
    },
    touchableView :{
      
      width: "40%",
      minWidth:125,
      height:40,
      fontSize:10,
      fontColor:"#ffffff",
      borderBottomWidth:2,
      borderStyle: "solid",
    },
    selectOptions:{
      height:50,
      position:"absolute",
      right:15,
      top:15,
    },
    filter:{
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    topView:{
      flex:1,
      width:"100%",
    },
    bottomView:{
      flex:1,
      width:"100%",
      backgroundColor: "#ffffff",
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
    },

  })
const CenterText = styled.View`
    flex: 1;
    padding: 24px;
    justify-content: center;
    align-items: center;
    minHeight :120px;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    color :#000000;
`;
const FilterView = styled.View`
  width:${(Dimensions.get('window').width)*0.9}px;
  marginTop:5px;
  marginBottom:5px;
  flex-direction: row-reverse;
`;

const PrView = styled.View`
    flex-direction: row;
    width: 95%;
    height:50px;
`;
const LaView = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height:50px;
`;
const DropBackground = styled.View`
    minWidth: 130px;
`;
const IconButton =styled.TouchableOpacity`
  width:35px;
  height:35px;
  justify-content: center;
  align-items: center;
  borderRadius:10px;
  background-color:rgb(0,80,150);

`
const PxView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 300px;
`;

const ImgIcon = styled.Image`
    width: 18px;
    height: 18px;
    marginTop:9px;
    marginBottom:9px;
`;