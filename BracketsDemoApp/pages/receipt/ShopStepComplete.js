import React from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../../components/StateBarSolid';
import TopInfo from '../../components/TopInfo';
import Bottom from '../../components/Bottom'
import store from '../../store/store';
import { Modal, StyleSheet, View, Pressable,
        Image, Text, ScrollView } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import ip from '../../serverIp/Ip';
import {useNetInfo}from "@react-native-community/netinfo";


const Label = styled.Text`
    font-size: 15px;
    color:#000000;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;

const RegistText= styled.Text`
    font-weight: bold;
    font-size: 30px;
    color:#000000;
    margin-bottom:10px;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#78909c;
`;
const GrayText = styled.Text`
    font-size: 17px;
    color:#858585;
`;

const PrView = styled.View`
    flex-direction: row;
    justify-content:center;
    align-items: center;
`;
const TopStateView = styled.View`
    
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;
const InfoView =styled.View`
    width: 70%;
    border:2px solid  #78909c;
    border-radius:12px;
    align-items: center;
    padding:15px;
    margin-bottom: 15px;
`;
const DataView = styled.View`
    width: 100%;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const TouchableView = styled.TouchableOpacity`
    align-items: center;
    flex-direction:row;
    justify-content:space-between;
    width: 100%;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const ImgIcon =styled.Image`
    width: 25px;
    height: 20px;
    margin-right:10px;
`;
const CodeViewText = styled.Text`
    font-size: 20px;
    color:#ffffff;
`;
const CodeView = styled.View`
    align-items: center;
    margin: 12px;
    width: 300px;
    background-color:#78909c;
    border-radius:8px;
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
          paddingTop: 8,
          paddingBottom: 8,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
        },
        ViewCenter:{
            justifyContent: "center",
            alignItems: "center",
        }
      });
// 구조 분해 할당, Destructuring Assignment
function ShopStepOne( { navigation } ) {
    const [barcode, setBarcode] = React.useState(store.getState().cardValue);
    const [bag, setBag] = React.useState(store.getState().bagCodeValue);
    

    const cardImgUri = store.getState().card;
    const bagImgUri =store.getState().bagPicture;


    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible2, setModalVisible2] = React.useState(false);

    const sendForRepir =store.getState().basicRepairStore;
    const [repairShop,setRepairShop] =React.useState(null);
    

    
    const netInfo = useNetInfo();
    
    React.useEffect(()=>{
        setRepairShop(sendForRepir)
    },[]);
    
    const submitReceipt = async (receipt_id,bag_code) => {
        var formdata = new FormData();

        formdata.append("receipt", receipt_id);
        formdata.append("mailbag", bag_code);
        console.log(formdata)

        try {
            const response = await fetch(ip+'/api/submitReceipt',{method: 'POST',
            headers: {
                'Accept': '',
                'Content-Type': 'multipart/form-data'
                },
            body: formdata
            });
            const json = await response.json();
            console.log(json)
           
        } catch (error) {
            console.error(error);
        } finally {

        }
    }
    


    return (
        <Container>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/></TopStateView>
            <TopInfo></TopInfo>
            <CenterText>
                
                
                <Image source={require('../../Icons/complete_blue.png')} style={{width:60,height:60,marginBottom:10}}></Image>
                <RegistText>접수 완료</RegistText>
                <PrView><BlueText>완료</BlueText><GrayText> 버튼을 누르시면</GrayText></PrView>
                <PrView><BlueText>수선 접수</BlueText><GrayText> 가</GrayText><BlueText> 완료</BlueText><GrayText> 됩니다</GrayText></PrView>

            </CenterText>
            
            <InfoView>
                <GrayText>서비스 카드 번호</GrayText>

                
                    
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
                            <CodeView><CodeViewText>{barcode}</CodeViewText></CodeView>
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
                    
                    
                    
                    
                    <TouchableView onPress={() => setModalVisible(!modalVisible)}><Label>{barcode}</Label><ImgIcon source={require('../../Icons/image.png')}/></TouchableView>
                   
                <GrayText>받는 곳</GrayText>
                <DataView><Label>{repairShop}</Label></DataView>
                <GrayText>행낭 바코드</GrayText>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {
                        setModalVisible2(!modalVisible2);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style ={styles.xView} >    
                        <View style={styles.modalView} >
                        <CodeView><CodeViewText>{bag}</CodeViewText></CodeView>
                            <ImageZoom cropWidth={320}
                                    cropHeight={400}
                                    imageWidth={300}
                                    imageHeight={400}>
                                    <Image style={{width:300, height:400}}
                                    source={{uri:bagImgUri}}/>
                            </ImageZoom>
                            
                        </View>
                        </View>
                        </View>
                    </Modal>
                <TouchableView onPress={() => setModalVisible2(!modalVisible)}><Label>{bag}</Label><ImgIcon source={require('../../Icons/image.png')}/></TouchableView>
                
            </InfoView>  
            <Button onPress={ ()=>{
                    if(netInfo.isConnected){
                        submitReceipt(store.getState().receipt_id,bag)
                        store.dispatch({type:"STORE_CLEAR"})
                        navigation.popToTop()
                    }else{
                        alert("네트워크 연결 실패\n 연결 상태를 확인해주세요")
                    }
                    
                }}>
                완료
            </Button>
            <Bottom navigation={navigation}/>
        </Container>
    )
}

export default ShopStepOne;