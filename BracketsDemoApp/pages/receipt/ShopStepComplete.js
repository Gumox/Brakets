import React,{useEffect,useState} from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../../components/StateBarSolid';
import TopInfo from '../../components/TopInfo';
import Bottom from '../../components/Bottom'
import store from '../../store/store';
import {
    Modal, StyleSheet, View, Pressable,
    Image, Text, ScrollView, Alert
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import ip from '../../serverIp/Ip';
import { useNetInfo } from "@react-native-community/netinfo";

// 구조 분해 할당, Destructuring Assignment
function ShopStepOne({ navigation , route}) {
    const [barcode, setBarcode] = useState(store.getState().cardValue);
    const [bag, setBag] = useState(store.getState().bagCodeValue);


    const cardImgUri = store.getState().card;
    const bagImgUri = store.getState().bagPicture;


    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const sendForRepir = store.getState().basicRepairStore;
    const [repairShop, setRepairShop] = useState(null);
    const [serviceCardPictureCheck, setServiceCardPictureCheck] = useState(true);
    const [bagPictureCheck, setBagPictureCheck] = useState(true);



    const netInfo = useNetInfo();

    useEffect(() => {
        setRepairShop(sendForRepir)
        if(cardImgUri){
            setServiceCardPictureCheck(false)
        }
        if(bagImgUri){
            console.log("bagImgUri")
            console.log(bagImgUri)
            console.log("bagImgUri")
            setBagPictureCheck(false)
        }
    }, []);

    const submitReceipt = async (receipt_id, bag_code) => {
        let formdata = new FormData();

        formdata.append("receipt", receipt_id);
        formdata.append("mailbag", bag_code);
        console.log(formdata)

        try {
            const response = await fetch(ip + '/api/submitReceipt', {
                method: 'POST',
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
        <>
            <ScrollView style= {{backgroundColor:"#ffffff"}}>
                <TopStateView><StateBarSolid /><StateBarSolid /><StateBarSolid /><StateBarSolid /><StateBarSolid /></TopStateView>
                <TopInfo></TopInfo>
                <CenterText>
                    <Image source={require('../../Icons/complete.png')} style={{ width: 60, height: 60, marginBottom: 10 }}></Image>
                    <RegistText>접수 완료</RegistText>
                    <PrView><BlueText>완료</BlueText><GrayText> 버튼을 누르시면</GrayText></PrView>
                    <PrView><BlueText>수선 접수</BlueText><GrayText> 가</GrayText><BlueText> 완료</BlueText><GrayText> 됩니다</GrayText></PrView>

                </CenterText>
                <InnerView>
                    <InfoView>
                        <GrayText>서비스 카드 번호</GrayText>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                    <CodeView style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <CodeViewText>
                                            {barcode}
                                        </CodeViewText>
                                    </CodeView>
                                    <ImageZoom cropWidth={320}
                                        cropHeight={400}
                                        imageWidth={300}
                                        imageHeight={400}>
                                        <Image style={{ width: 300, height: 400 }}
                                            source={{ uri: cardImgUri }} />
                                    </ImageZoom>
                                    <CloseBtn style={{marginTop: 5}}>
                                        <CodeViewText style={{color: "rgb(0,80,130)", fontSize: 20}} onPress={() => setModalVisible(!modalVisible)}>
                                            닫기
                                        </CodeViewText>
                                    </CloseBtn>
                            </View>
                        </Modal>
                        <TouchableView disabled={serviceCardPictureCheck} onPress={() => setModalVisible(!modalVisible)}><Label>{barcode}</Label>
                        {!serviceCardPictureCheck&&(<ImgIcon source={require('../../Icons/image.png')} />)}
                        </TouchableView>

                        <GrayText>받는 곳</GrayText>
                        <DataView><Label>{repairShop}</Label></DataView>
                        {bag&&(<GrayText>행낭 바코드</GrayText>)}
                        {bag&&(<Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisible2}
                                    onRequestClose={() => {
                                        setModalVisible2(!modalVisible2);
                                    }}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.xView} >
                                            <View style={styles.modalView} >
                                                <CodeView style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                    <CodeViewText>
                                                        {bag}
                                                    </CodeViewText>
                                                </CodeView>
                                                <ImageZoom cropWidth={320}
                                                    cropHeight={400}
                                                    imageWidth={300}
                                                    imageHeight={400}>
                                                    <Image style={{ width: 300, height: 400 }}
                                                        source={{ uri: bagImgUri }} />
                                                </ImageZoom>
                                                <CloseBtn style={{marginTop: 5}}>
                                                    <CodeViewText style={{color: "rgb(0,80,130)", fontSize: 20}} onPress={() => setModalVisible2(!modalVisible2)}>
                                                        닫기
                                                    </CodeViewText>
                                                </CloseBtn>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>)}
                        {bag&&(<TouchableView disabled= {bagPictureCheck} onPress={() => setModalVisible2(!modalVisible)}>
                            <Label>{bag}</Label>
                            {!bagPictureCheck&&(<ImgIcon source={require('../../Icons/image.png')} />)}
                            </TouchableView>)}
                            

                    </InfoView>
                    <Button onPress={() => {
                        if (netInfo.isConnected) {
                            submitReceipt(store.getState().receipt_id, bag)
                            store.dispatch({ type: "STORE_CLEAR" })
                            navigation.popToTop()
                        } else {
                            Alert.alert("네트워크 연결 실패\n 연결 상태를 확인해주세요","")
                        }
                    }}>
                        완료
                    </Button>
                </InnerView>
            </ScrollView>
            <Bottom navigation={navigation} />
        </>

    )
}

export default ShopStepOne;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
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
    },
});

const Label = styled.Text`
    font-size: 15px;
    color:#000000;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;

const RegistText = styled.Text`
    font-weight: bold;
    font-size: 30px;
    color:#000000;
    margin-bottom:10px;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:rgb(0,80,130);
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
const InnerView = styled.View`
    align-items: center;
    justify-content: center;
`;
const InfoView = styled.View`
    width: 70%;
    border:2px solid  rgb(0,80,130);
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
const ImgIcon = styled.Image`
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
    background-color:rgb(0,80,130);
    border-radius:8px;
`;
const CloseBtn = styled.TouchableOpacity`
    /* width: 50px; */
    /* height: 50px; */
`;