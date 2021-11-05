import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import styled from 'styled-components/native';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../components/StateBarSolid';
import store from '../store/store';
import { Modal ,StyleSheet,View,Pressable,Image} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;

const RegistText= styled.Text`
    font-weight: bold;
    font-size: 30px;
    margin-bottom:10px;
`;
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#78909c;
`;
const GrayText = styled.Text`
    font-size: 20px;
    color:#858585;
`;
const CompleteV = styled.View`
    margin-bottom:25px;
    height:50px;
    background-color:#78909c;
    width:50px;
    align-items: center;
    justify-content: center;
    border-radius:25px;
`;
const VText = styled.Text`
    font-size: 30px;
    align-items: center;
    color:#ffffff;
`;

const TopStateView = styled.View`
    flex:1;
    flex-direction: row;
    padding-bottom:24px;
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
    border-radius:10px
`;
const BottomText = styled.Text`
    font-size: 15px;
    align-items: center;
`;
const TouchableView = styled.TouchableOpacity`
    align-items: center;
    flex-direction:row;
    justify-content:space-between;
    width: 100%;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const ImgIcon =styled.Image`
    width: 25px;
    height: 20px;
    margin_right:10px;
`;

// 구조 분해 할당, Destructuring Assignment
function ShopStepOne( { navigation } ) {
    const [barcode, setBarcode] = React.useState(store.getState().cardValue);
    const [bag, setBag] = React.useState(store.getState().bagCodeValue);
    console.log(barcode);

    const cardImgUri = store.getState().card;
    const bagImgUri =store.getState().bagPicture;

    console.log(cardImgUri);
    console.log(bagImgUri);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible2, setModalVisible2] = React.useState(false);

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
        }
      });


    return (
        <Container>
            
            <CenterText>
                
                <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarSolid/></TopStateView>
                <CompleteV><VText>✓</VText></CompleteV>
                <RegistText>접수 완료</RegistText>
                <BlueText>수선 접수가 정상적으로 완료</BlueText>
                <GrayText>되었습니다</GrayText>

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
                            <Label>{barcode}</Label>
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
                    
                    
                    
                    
                    <TouchableView onPress={() => setModalVisible(!modalVisible)}><Label>{barcode}</Label><ImgIcon source={require('../Icons/image.png')}/></TouchableView>
                   
                <GrayText>받는 곳</GrayText>
                <DataView><Label></Label></DataView>
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
                            <Label>{bag}</Label>
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
                <TouchableView onPress={() => setModalVisible2(!modalVisible)}><Label>{bag}</Label><ImgIcon source={require('../Icons/image.png')}/></TouchableView>
                
            </InfoView>  
            <BottomText>자세한 내용은 마이페이지에서</BottomText>
            <BottomText>확인 가능합니다</BottomText>
            <Button onPress={ ()=> navigation.popToTop()}>
                완료
            </Button>
        </Container>
    )
}

export default ShopStepOne;