import React,{useState ,useEffect,useCallback} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';
import _, { reduce, sortedLastIndex } from 'lodash';
import axios from "axios";
import { Image,Text, View, ScrollView, Dimensions ,StyleSheet, Alert, Modal, Pressable} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux'
import { CheckBox } from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom';
import ip from '../../serverIp/Ip';

const TouchableView = styled.TouchableOpacity`
    width: 100%;;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid #78909c;
`;
const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
    margin:5px;
`;
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%
    justify-content: center;
`;
const InfoView =styled.View`
    width: 100%;
    border:2px solid  #78909c;
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const InputText = styled.Text`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
`;
const Half = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;  
`;

const HalfLine = styled.View`
    width : 45%;
    height : 100%;
`;
const Check =styled.View`
    flex:1;
    flex-direction : row;
    width : 40%;
    padding : 8px;
    align-items : center;
    justify-content : center;
    `;
const TotalMoney = styled.View`
    flex:1;
    flex-direction : row;
    width : 50%;
    margin-left: 10%;

    `;

const Btn = styled.TouchableOpacity`
    width : 40%;
    height: 50px;
    background: #78909c;
    justify-content: center;
    align-items: center;
    margin:15px;
    border-radius:12px;    
`;
const TopText = styled.Text`
    width: 100%;
    padding: 8px;
    font-size: 20px;
`;

const styles = StyleSheet.create({
    Lavel:{
        flex:1,
        fontSize:(Dimensions.get('window').width)*0.04,
        margin:10,
    },
    outView :{
        backgroundColor:"#000000",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    centerView:{

        justifyContent:"center",
        alignItems:"center"
    },
    inView:{
        justifyContent:"center",
        alignItems:"center"
    },
      
})
 
function LookupInfo3( { route,navigation } ) {
    const data =route.params.data;
    
    const keys= Object.keys(data)
    const [receiptType,setReceiptType] = useState();        //제품구분
    const [storeMessage,setStoreMessage] =useState();       // 매장 접수 내용
    const [repairShop,setRepairShop] = useState();          //수선처 
    const [repairShopDate,setRepairShopDate] = useState();  //수선처 접수일
    const [repairShopSendDate,setRepairShopSendDate] = useState();//수선처 발송일
    const [repairShopSendDescription,setRepairShopSendDescription] = useState();//수선처 설명

    const [mainCenterDate,setMainCenterDate] = useState();  //본사 접수일
    const [mainCenterSendDate,setMainCenterSendDate] = useState();//본사 발송일
    const [mainCenterSendDescription,setMainCenterSendDescription] = useState();//본사설명
    
    const [checkMistake,setCheckMistake] = useState();      //과실 구분
    const [contentAnalysis,setContentAnalysis] = useState();//내용분석
    const [result,setResult] = useState();                  //판정결과

    const [requestImageModalVisible,setRequestImageModalVisible] = useState(false)
    var requestImage =ip;
    requestImage += data["image"];
    useEffect(()=>{

        if(data["receipt_type"] == 1){
            setReceiptType("수선")
        }
        else if(data["receipt_type"] == 2){
            setReceiptType("교환")
        }
        else if(data["receipt_type"] == 3){
            setReceiptType("환불")
        }
        else if(data["receipt_type"] == 4){
            setReceiptType("심의")
        }
        setStoreMessage(data["store_message"])               //매장 접수 내용
        setCheckMistake(data["fault_id"])                    //과실 구분
        setContentAnalysis(data["analysis_id"])              //내용분석
        setResult(data["result_id"])                         //판정결과
        
       
         
    },[]);
    
    const winW = Dimensions.get('window').width;
    const winH = Dimensions.get('window').height
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
                
              <InfoView>
                    <TopText>제품 구분</TopText>

                    <InputText>{receiptType}</InputText>
                    <TopText>제품 전체 사진</TopText>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={requestImageModalVisible}
                        onRequestClose={() => {
                        setRequestImageModalVisible(!requestImageModalVisible);
                        }}
                    >
                        <View style={styles.outView} >
                        <View style={styles.centerView} >    
                        <View style={styles.inView}>
                            
                            <ImageZoom cropWidth={winW}
                                    cropHeight={winH}
                                    imageWidth={300}
                                    imageHeight={400}>
                                    <Image style={{width:300, height:400}}
                                    source={{uri:requestImage}}/>
                            </ImageZoom>
                            
                        </View>
                        </View>
                        </View>
                    </Modal>
                        <View style ={{justifyContent:"center", width:"100%"}}>
                            <Pressable style={{justifyContent:"center",alignItems:"center"}} onPress={()=> {
                            setRequestImageModalVisible(!requestImageModalVisible);}}>
                            <Image style={{width:200 ,height:300 }} resizeMode = 'contain' source={{uri: requestImage}}/>
                            </Pressable>
                        </View>
                    
                    <TopText>제품 세부 사진 (수선전)</TopText>

                    <ScrollView style={{borderWidth:2,borderColor:"#78909c",borderRadius:5, height : 150}} horizontal ={true}>
                    </ScrollView>
                    <TopText>제품 세부 사진 (수선 후)</TopText>

                    <ScrollView style={{borderWidth:2,borderColor:"#78909c",borderRadius:5, height : 150}} horizontal ={true}>
                    </ScrollView>
                    <TopText>매장 접수 내용</TopText>

                        <InputText>{storeMessage}</InputText>
              </InfoView>
              <InfoView>
                <TopText>과실 구분</TopText>
                <InputText>{checkMistake}</InputText>

                <TopText>내용 분석</TopText>
                <InputText>{contentAnalysis}</InputText>
              <TopText>판정 결과</TopText>
              <InputText>{result}</InputText>

            </InfoView>
     
        </Contents>
            <Button onPress={ ()=> navigation.navigate( 'LookupInfo4',{data:data}) }>
                다음
            </Button>
            

        <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default LookupInfo3;