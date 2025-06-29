import React,{useState ,useEffect,useCallback} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';
import _ from 'lodash';
import { Image,Text, View, ScrollView, Dimensions ,StyleSheet, Alert, Modal, Pressable} from "react-native";
import styled from 'styled-components/native';
import ip from '../../serverIp/Ip';
import {useNetInfo}from "@react-native-community/netinfo";
import LookupCheckStep from '../../Functions/LookupCheckStep';
import DeleteReceipt from '../../Functions/DeleteReceipt';
import SetReReceiptInfo from '../../Functions/SetReReceiptInfo';


const  formatDate = (inputDate)=> {
    if(inputDate !== null&&inputDate!== undefined){
        return String(inputDate).slice(0, 10)
    }else{
        return null
    }
}
function LookupInfo3( { route,navigation } ) {
    const data =route.params.data;
    const images = route.params.images;
    const needImages =route.params.needImages;
    const step = LookupCheckStep(data)

    const netInfo = useNetInfo();

    const [receiptType,setReceiptType] = useState();        //제품구분
    const [storeMessage,setStoreMessage] =useState();       // 매장 접수 내용
    const [repairShop,setRepairShop] = useState();          //수선처 
    const [repairShopDate,setRepairShopDate] = useState();  //수선처 접수일
    const [repairShopSendDate,setRepairShopSendDate] = useState();//수선처 발송일
    const [repairShopSendDescription,setRepairShopSendDescription] = useState();//수선처 설명

    const [mainCenterDate,setMainCenterDate] = useState();  //본사 접수일
    const [mainCenterSendDate,setMainCenterSendDate] = useState();//본사 발송일
    const [mainCenterSendDescription,setMainCenterSendDescription] = useState();//본사설명
    


    const [requestImageModalVisible,setRequestImageModalVisible] = useState(false)
    let requestImage =ip;
    requestImage += data["image"];
    
    const [beforeImages,setBeforeImages] =useState([]);        //제품 수선 전 세부 사진
    const [afterImages,setAfterImages] =useState([]);        //제품 수선 후 세부 사진   

    
    const [receiptDate,setReceiptDate] = useState();        //매장접수일
    const [appointmentDate,setAppointmentDate] = useState();//고객약속일 

    
    const reReceipt =(data,step)=>{
        SetReReceiptInfo(data,images)
        
        if(step ==0){
            navigation.navigate("ShopStepOne")
        }else if(step ==1){
            navigation.navigate("ShopStepTwo")
        }else if(step ==2){
            navigation.navigate("ShopStepThree")
        }else if(step ==3){
            navigation.navigate("ShopStepFour2")
        }else if(step ==4){
            navigation.navigate("ShopStepFive")
        }
    }
    
    const deleteNotice=()=>{
        Alert.alert(
            "정말로 취소 하시겠습니까?",
            "확인을 누르시면 접수내역이 삭제 됩니다",
            [
              {
                text: "취소",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "확인", onPress: () =>{
                DeleteReceipt(data.receipt_id)
                navigation.popToTop();
                navigation.navigate('LookupPage',{code:null});
              } }
            ]
        );
        
    }

    useEffect(()=>{
        
        setReceiptDate(formatDate(data["receipt_date"]))     //매장접수일
        setAppointmentDate(formatDate(data["due_date"]))     //고객약속일

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
        
        const beforeImgList =[]                                  //제품 수선 전 사진
        const afterImgList =[]

        
        if(images){
            for (let i = 0; i < images.length; i++) { //제품 수선 후 사진
                const element = images[i];
                
                beforeImgList.push(ip+element["before_image"])
                if(element["after_image"] === null){
                    afterImgList.push(element["after_image"])
                }
                else{
                    afterImgList.push(ip+element["after_image"])
                }
            }
            
            setBeforeImages(beforeImgList)
            setAfterImages(afterImgList)
        }                                   
        
         
    },[]);
    
    let beforeImageViews =[];
    let afterImageViews =[];
    for (let i = 0; i < beforeImages.length; i++) {
        const element = beforeImages[i];
        const key = i
        const before =(
            <View key ={key}>
                <Pressable 
                    onPress={()=>{
                        navigation.navigate("EnlargePhoto",{image: element})
                    
                    }}>
                    <CaptureImage style={{width:180 ,height:240 , margin:15, padding:10}} source={{uri : element}}/>
                </Pressable>
            </View>

        )
        beforeImageViews[key] =(before)
    }
    
    for (let i = 0; i < afterImages.length; i++) {
        const element = afterImages[i];
        const key = i;
        let visible = false;
        if(element !== null){
            const after =(
                <View key ={key}>
                    <Pressable onPress={()=>{
                        
                        navigation.navigate("EnlargePhoto",{image: element})
                    }}>
                        <CaptureImage style={{width:180 ,height:240 , margin:15, padding:10}} source={{uri : element}}/>
                    </Pressable>
                </View>
            )
            afterImageViews[key] =(after)
        }
    }
    let needText;
    let need=[];
    if(needImages&&needImages.length>0){    
        
        needImages.map((obj,i)=>{
            const key = i
            let element =ip + obj.need_point_image;
            let insertImage=(
                <View key ={key}>
                    <Pressable onPress={()=>{
                        
                        navigation.navigate("EnlargePhoto",{image: element})
                    }}>
                        <CaptureImage style={{width:180 ,height:240 , margin:15, padding:10}} source={{uri : element}}/>
                    </Pressable>
                </View>
            )
            need[key]=insertImage;
        })
        needText =(
            <View>
                
                <Text style={{color:"#000000"}}>제품 추가 수선 필요 사진</Text>
                <View style={{alignItems:"center"}}>
                    <ScrollView style={{height : 300}} horizontal ={true}>
                        {need}    
                    </ScrollView>
                </View>
            </View>
        )
    }
    let btn
    if(step>4){
        btn =(
            <CenterView style={{borderTopWidth:1,borderTopStyle:'solid',borderTopColor:'rgba(200,200,200,0.2)'}}>
                <Button onPress={ ()=>{
                    if(netInfo.isConnected){
                        navigation.navigate( 'LookupInfo4',{data:data , images:images, needImages:needImages})
                    }else{
                        Alert.alert("네트워크 연결 실패","연결 상태를 확인해주세요",[{ text: "확인", onPress: () =>{}}])
                    }
                    
                    }}>
                    다음
                </Button>
            </CenterView>
        )
    }else{
        btn=(
            
            <Half style={{padding:"3%",borderTopWidth:1,borderTopStyle:'solid',borderTopColor:'rgba(200,200,200,0.2)'}}>
                <BtnRed onPress = {() => {
                    deleteNotice()
                }}><Text style ={{color : "#ffffff"}}>접수 취소</Text></BtnRed>
                <Btn onPress = {() => {
                    reReceipt(data,step)
                }}><Text style ={{color : "#ffffff"}}>접수 계속</Text></Btn>
                <Btn onPress = {() => {
                    navigation.popToTop();
                    navigation.navigate('LookupPage',{code:null});
                }}><Text style ={{color : "#ffffff"}}>닫기</Text></Btn>
            </Half>
        )
    }
    return(
        <Container style= {{backgroundColor:"#ffffff"}}>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
              <InfoView>
                    <TopText>제품 전체 사진</TopText>
                    
                        <View style ={{justifyContent:"center", width:"100%"}}>
                            <Pressable style={{justifyContent:"center",alignItems:"center"}} onPress={()=> {
                                navigation.navigate("EnlargePhoto",{image: requestImage})
                            }}>
                            <CaptureImage style={{width:180 ,height:240 }}  source={{uri: requestImage}}/>
                            </Pressable>
                        </View>
                    
                    <Text style={{color:"#000000"}}>제품 세부 사진 (수선전)</Text>
                    <View style={{alignItems:"center"}}>
                        <ScrollView style={{height : 300}} horizontal ={true}>
                            {beforeImageViews}
                        </ScrollView>
                    </View>
                    <Text style={{color:"#000000"}}>제품 세부 사진 (수선 후)</Text>
                    
                    <View style={{alignItems:"center"}}>
                        <ScrollView style={{height : 300}} horizontal ={true}>
                            {afterImageViews}    
                        </ScrollView>
                    </View>
                    {needText}
                    
                    <TopText>매장 접수 내용</TopText>

                        <InputText editable={false} multiline ={true}>{storeMessage}</InputText>
              </InfoView>
              <InfoView>
                    <TopText>매장 접수일</TopText>
                        <InputText editable={false}>{receiptDate}</InputText>
                    <TopText>고객 약속일</TopText>
                        <InputText editable={false}>{appointmentDate}</InputText>
                </InfoView>

              
     
        </Contents>
            {btn}
            

        <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default LookupInfo3;

const InfoView =styled.View`
    width: 100%;
    border:2px solid  rgb(0,80,130);
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
`;
const CaptureImage = styled.Image`
    width:200px;
    height:300px;
`;
const InputText = styled.TextInput`
    color:#000000
    width: 100%;
    min-height: 45px;
    padding: 10px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const Half = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;  
`;

const Btn = styled.TouchableOpacity`
    width : 30%;
    height: 50px;
    background: rgb(0,80,130);
    justify-content: center;
    align-items: center;
    border-radius:12px;    
`;
const TopText = styled.Text`
    color:#000000
    width: 100%;
    padding: 8px;
    font-size: 20px;
`;


const CenterView = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : center;
    align-items : center;  
`;

const BtnRed = styled.TouchableOpacity`
    width : 30%;
    height: 50px;
    background: rgb(180,0,0);
    justify-content: center;
    align-items: center;
    border-radius:12px;    
`;