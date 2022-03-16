import React,{useState,useEffect} from 'react';
import Contents from '../../components/Contents';
import ButtonBlack from '../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import TopInfo from '../../components/TopInfo';
import Bottom from '../../components/Bottom';
import {Alert, Image, View,Text, StyleSheet,Modal ,Pressable,Dimensions,Button} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import DateTimePicker from '@react-native-community/datetimepicker';
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

function ShopStepFour({navigation}) {
    const service_date =store.getState().serviceDate;
    
    const [dateInput2,setDateInput2] = useState(new Date().addDays(service_date))
      

    const [barcode, setBarcode] = React.useState(store.getState().cardValue);
    store.dispatch({type:'SERVICECAED',value:barcode});
    
    const [modalVisible, setModalVisible] = React.useState(false);
    
    const cardImgUri =store.getState().card;

  
    const netInfo = useNetInfo();
    

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
            setDateInput2(currentDate.addDays(service_date))
        }
        return {
            date,
            showDatepicker,
            show,
            mode,
            onChange
        }
    }
    const dateInput1 = useInput(new Date())

    

    const updateReceipt = async (receipt_id,code,receiptdate,duedate) => {
        var formdata = new FormData();

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
            navigation.navigate( 'ShopStepFive' ) 
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
                alert("이미 등록된 서비스 카드 입니다.")
                navigation.goBack();
            }
        }
        fetch()
        
    })
      
    return (
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
            <TopInfo></TopInfo>
            <Contents>
                
                <CenterView><TopIntro>서비스 카드 정보</TopIntro></CenterView>
                <InfoView>
                <CenterView>
                    
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style ={styles.xView} >    
                        <View style={styles.modalView} >
                            
                            <ImageZoom cropWidth={320}
                                    cropHeight={400}
                                    imageWidth={300}
                                    imageHeight={400}>
                                    <Image style={{width:300, height:400}}
                                    source={{uri:cardImgUri}}/>
                            </ImageZoom>
                            
                        </View>
                        </View>
                        </View>
                    </Modal>
                    
                    
                    <Pressable  onPress={() => setModalVisible(!modalVisible)}>
                        <Image
                        style ={{width:200,height:200}}
                        source={{uri:cardImgUri}}
                        />
                    </Pressable>
                   
                </CenterView>

                <Label> 서비스 카드 바코드</Label>
                <Input value ={barcode}/>
                <Label> 매장 접수일</Label>
                <TouchableView onPress={dateInput1.showDatepicker}>
                    <PrView>
                    <Label>{dateInput1.date.getFullYear()}년  {dateInput1.date.getMonth()+1}월  {dateInput1.date.getDate()}일</Label>
                    <ImgIcon source={require('../../Icons/calendar.png')}/>
                    </PrView>
                </TouchableView>
                
                    {dateInput1.show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={dateInput1.date}
                        mode={dateInput1.mode}
                        is24Hour={true}
                        display="default"
                        onChange={dateInput1.onChange}
                        />
                    )}
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
                <ButtonBlack onPress={ ()=>{

                    if(netInfo.isConnected){
                        const recDate =dateInput1.date.getFullYear()+'-'+(dateInput1.date.getMonth()+1)+'-'+dateInput1.date.getDate();
                        const dueDate =dateInput2.getFullYear()+'-'+(dateInput2.getMonth()+1)+'-'+dateInput2.getDate();

                        updateReceipt(store.getState().receipt_id,barcode,recDate,dueDate)
                    
                    }else{
                        alert("네트워크 연결 실패\n 연결 상태를 확인해주세요")
                    }
                    
                }}>
                    다음: 5단계
                </ButtonBlack>
            </CenterView>
            <Bottom navigation={navigation}/>
        </ContainView>
    )
    
}

export default ShopStepFour;

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
    border:2px solid  #78909c;
    border-radius:12px;
    
    padding:15px;
`;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    xView:{
        backgroundColor: "#78909c",
        borderRadius: 20,
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      paddingRight: 5,
      paddingLeft: 5,
      paddingTop: 15,
      paddingBottom: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
    }
  });