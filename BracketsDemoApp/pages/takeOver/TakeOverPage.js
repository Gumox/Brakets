import React,{useState ,useEffect,useCallback} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import SelectButton from '../../components/SelectButton';
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';
import _, { reduce, sortedLastIndex } from 'lodash';
import axios from "axios";
import { Image,Text, View, ScrollView, Dimensions ,StyleSheet, Alert} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateObject from "react-date-object";
import { size } from 'lodash';
import styled from 'styled-components/native';
import store from '../../store/store';
import { Provider } from 'react-redux'
import { CheckBox } from 'react-native-elements';

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

const styles = StyleSheet.create({
    Lavel:{
        flex:1,
        fontSize:(Dimensions.get('window').width)*0.04,
        margin:10,
    },
      
  })
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
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

    const [repairShop,setRepairShop] = useState();          //수선처 
    const [repairShopDate,setRepairShopDate] = useState();  //수선처 접수일
    const [repairShopSendDate,setRepairShopSendDate] = useState();//수선처 발송일
    const [repairShopSendDescription,setRepairShopSendDescription] = useState();//수선처 설명

    const [mainCenterDate,setMainCenterDate] = useState();  //본사 접수일
    const [mainCenterSendDate,setMainCenterSendDate] = useState();//본사 발송일
    const [mainCenterSendDescription,setMainCenterSendDescription] = useState();//본사설명

    
    const [repairPrice,setRepairPrice] = useState("30000");        //수선비
    const [isSelected , setSelection] = useState(false);    //유상수선유무


    const getTargetData = useCallback(async (receiptId) => {
        const { data } = await axios.get(`http://34.64.182.76/api/receipt/${receiptId}`);
        const readData = data.data;
        //console.log(readData)
        const keys= Object.keys(readData)
        
        keys.forEach(element => {
            console.log( element + " : "+readData[element])
        });
        
        setCardCode(readData["receipt_code"])                    //서비스카드번호
        if( readData["receipt_category"] == 1){                  //접수구분
            setCheckReceipt("고객용") 
        }else if( readData["receipt_category"] == 2){
            setCheckReceipt("선처리") 
        }else if( readData["receipt_category"] == 3){
            setCheckReceipt("메장용") 
        }           
        setCustomerName(readData["customer_name"])               //고객이름
        setCustomerPhone(readData["customer_phone"])             //고객연락처
        setReceiptDate(formatDate(readData["receipt_date"]))     //매장접수일
        
        setAppointmentDate(formatDate(readData["due_date"]))     //고객약속일
        setSeason(readData["product_season_name"])               //시즌
        setProductStyle(readData["product_style_code"])          //제품 스타일
        setProductColor(readData["product_color"])               //제품 색상
        setProductSize(readData["product_size"])                 //제품 사이즈
        setProductCode(readData["product_code"])                 //제품 코드
        setNumbering(readData["product_degree"])                 //차수
        setProductExchange(readData[""])                         //제품 교환
        setProductPrice(readData["product_tag_price"])           //제품가격
        
        setCheckMistake(readData["fault_id"])                    //과실 구분
        setContentAnalysis(readData["analysis_id"])              //내용분석
        setResult(readData["result_id"])                         //판정결과

        setRepairShop(readData["repair1_store_name"])            //수선처 
        setRepairShopDate(readData["repair1_register_date"])     //수선처 접수일
        setRepairShopSendDate(readData["repair1_complete_date"])     //수선처 발송일
        setRepairShopSendDescription(readData["repair1_message"])//수선처 설명

        setMainCenterDate(readData["register_date"])             //본사 접수일
        setMainCenterSendDate(readData["complete_date"])         //본사 발송일
        setMainCenterSendDescription(readData["receipt_message"])//본사설명


        setRepairPrice(readData["fee"])                          //수선비
        if(readData["paid"] =="1"){                              //유상수선유무
            setSelection(true)
        }else(
            setSelection(false)
        )  
        
        if(readData["repair2_store_id"] != null){
            const repair2_store =(
                <View>
                    <Text style={{marginBottom:10}}>수선처 2 : {repairShop}</Text>
                    <InfoView>
                        <Text>수선처 2 접수일</Text>
                        <InputText>{repairShopDate}</InputText>
                            
                        <Text>수선처 2 발송일</Text>
                        <InputText>{repairShopSendDate}</InputText>
                        <Text>수선처 2 설명</Text>
                        <InputText>{repairShopSendDescription}</InputText>
                    </InfoView>
                </View>
            );
        }
        if(readData["repair3_store_id"] != null){
            const repair2_store =(
                <View>
                    <Text style={{marginBottom:10}}>수선처 3 : {repairShop}</Text>
                    <InfoView>
                        <Text>수선처 3 접수일</Text>
                        <InputText>{repairShopDate}</InputText>
                            
                        <Text>수선처 3 발송일</Text>
                        <InputText>{repairShopSendDate}</InputText>
                        <Text>수선처 3 설명</Text>
                        <InputText>{repairShopSendDescription}</InputText>
                    </InfoView>
                </View>
            );
        }
        
        
    }, [])

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
            setDate(currentDate);
            console.log(currentDate)
            setSelectDay(formatDate())
        }
        return {
            date,
            showDatepicker,
            show,
            mode,
            onChange,
            formatDate
        }
    }
        const [selectDay,setSelectDay] =useState();
        const tDate = useInput(new Date()); 
    React.useEffect(()=>{
        console.log(route.params.code)
        getTargetData(route.params.code);
        

    },[]);
    var repairShops =[]
    
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
                <InfoView>
                  <Text>서비스 카드 번호</Text>
                      <InputText>{cardCode}
                            </InputText>
                  <Text>접수 구분</Text>
                        <InputText>{checkReceipt}</InputText>
                  <Text>고객명</Text>
                        <InputText>{customerName}</InputText>
                  <Text>고객 연락처</Text>
                        <InputText>{customerPhone}</InputText>
                </InfoView>

                <InfoView>
                  <Text>매장 접수일</Text>
                        <InputText>{receiptDate}</InputText>
                  <Text>고객 약속일</Text>
                        <InputText>{appointmentDate}</InputText>
                </InfoView>

                <InfoView>
                    <Half>
                      <HalfLine>
                          <Text>시즌</Text>
                              <InputText>{season}</InputText>
                      </HalfLine>

                      <HalfLine>
                          <Text>스타일</Text>
                              <InputText>{productStyle}</InputText>
                      </HalfLine>
                    </Half>

                    <Half>
                          <HalfLine>
                              <Text>컬러</Text>
                                  <InputText>{productColor}</InputText>
                          </HalfLine>

                          <HalfLine>
                              <Text>사이즈</Text>
                                  <InputText>{productSize}</InputText>
                            </HalfLine>
                        </Half>
                      
                        <Text>제품 바코드/qr코드 번호</Text>
                        <InputText>{productCode}</InputText>
                    <Text>차수</Text>
                        <InputText>{numbering}</InputText>
                   
                    <Text>판매가</Text>
                        <InputText>{productPrice}</InputText>
              </InfoView>
              <InfoView>
                    <Text>제품 구분</Text>
                        <InputText>{}</InputText>
                        
                    <Text>제품 사진 (수선전)</Text>
                    <ScrollView style={{borderWidth:2,borderColor:"#78909c",borderRadius:5, height : 150}} horizontal ={true}>
                    </ScrollView>
                    <Text>제품 사진 (수선 후)</Text>
                    <ScrollView style={{borderWidth:2,borderColor:"#78909c",borderRadius:5, height : 150}} horizontal ={true}>
                    </ScrollView>
                    <Text>매장 접수 내용</Text>
                        <InputText>{}</InputText>
              </InfoView>
              <InfoView>
                <Text>과실 구분</Text>
                <InputText>{checkMistake}</InputText>

                <Text>내용 분석</Text>
                <InputText>{contentAnalysis}</InputText>
              <Text>판정 결과</Text>
              <InputText>{result}</InputText>

            </InfoView>

            <Text style={{marginBottom:10}}>수선처 : {repairShop}</Text>
              <InfoView>
                  <Text>수선처 접수일</Text>
                  <InputText>{repairShopDate}</InputText>
                      
                  <Text>수선처 발송일</Text>
                  <InputText>{repairShopSendDate}</InputText>
                <Text>수선처 설명</Text>
                <InputText>{repairShopSendDescription}</InputText>

              </InfoView>

              <InfoView>
                <Text>본사 접수일</Text>
                <InputText>{mainCenterDate}</InputText>
                <Text>본사 발송일</Text>
                <InputText>{mainCenterSendDate}</InputText>
                <Text>본사 설명</Text>
                <InputText>{mainCenterSendDescription}</InputText>
              </InfoView>

              <Text style={{marginBottom : 10, marginLeft:10}}>매장 인수일</Text>
              <TouchableView onPress={tDate.showDatepicker}>
              <PrView>
              <Text style={styles.Lavel}>{selectDay}</Text>
              <ImgIcon source={require('../../Icons/calendar.png')}/>
              </PrView>
              </TouchableView>
              {tDate.show && (
                  <DateTimePicker
                  testID="dateTimePickerT"
                  value={tDate.date}
                  mode={tDate.mode}
                  is24Hour={true}
                  display="default"
                  onChange={tDate.onChange}
                  />
              )}
            <Half style = {{marginBottom : 50}}>
                <Check>
                      <Text>유상수선 </Text>
                      <CheckBox
                            center
                            checked={isSelected}
                            checkedColor="red"
                            onPress={() =>{setSelection(!isSelected)}}
                        />
                  </Check>
                <TotalMoney>
                    <Text style={{color : "#ff0000" ,fontSize :18 ,fontWeight :"bold"}}>수선비  {repairPrice}</Text>
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
                }
              }}><Text style ={{color : "#ffffff"}}>인수완료</Text></Btn>
            </Half> 

            <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default TakeOverPage;