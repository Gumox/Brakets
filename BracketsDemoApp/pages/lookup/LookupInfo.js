import React,{useState ,useEffect} from 'react';
import Container from '../../components/Container';
import Contents from '../../components/Contents';
import Button from '../../components/Button';
import Bottom from '../../components/Bottom';
import _ from 'lodash';
import {Alert, Dimensions ,Text, View} from "react-native";
import styled from 'styled-components/native';
import store from '../../store/store';
import {useNetInfo}from "@react-native-community/netinfo";
import LookupCheckStep from '../../Functions/LookupCheckStep';
import DeleteReceipt from '../../Functions/DeleteReceipt';
import SetReReceiptInfo,{getProductCategory} from '../../Functions/SetReReceiptInfo';

const  formatDate = (inputDate)=> {
    const sp =  inputDate;
    const date = String(sp).slice(0,10)
    if(date !== 'null'){
        return date
    }else{
        return ''
    }
}

function LookupInfo( { route,navigation } ) {
    const data =route.params.data;
    const needImages = route.params.needImages
    const images = route.params.images;

    const step = LookupCheckStep(data)

    //const [number,setNumber] =useState(store.getState().number);
    //const [text, onChangeText] = useState();

    const [cardCode,setCardCode] = useState(route.params.code);              //서비스카드번호
    const [checkReceipt,setCheckReceipt] = useState();      //접수구분
    const [customerName,setCustomerName] = useState();      //고객이름
    const [customerPhone,setCustomerPhone] = useState();    //고객연락처
    const [receiptDate,setReceiptDate] = useState();        //매장접수일
    const [appointmentDate,setAppointmentDate] = useState();//고객약속일
    
    const netInfo = useNetInfo();

    // info 2

    const [season,setSeason] = useState();                  //시즌
    const [productStyle,setProductStyle] = useState();      //제품 스타일
    const [productColor,setProductColor] = useState();      //제품 색상
    const [productSize,setProductSize] = useState();      //제품 사이즈
    const [productCode,setProductCode] = useState();        //제품 코드
    const [numbering,setNumbering] = useState();            //차수
    const [productExchange,setProductExchange] = useState();//제품 교환
    const [productPrice,setProductPrice] = useState();      //제품가격 
    const [receiptType,setReceiptType] = useState();        //제품구분
    

    const reReceipt = async(data,step)=>{
        await getProductCategory()
        SetReReceiptInfo(data,images)
        
        if(step ==0){
            navigation.navigate("ShopStepOne")
        }else if(step ==1){
            navigation.navigate("ShopStepTwo")
        }else if(step ==2){
            navigation.navigate("ShopStepThree")
        }else if(step ==3){
            navigation.navigate("ShopStepFour")
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
        if(data["receipt_code"]){
            setCardCode(data["receipt_code"])                    //서비스카드번호
        }else{
            setCardCode('미등록')
        }
        if( data["receipt_category"] == 1){                  //접수구분
            setCheckReceipt("고객") 
        }else if( data["receipt_category"] == 2){
            setCheckReceipt("선처리") 
        }else if( data["receipt_category"] == 3){
            setCheckReceipt("매장") 
        }           
        setCustomerName(data["customer_name"])               //고객이름
        setCustomerPhone(data["customer_phone"])             //고객연락처
        setReceiptDate(formatDate(data["receipt_date"]))     //매장접수일
        
        setAppointmentDate(formatDate(data["due_date"]))     //고객약속일

        //info 2
        let price = Number(data["product_tag_price"]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        
        setSeason(data["product_season_name"])               //시즌
        setProductStyle(data["product_style_code"])          //제품 스타일
        setProductColor(data["product_color"])               //제품 색상
        setProductSize(data["product_size"])                 //제품 사이즈
        setProductCode(data["product_code"])                 //제품 코드
        setNumbering(data["product_degree"])                 //차수
        setProductExchange(+data["image"])                   //제품 교환
        setProductPrice(price)                               //제품가격

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


    },[]);
    const getCategory=()=>{
        if(data.receipt_type ==1 || data.receipt_type ==2){
            getProductCategory();
        }
    }
    let btn
    if(step>2){
        btn =(
            <CenterView style={{borderTopWidth:1,borderTopStyle:'solid',borderTopColor:'rgba(200,200,200,0.2)'}}>
                <Button onPress={ ()=>{
                    if(netInfo.isConnected){
                        getCategory()
                        navigation.navigate( 'LookupInfo3',{data:data , images:images, needImages:needImages})
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
                    <TopText>서비스 카드 번호</TopText>
                    <InputText>{cardCode}</InputText>

                    <TopText>접수 구분</TopText>
                    <InputText>{checkReceipt ? checkReceipt : "미등록"}</InputText>
            
                    <TopText>매장명</TopText>
                    <InputText>{data.store_name}</InputText>
                    <TopText>매장 연락처</TopText>
                    <InputText>{data.store_contact}</InputText>

                    {customerName&&(<View>
                            <TopText>고객명</TopText>
                            <InputText>{customerName}</InputText>
                        </View>
                    )}
                    {customerPhone&&(<View>
                        <TopText>고객 연락처</TopText>
                        <InputText>{customerPhone}</InputText>
                        </View>
                    )}
                </InfoView>

                {productCode && (<InfoView>
                    <Half>
                      <HalfLine>
                            <TopText>시즌</TopText>
                            <InputText>{season}</InputText>
                      </HalfLine>

                      <HalfLine>
                            <TopText>스타일</TopText>
                            <InputText style={{fontSize:18}}>{productStyle}</InputText>
                      </HalfLine>
                    </Half>

                    <Half>
                          <HalfLine>
                                <TopText>컬러</TopText>
                                <InputText>{productColor}</InputText>
                          </HalfLine>

                          <HalfLine>
                                <TopText>사이즈</TopText>
                                <InputText>{productSize}</InputText>
                            </HalfLine>
                        </Half>
                      
                        <TopText>제품 바코드/qr코드 번호</TopText>
                        <InputText>{productCode}</InputText>
                    <TopText>차수</TopText>
                        <InputText>{numbering}</InputText>
                   
                    <TopText>판매가</TopText>
                        <InputText>{productPrice}</InputText>
                </InfoView>)}
              {receiptType&&(
                  <InfoView>
                    <TopText>요구 사항</TopText>
                    <InputText>{receiptType}</InputText>
                  </InfoView>
              )}

               
     
            </Contents>
            {btn}

            <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default LookupInfo;

const InfoView =styled.View`
    width: 100%;
    border:2px solid  rgb(0,80,130);
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
`;

const InputText = styled.Text`
    color:#000000;
    width: 100%;
    height: 45px;
    padding: 10px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
    align-items : center;  
`;


const HalfLine = styled.View`
    width : 45%;
    height : 100%;
`;
const TopText = styled.Text`
    color:#000000;
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
const BtnRed = styled.TouchableOpacity`
    width : 30%;
    height: 50px;
    background: rgb(180,0,0);
    justify-content: center;
    align-items: center;
    border-radius:12px;    
`;
