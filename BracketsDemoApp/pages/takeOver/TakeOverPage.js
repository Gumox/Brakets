import React,{useState ,useEffect,useCallback} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';
import _, { floor, reduce, set, sortedLastIndex } from 'lodash';
import axios from "axios";
import { Image,Text, View, ScrollView, Dimensions ,StyleSheet, Alert, Modal,Pressable} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux'
import { CheckBox } from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom';
import ip from '../../serverIp/Ip';
import { CheckCode,CheckFaultDivision,CheckAnalysisType,CheckJudgmentResult } from '../../Functions/codeCheck';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useNetInfo}from "@react-native-community/netinfo";



const  formatDate = (inputDate)=> {
    const sp =  inputDate;
    const date = sp.split("T")
    
    return date[0]
}



function TakeOverPage( { route,navigation } ) {
    const state = {size:1};
    
    const [number,setNumber] =useState(store.getState().number);
    const [text, onChangeText] = useState();

    const [cardCode,setCardCode] = useState(route.params.code);              //서비스카드번호
    const [checkReceipt,setCheckReceipt] = useState();      //접수구분
    const [customerName,setCustomerName] = useState();      //고객이름
    const [customerPhone,setCustomerPhone] = useState();    //고객연락처
    const [receiptDate,setReceiptDate] = useState();        //매장접수일
    const [appointmentDate,setAppointmentDate] = useState();//고객약속일
    const [season,setSeason] = useState();                  //시즌
    const [productStyle,setProductStyle] = useState();      //제품 스타일
    const [productColor,setProductColor] = useState();      //제품 색상
    const [productSize,setProductSize] = useState();      //제품 사이즈
    const [productCode,setProductCode] = useState();        //제품 코드
    const [numbering,setNumbering] = useState();            //차수
    const [productExchange,setProductExchange] = useState();//제품 교환
    const [productPrice,setProductPrice] = useState();      //제품가격
    
    const [checkMistake,setCheckMistake] = useState();      //과실 구분
    const [contentAnalysis,setContentAnalysis] = useState();//내용분석
    const [result,setResult] = useState();                  //판정결과

    const [receiptType,setReceiptType] = useState();        //제품구분
    const [image,setImage] =useState();                     //제품 전체 사진
    const [beforeImages,setBeforeImages] =useState([]);        //제품 수선 전 세부 사진
    const [afterImages,setAfterImages] =useState([]);        //제품 수선 후 세부 사진    
    
    
    const [needImages,setNeedImages] =useState([]);         //제품 추가 필요 수선 부위 사진    


    const [storeMessage,setStoreMessage] =useState();       // 매장 접수 내용
    const [repairShop,setRepairShop] = useState();          //수선처 
    const [repairShopDate,setRepairShopDate] = useState();  //수선처 접수일
    const [repairShopSendDate,setRepairShopSendDate] = useState();//수선처 발송일
    const [repairShopSendDescription,setRepairShopSendDescription] = useState();//수선처 설명

    const [mainCenterDate,setMainCenterDate] = useState();  //본사 접수일
    const [mainCenterSendDate,setMainCenterSendDate] = useState();//본사 발송일
    const [mainCenterSendDescription,setMainCenterSendDescription] = useState();//본사설명

    
    const [repairPrice,setRepairPrice] = useState();        //수선비
    const [isSelected , setSelection] = useState(false);    //유상수선유무
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   
    
    const [requestImageModalVisible,setRequestImageModalVisible] = useState(false)


    
    const winW = Dimensions.get('window').width;
    const winH = Dimensions.get('window').height;
    
    const netInfo = useNetInfo();

    const numberWithCommas = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' 원';
    }
    
    const putReceiptComplete = async (pCode,cDate) => {
        
        try {
            const response = await fetch(ip+`/api/receipt/received`,{method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                step : 2,
                code : pCode,
                date : cDate
            })
            });
            const json = await response.json();
           //console.log(json)
        } catch (error) {
            console.error(error);
        } finally {
            
        }
    }
    const checkNull =(input)=>{
        if(input === "null" || input === null){
            
            console.log("input: ",input)
            return ""
        }else{
            return input
        }
    }
    const [repair2,setRepair2] =useState();
    const [repair3,setRepair3] =useState();
    const getImages = useCallback(async (code,) => {

        console.log("press")
        const { data } = await axios.get(ip+"/api/lookup/images", {
          params: { 
            code: code
          },
        })
        setNeedImages(data.needImages)
    }, []);
    const getTargetData = useCallback(async (receiptId) => {
        const { data } = await axios.get(ip+`/api/receipt/${receiptId}`);
        
        const readData = data.data;
        const keys= Object.keys(readData)
        if(readData.step == 2){
            Alert.alert("인수완료된 물품입니다","서비스 카드를 다시 확인해 주세요",[{ text: "확인"}])
            navigation.goBack();
        }
        
        setCardCode(readData["receipt_code"])                    //서비스카드번호
        if( readData["receipt_category"] == 1){                  //접수구분
            setCheckReceipt("고객") 
        }else if( readData["receipt_category"] == 2){
            setCheckReceipt("선처리") 
        }else if( readData["receipt_category"] == 3){
            setCheckReceipt("매장") 
        }           
        setCustomerName(readData["customer_name"])               //고객이름
        setCustomerPhone(readData["customer_phone"])             //고객연락처

        // TODO
        setReceiptDate(String(readData["receipt_date"]).slice(0, 10))     //매장접수일
        {console.log("read data is")}
        {console.log(String(readData["receipt_date"]).slice(0, 10))}
        {console.log(typeof(readData["receipt_date"]))}
        
        setAppointmentDate(String(readData["due_date"]).slice(0, 10))     //고객약속일
        setSeason(readData["product_season_name"])               //시즌
        setProductStyle(readData["product_style_code"])          //제품 스타일
        setProductColor(readData["product_color"])               //제품 색상
        setProductSize(readData["product_size"])                 //제품 사이즈
        setProductCode(readData["product_code"])                 //제품 코드
        setNumbering(readData["product_degree"])                 //차수
        setProductExchange(+readData["image"])                         //제품 교환
        setProductPrice(readData["product_tag_price"])           //제품가격

        if(readData["receipt_type"] == 1){
            setReceiptType("수선")
        }
        else if(readData["receipt_type"] == 2){
            setReceiptType("교환")
        }
        else if(readData["receipt_type"] == 3){
            setReceiptType("환불")
        }
        else if(readData["receipt_type"] == 4){
            setReceiptType("심의")
        }
        
        setImage(ip + readData["image"])                         //제품 전체 사진 
        //console.log(ip + readData["image"])


        const beforeImgList =[]                                  //제품 수선 전 사진
        const afterImgList =[]                                   //제품 수선 후 사진
        for (let i = 0; i < data.imageList.length; i++) {
            const element = data.imageList[i];
            //console.log(element)
            
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
        
        setStoreMessage(readData["store_message"])               //매장 접수 내용
        let cf = await CheckFaultDivision(readData["fault_id"])
        setCheckMistake(cf)                    //과실 구분

        let ca = await CheckAnalysisType(readData["analysis_id"])
        setContentAnalysis(ca)              //내용분석

        let cj = await CheckJudgmentResult(readData["result_id"])
        setResult(cj)                         //판정결과

        setRepairShop(readData["repair1_store_name"])            //수선처 
        setRepairShopDate(String(readData["repair1_register_date"]).slice(0, 10))     //수선처 접수일
        
        setRepairShopSendDate(String(readData["repair1_complete_date"]).slice(0, 10))     //수선처 발송일
        setRepairShopSendDescription(readData["repair1_message"])//수선처 설명

        setMainCenterDate(String(readData["register_date"]).slice(0, 10))             //본사 접수일

        setMainCenterSendDate(String(readData["complete_date"]).slice(0, 10))         //본사 발송일
        setMainCenterSendDescription(readData["receipt_message"])//본사설명


        setRepairPrice(floor(Number(readData["fee"])*1.1))                          //수선비
        if(readData["paid"] =="1"){                              //유상수선유무
            console.log(readData["paid"])
            setSelection(true)
        }else(
            setSelection(false)
        )  
        console.log("readData[paid]: ",readData["paid"])
            
        
        if(readData["repair2_store_id"]){
            let repairShopDate = String(readData["repair2_register_date"]).slice(0, 10)
            let repairShopSendDate = String(readData["repair2_complete_date"]).slice(0, 10)
            let repairShopSendDescription = readData["repair2_message"]
            let repairShopName= readData["repair2_store_name"]   
            if(repairShopDate = 'null'){
                repairShopDate = '';
            }
            if(repairShopSendDate = 'null'){
                repairShopSendDate = '';
            }
            setRepair2(
                <View>
                    <Text style={{marginBottom:10 ,color: '#000000'}}>수선처 2 : {repairShopName}</Text>
                    <InfoView>
                        <InText>수선처 2 접수일</InText>
                        <InputText>{repairShopDate}</InputText>
                            
                        <InText>수선처 2 발송일</InText>
                        {/* <InputText>{repairShopSendDate}</InputText> */}
                        <InputText>{repairShopSendDate}</InputText>

                        <InText>수선처 2 설명</InText>
                        <InputText>{repairShopSendDescription}</InputText>
                    </InfoView>
                </View>
            );
        }
        if(readData["repair3_store_id"]){
            let repairShopDate = String(readData["repair3_register_date"]).slice(0, 10)
            let repairShopSendDate = String(readData["repair3_complete_date"]).slice(0, 10)
            let repairShopSendDescription = readData["repair3_message"]
            let repairShopName= readData["repair3_store_name"]   
            setRepair3(
                <View>
                    <Text style={{marginBottom:10,color: '#000000'}}>수선처 3 : {repairShopName}</Text>
                    <InfoView>
                        <InText>수선처 3 접수일</InText>
                        <InputText>{repairShopDate}</InputText>
                            
                        <InText>수선처 3 발송일</InText>
                        {/* <InputText>{repairShopSendDate}</InputText> */}
                        <InputText>{repairShopSendDate}</InputText>

                        
                        <InText>수선처 3 설명</InText>
                        <InputText>{repairShopSendDescription}</InputText>
                    </InfoView>
                </View>
            );
        }
        
        
    }, [])

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
            //setDate(currentDate);
            date = currentDate
            setSelectDay(formatDate())
            hideDatePicker();
        };
        const  formatDate = ()=> {
            var month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
        
        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date
            setShow(Platform.OS === 'ios');
            //setDate(currentDate);
            date = currentDate
            setSelectDay(formatDate())
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
    
    const [selectDay, setSelectDay] =useState();
    const tDate = useInput(new Date()); 
    
    var beforeImageViews =[];
    var afterImageViews =[];

    for (let i = 0; i < beforeImages.length; i++) {
        const element = beforeImages[i];
        const key = i
        let visable =false;
        const before =(
            <View key ={key}>
                    
                <View style ={{justifyContent:"center", width:"100%"}}>
                    <Pressable style={{justifyContent:"center",alignItems:"center"}} onPress={()=> {
                        navigation.navigate("EnlargePhoto",{image: element})
                    }}>
                    <CaptureImage style={{width:180 ,height:240 ,marginRight:15}} source={{uri: element}}/>
                    </Pressable>
                </View>
            </View>
        )
        beforeImageViews[key] =(before)
    }
    
    for (let i = 0; i < afterImages.length; i++) {
        const element = afterImages[i];
        const key = i
        let visable =false;
        if(element !== null){
            const before =(
                <View key ={key}>
                    <View style ={{justifyContent:"center", width:"100%", height:220,margin:10}}>
                            <Pressable style={{justifyContent:"center",alignItems:"center"}} onPress={()=> {
                                navigation.navigate("EnlargePhoto",{image: element})
                            }}>
                            <CaptureImage style={{width:180 ,height:240, marginRight:15}} source={{uri: element}}/>
                            </Pressable>
                        </View>
                        
                </View>
            )
            afterImageViews[key] =(before)
        }else{
            console.log(" in null \n")
        }
    }
    let inFormField;
    if(checkMistake||contentAnalysis||result){
        inFormField =(
            <InfoView>
                <InText>과실 구분</InText>
                <InputText>{checkMistake}</InputText>

                <InText>내용 분석</InText>
                <InputText>{contentAnalysis}</InputText>
                <InText>판정 결과</InText>
                <InputText>{result}</InputText>

            </InfoView>
        )
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
    useEffect(()=>{
        const fetch = async()=>{
                
            const checkResult = await CheckCode(route.params.code)
            if(!checkResult){
                Alert.alert("잘못된 바코드 입니다","",[{ text: "확인"}]);
                navigation.goBack();
            }else{
                getTargetData(route.params.code);
                getImages(route.params.code)
            }
        }
        fetch();
        
    },[]);

    let dataPicker;

    if(Platform.OS === 'ios'){
        console.log("ios")
        dataPicker = (
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={tDate.handleConfirm}
            onCancel={tDate.hideDatePicker}
            locale='ko-kr'
          />
        )
      }
      else{
        console.log("and")
        dataPicker = ((tDate.show) && (
            <DateTimePicker
                testID="dateTimePicker"
                value={tDate.date}
                mode={tDate.mode}
                is24Hour={true}
                display="default"
                onChange={tDate.onChange}
            />
        ))
      }
    let toHq
    if(mainCenterSendDate !== "null"&&mainCenterDate !== "null"){
        console.log("mainCenterSendDate",mainCenterSendDate)
        console.log("mainCenterDate",mainCenterDate)
        toHq =(
            <InfoView>
                <InText>본사 접수일</InText>
                {/* <InputText>{mainCenterDate}</InputText> */}
                <InputText>{checkNull(mainCenterDate)}</InputText>

                <InText>본사 발송일</InText>
                {/* <InputText>{mainCenterSendDate}</InputText> */}
                <InputText>{checkNull(mainCenterSendDate)}</InputText>

                <InText>본사 설명</InText>
                <InputText>{mainCenterSendDescription}</InputText>
            </InfoView>
        )
    }
    
    return(
        <Container style= {{backgroundColor:"#ffffff"}}>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
                <InfoView>
                  <InText>서비스 카드 번호</InText>
                      <InputText>{cardCode}
                            </InputText>
                  <InText>접수 구분</InText>
                        <InputText>{checkReceipt}</InputText>
                  <InText>고객명</InText>
                        <InputText>{customerName}</InputText>
                  <InText>고객 연락처</InText>
                        <InputText>{customerPhone}</InputText>
                </InfoView>


                {/* TODO */}
                <InfoView>
                  <InText>매장 접수일</InText>
                        <InputText>{checkNull(receiptDate)}</InputText>
                  <InText>고객 약속일</InText>
                        <InputText>{checkNull(appointmentDate)}</InputText>
                </InfoView>

                <InfoView>
                    <Half>
                      <HalfLine>
                          <InText>시즌</InText>
                              <InputText>{season}</InputText>
                      </HalfLine>

                      <HalfLine>
                          <InText>스타일</InText>
                              <InputText>{productStyle}</InputText>
                      </HalfLine>
                    </Half>

                    <Half>
                          <HalfLine>
                              <InText>컬러</InText>
                                  <InputText>{productColor}</InputText>
                          </HalfLine>

                          <HalfLine>
                              <InText>사이즈</InText>
                                  <InputText>{productSize}</InputText>
                            </HalfLine>
                        </Half>
                      
                        <InText>제품 바코드/qr코드 번호</InText>
                        <InputText>{productCode}</InputText>
                    <InText>차수</InText>
                        <InputText>{numbering}</InputText>
                   
                    <InText>판매가</InText>
                        <InputText>{productPrice}</InputText>
              </InfoView>
              <InfoView>
                    <InText>고객 요구</InText>
                    <InText style={{fontSize:20,padding:15}}>{receiptType}</InText>
                    <InText>제품 전체 사진</InText>
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
                                    source={{uri:image}}/>
                            </ImageZoom>
                            
                        </View>
                        </View>
                        </View>
                        <CloseBtn
                            onPress={() => {
                                setRequestImageModalVisible(!requestImageModalVisible)}}
                            style={{alignItems: 'center', justifyContent: 'center'}}
                        >
                            <Text
                                style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}
                            >✕</Text>
                        </CloseBtn>
                    </Modal>
                        <View style ={{justifyContent:"center", width:"100%"}}>
                            <Pressable style={{justifyContent:"center",alignItems:"center"}} onPress={()=> {
                            setRequestImageModalVisible(!requestImageModalVisible);}}>
                            <CaptureImage style={{width:180 ,height:240}} source={{uri: image}}/>
                            </Pressable>
                        </View>

                    <InText>제품 세부 사진 (수선전)</InText>
                    <View style={{alignItems:"center"}}>
                        <ScrollView  horizontal ={true}>
                            {beforeImageViews}
                        </ScrollView>
                    </View>
                    <InText>제품 세부 사진 (수선 후)</InText>
                    
                    <View style={{alignItems:"center"}}>
                        <ScrollView style={{height : 150}} horizontal ={true}>
                            {afterImageViews}    
                        </ScrollView>
                    </View>
                    
                    {needText}
                    <InText>매장 접수 내용</InText>
                        <InputText>{storeMessage}</InputText>
              </InfoView>
              {
                  inFormField
              }
              

            <Text style={{marginBottom:10, color: '#000000'}}>수선처 : {repairShop}</Text>
              <InfoView>
                  <InText>수선처 접수일</InText>
                  <InputText>{checkNull(repairShopDate)}</InputText>
                      
                  <InText>수선처 발송일</InText>
                  {/* <InputText>{repairShopSendDate}</InputText> */}
                  <InputText>{checkNull(repairShopSendDate)}</InputText>

                <InText>수선처 설명</InText>
                <InputText>{repairShopSendDescription}</InputText>

              </InfoView>
              {repair2}
              {repair3}
              

              
              {toHq}
              <Text style={{marginBottom : 10, marginLeft:10 ,color: '#000000'}}>매장 인수일</Text>
              
              
              {/* TODO */}
              {/* <TouchableView onPress={tDate.showDatepicker}> */}
              <TouchableView onPress={
                    (Platform.OS === 'ios') ? (tDate.showDatePickerIos) : (tDate.showDatepicker)
                    }>
              {/* TODO */}
                  
              <PrView>
              <Text style={styles.Lavel}>{selectDay}</Text>
              <ImgIcon source={require('../../Icons/calendar.png')}/>
              </PrView>
              </TouchableView>
               
            {dataPicker}

            <Half style = {{marginBottom : 50}}>
                <Check>
                      <InText>유상수선 </InText>
                      <CheckBox
                            center
                            checked={isSelected}
                            checkedColor="red"
                            onPress={() =>{setSelection(!isSelected)}}
                        />
                  </Check>
                <TotalMoney>
                    <Text style={{color : "#ff0000" ,fontSize :16 ,fontWeight :"bold"}}>수선비  {numberWithCommas(Number(repairPrice))}</Text>
                </TotalMoney>
            </Half>
     
            </Contents>
            <Half>
              <Btn onPress = {() => {
                if(selectDay == null){
                    Alert.alert(            
                        "인수일 오류",             
                        "인수일을 입력하세요",                   
                        [                              
                            { text: "확인"},
                        ]
                    )
                }else{
                    //putReceiptComplete(cardCode,selectDay);
                    navigation.navigate("ReceiptDivision");
                }
              }}><Text style ={{color : "#ffffff"}}>재접수</Text></Btn> 
              <Btn onPress = {() => {
                if(selectDay == null){
                    Alert.alert(            
                        "인수일 오류",             
                        "인수일을 입력하세요",                   
                        [                              
                            { text: "확인"},
                        ]
                    )
                }else{
                    if(netInfo.isConnected){
                        putReceiptComplete(cardCode,selectDay);
                        navigation.popToTop();
                    }else{
                        Alert.alert("네트워크 연결 실패\n 연결 상태를 확인해주세요","")
                    }
                }
              }}><Text style ={{color : "#ffffff"}}>인수완료</Text></Btn>
            </Half> 

            <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default TakeOverPage;

const styles = StyleSheet.create({
    Lavel:{
        flex:1,
        fontSize:(Dimensions.get('window').width)*0.04,
        margin:10,
        color: '#000000',
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

const TouchableView = styled.TouchableOpacity`
    width: 100%;;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid rgb(0,80,130);
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
    border:2px solid  rgb(0,80,130);
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
`;

const Input = styled.TextInput`
    color: #000000;
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const InputText = styled.Text`
    color: #000000;
    width: 100%;
    padding: 8px;
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
    background: rgb(0,80,130);
    justify-content: center;
    align-items: center;
    margin:15px;
    border-radius:12px;    
`;
const InText = styled.Text`
    color:#000000;
`;

const CloseBtn = styled.TouchableOpacity`
    width: 5%;
    height: 5%;
    /* background: white; */
    position: absolute;
    right: 5%;
    bottom:90%;
`;

const CaptureImage = styled.Image`
`;