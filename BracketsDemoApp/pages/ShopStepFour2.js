import React from 'react';
import Contents from '../components/Contents';
import ButtonBlack from '../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import Bottom from '../components/Bottom';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions,Button} from 'react-native';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../store/store';
import ImageZoom from 'react-native-image-pan-zoom';

const TouchableView = styled.TouchableOpacity`
    width: 100%;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
`;
const DateView = styled.View`
    width: 100%;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
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

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function useInput() {
    const [date, setDate] = React.useState(new Date());
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
    }
    return {
        date,
        showDatepicker,
        show,
        mode,
        onChange
    }
}

function ShopStepFour2({navigation}) {
    const dateInput1 = useInput(new Date())
    const dateInput2 = useInput(new Date())
      

    const [barcode, setBarcode] = React.useState(store.getState().cardValue);
    store.dispatch({type:'SERVICECAED',value:barcode});
    
    const [modalVisible, setModalVisible] = React.useState(false);
    
    const cardImgUri =store.getState().card;


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
      
    console.log(store.getState().requirement)
    return (
        <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/></TopStateView>
            <View style={{width:'100%',flexDirection:"row",justifyContent:"space-around",marginBottom:10}}>
                <View style={{flexDirection:"row"}}><Text style={{fontWeight: "bold",fontSize:15}}>{store.getState().receptionDivision.name}</Text><Text  style={{fontWeight: "bold",fontSize:15}}> : </Text>
                    <Text  style={{fontWeight: "bold",fontSize:15}}>{store.getState().requirement.name}</Text>
                </View>
                <Text>   </Text>
                <View style={{flexDirection:"row"}}><Text style ={{fontWeight:"bold"}}>홍길동</Text><Text> 님 진행중</Text></View>
            </View>
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
                    <ImgIcon source={require('../Icons/calendar.png')}/>
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
                <Label> 고객 약속일</Label>
                <TouchableView onPress={dateInput2.showDatepicker}>
                    <PrView>
                    <Label>{dateInput2.date.getFullYear()}년  {dateInput2.date.getMonth()+1}월  {dateInput2.date.getDate()}일</Label>
                    <ImgIcon source={require('../Icons/calendar.png')}/>
                    </PrView>
                </TouchableView>
                    {dateInput2.show && (
                        <DateTimePicker
                        testID="dateTimePicker2"
                        value={dateInput2.date}
                        mode={dateInput2.mode}
                        is24Hour={true}
                        display="default"
                        onChange={dateInput2.onChange}
                        />
                    )}
  
                

                </InfoView>
                <View style ={{margin:30}}/>
            </Contents>
            <CenterView>
                <ButtonBlack onPress={ ()=>
                    navigation.navigate( 'ShopStepFive' ) }>
                    다음: 5단계
                </ButtonBlack>
            </CenterView>
            <Bottom navigation={navigation}/>
        </ContainView>
    )
    
}

export default ShopStepFour2;