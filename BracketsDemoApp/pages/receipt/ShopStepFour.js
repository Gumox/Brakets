import React,{useState,useEffect} from 'react';
import Contents from '../../components/Contents';
import ButtonBlack from '../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import TopInfo from '../../components/TopInfo';
import Bottom from '../../components/Bottom';
import {Alert, Image, View,Text, StyleSheet,Modal ,Pressable,Dimensions,Button, Platform} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import store from '../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import { split } from 'lodash';
import ip from '../../serverIp/Ip';
import checkServiceCard from '../../Functions/checkServiceCard';
import {useNetInfo}from "@react-native-community/netinfo";

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function ShopStepFour({navigation,route}) {
    const service_date =store.getState().serviceDate;
    const [dateInput2,setDateInput2] = useState(new Date().addDays(service_date))
    const [barcode, setBarcode] = React.useState(store.getState().cardValue);
    store.dispatch({type:'SERVICECAED',value:barcode});
    const [modalVisible, setModalVisible] = React.useState(false);   
    const cardImgUri =store.getState().card;
    const netInfo = useNetInfo();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    console.log(Dimensions.get("screen").height)
    console.log(Dimensions.get("window").height)

    const useInput=(inputDate)=> {
        let date = inputDate
        const [mode, setMode] = React.useState('date');
        const [show, setShow] = React.useState(false);
    
        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };
        const showDatepicker = () => {
            showMode('date');
        };

        const showDatePickerIos = () => { setDatePickerVisibility(true); };

        const hideDatePicker = () => { setDatePickerVisibility(false); };
        
        const handleConfirm = (selectedDate) => {
            const currentDate = selectedDate || date
            setShow(Platform.OS === 'ios');
            date = currentDate
            setDateInput2(currentDate.addDays(service_date))
            hideDatePicker();
        };
    
        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date
            setShow(Platform.OS === 'ios');
            date = currentDate
            setDateInput2(currentDate.addDays(service_date))
        }
        return {
            date,
            showDatepicker,
            show,
            mode,
            onChange,
            handleConfirm,
            hideDatePicker,
            showDatePickerIos
        }
    }
    const dateInput1 = useInput(new Date())

    

    const updateReceipt = async (receipt_id,code,receiptdate,duedate,tof) => {
        const formdata = new FormData();

        formdata.append("step", "4");
        formdata.append("receipt", receipt_id);
        formdata.append("code", code);
        formdata.append("receiptdate", receiptdate);
        formdata.append("duedate", duedate);
        console.log(formdata)

        try {
            const response = await fetch(ip+'/api/updateReceipt',{method: 'POST',
            headers: {
                'Accept': '',
                'Content-Type': 'multipart/form-data'
                },
            body: formdata
            });
            const json = await response.json();
            console.log(json)
            if(tof){
                navigation.navigate( 'ShopStepFive' ) 
            }else{
                navigation.navigate( 'ShopStepComplete' ) 
            }
        } catch (error) {
            console.error(error);
        } finally {

        }
    }
    useEffect(()=>{
        const fetch =async()=>{
            const checkService = await checkServiceCard(barcode)
            console.log("checkService: ")
            console.log("checkService: ",checkService)
            console.log("checkService: ")
            if(checkService.message){
                Alert.alert("이미 등록된 서비스 카드 입니다.","",[{ text: "확인"}])
                navigation.goBack();
            }
        }
        fetch()
        
    })

    let dataPicker;

    if(Platform.OS === 'ios'){
        console.log("ios")
        dataPicker = (
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={dateInput1.handleConfirm}
            onCancel={dateInput1.hideDatePicker}
            locale='ko-kr'
          />
        )
      }
      else{
        console.log("and")
        dataPicker = ((dateInput1.show) && (
            <DateTimePicker
                testID="dateTimePicker"
                value={dateInput1.date}
                mode={dateInput1.mode}
                is24Hour={true}
                display="default"
                onChange={dateInput1.onChange}
            />
        ))
      }

      
    return (
        <ContainView style= {{backgroundColor:"#ffffff"}}>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
            <TopInfo></TopInfo>
            <Contents>
                
                <CenterView><TopIntro>서비스 카드 정보</TopIntro></CenterView>
                <InfoView>
                {cardImgUri&&(
                    <CenterView>
                        
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            setModalVisible(!modalVisible);
                            }}
                        >
                            <CenterCardView onPress={()=>{setModalVisible(!modalVisible);}}>
                            

                            <View style={styles.modalView} >
                                
                                <ImageZoom cropWidth={320}
                                        cropHeight={400}
                                        imageWidth={300}
                                        imageHeight={400}
                                        style={{marginTop:20}}
                                        >
                                        <Image style={{width:300, height:400}}
                                        source={{uri:cardImgUri}}/>
                                </ImageZoom>
                                <CloseBtn style={{marginTop: 5}}>
                                    <CodeViewText style={{color: "rgb(0,80,130)", fontSize: 20}} onPress={() => setModalVisible(!modalVisible)}>
                                        닫기
                                    </CodeViewText>
                                </CloseBtn>
                                
                            </View>
                            </CenterCardView>
                        </Modal>
                        
                        
                        <Pressable  onPress={() => setModalVisible(!modalVisible)}>
                            <Image
                            style ={{width:200,height:200}}
                            source={{uri:cardImgUri}}
                            />
                        </Pressable>
                    
                    </CenterView>
                )}

                <Label> 서비스 카드 바코드</Label>
                <Input value ={barcode}/>
                <Label> 매장 접수일</Label>
                <TouchableView onPress={
                    (Platform.OS === 'ios') ? (dateInput1.showDatePickerIos) : (dateInput1.showDatepicker)
                    }>
                    <PrView>
                    <Label>{dateInput1.date.getFullYear()}년  {dateInput1.date.getMonth()+1}월  {dateInput1.date.getDate()}일</Label>
                    <ImgIcon source={require('../../Icons/calendar.png')}/>
                    </PrView>
                </TouchableView>
                    

                    {dataPicker}

                <PrView><Label> 고객 약속일 </Label><LabelPlus>+{service_date}일</LabelPlus></PrView>
                <TouchableView >
                    <PrView>
                    <Label>{dateInput2.getFullYear()}년  {dateInput2.getMonth()+1}월  {dateInput2.getDate()}일</Label>
                    </PrView>
                </TouchableView>
                

                </InfoView>
                <View style ={{margin:30}}/>
            </Contents>
            <CenterView>
                <Half>
                    <Btn onPress={ ()=>{

                        if(netInfo.isConnected){
                            const recDate =dateInput1.date.getFullYear()+'-'+(dateInput1.date.getMonth()+1)+'-'+dateInput1.date.getDate();
                            const dueDate =dateInput2.getFullYear()+'-'+(dateInput2.getMonth()+1)+'-'+dateInput2.getDate();

                            updateReceipt(store.getState().receipt_id,barcode,recDate,dueDate,false)

                        }else{
                            Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                        }

                    }}>
                        <Text style ={{color : "#ffffff"}}>행낭 없음</Text>
                    </Btn>
                    <Btn onPress={ ()=>{

                        if(netInfo.isConnected){
                            const recDate =dateInput1.date.getFullYear()+'-'+(dateInput1.date.getMonth()+1)+'-'+dateInput1.date.getDate();
                            const dueDate =dateInput2.getFullYear()+'-'+(dateInput2.getMonth()+1)+'-'+dateInput2.getDate();

                            updateReceipt(store.getState().receipt_id,barcode,recDate,dueDate,true)

                        }else{
                            Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                        }

                    }}>
                        <Text style ={{color : "#ffffff"}}>다음: 5단계</Text>
                    </Btn>
                </Half>
            </CenterView>
            <Bottom navigation={navigation}/>
        </ContainView>
    )
    
}

export default ShopStepFour;


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor:"rgba(230,230,230,0.5)",
      
    },
    
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 10,
      paddingRight: 5,
      paddingLeft: 5,
      paddingTop: 15,
      paddingBottom: 15,
      alignItems: "center",
      shadowColor: "#000",
      borderColor:"rgb(0,80,130)",
      borderStyle:"solid",
      borderWidth:2
    }
});
const CenterCardView = styled.Pressable`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    marginTop: 22px;
`;

const CodeViewText = styled.Text`
    font-size: 20px;
    color:#ffffff;
`;
const CodeView = styled.View`
    align-items: center;
    margin: 12px;
    width: 300px;
    background-color:rgb(0,80,130);
    border-radius:8px;
`;
const CloseBtn = styled.TouchableOpacity`
    /* width: 50px; */
    /* height: 50px; */
`;
const TouchableView = styled.TouchableOpacity`
    width: 100%;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const Label = styled.Text`
    color:#000000;
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const LabelPlus = styled.Text`
    font-size: 12px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
    color:#0000ff;
    margin-right: 10%;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
`;
const Input = styled.TextInput`
    color:#000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    color:#000000;
    margin: 15px;
`;
const DateView = styled.View`
    width: 100%;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
    margin:10px;
`;
const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;
const InfoView =styled.View`
    width: 100%;
    border:2px solid  rgb(0,80,130);
    border-radius:12px;
    
    padding:15px;
`;

const Half = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;  
`;
const Btn = styled.TouchableOpacity`
    width : 40%;
    height: 50px;
    background: rgb(0,80,130);
    justify-content: center;
    align-items: center;
    margin:15px;
    border-radius:12px;    
`;