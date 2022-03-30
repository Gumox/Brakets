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
    border:2px solid rgb(0,80,150);
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
    border:2px solid  rgb(0,80,150);
    border-radius: 12px;
    padding: 15px;
    margin-bottom : 30px;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const InputText = styled.Text`
    color:#000000;
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
const TotalMoney = styled.View`
    flex:1;
    flex-direction : row;
    width : 50%;
    margin-left: 10%;

    `;
const TopText = styled.Text`
    color:#000000;
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
      
})
 
function LookupInfo2( { route,navigation } ) {
    const data =route.params.data;
    const needImages =route.params.needImages;
    const images = route.params.images;

    const [season,setSeason] = useState();                  //시즌
    const [productStyle,setProductStyle] = useState();      //제품 스타일
    const [productColor,setProductColor] = useState();      //제품 색상
    const [productSize,setProductSize] = useState();      //제품 사이즈
    const [productCode,setProductCode] = useState();        //제품 코드
    const [numbering,setNumbering] = useState();            //차수
    const [productExchange,setProductExchange] = useState();//제품 교환
    const [productPrice,setProductPrice] = useState();      //제품가격 
    const [receiptType,setReceiptType] = useState();        //제품구분

    useEffect(()=>{
        let price = Number(data["product_tag_price"]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        
        setSeason(data["product_season_name"])               //시즌
        setProductStyle(data["product_style_code"])          //제품 스타일
        setProductColor(data["product_color"])               //제품 색상
        setProductSize(data["product_size"])                 //제품 사이즈
        setProductCode(data["product_code"])                 //제품 코드
        setNumbering(data["product_degree"])                 //차수
        setProductExchange(+data["image"])                   //제품 교환
        setProductPrice(price)           //제품가격


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
    
   
    
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
                <InfoView>
                    <Half>
                      <HalfLine>
                          <TopText>시즌</TopText>
                              <InputText>{season}</InputText>
                      </HalfLine>

                      <HalfLine>
                          <TopText>스타일</TopText>
                              <InputText>{productStyle}</InputText>
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
              </InfoView>
              {receiptType&&(
                  <InfoView>
                    <TopText>고객 요구</TopText>
                    <InputText>{receiptType}</InputText>
                  </InfoView>
              )}
              
     
            </Contents> 
            <Button onPress={ ()=> navigation.navigate( 'LookupInfo3',{data:data ,images :images,needImages:needImages}) }>
                다음
            </Button>

            <Bottom navigation={navigation} />
         
        </Container>
    )
}
export default LookupInfo2;