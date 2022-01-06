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
      
})
 
function LookupInfo4( { route,navigation } ) {

    const [repairShop,setRepairShop] = useState();          //수선처 
    const [repairShopDate,setRepairShopDate] = useState();  //수선처 접수일
    const [repairShopSendDate,setRepairShopSendDate] = useState();//수선처 발송일
    const [repairShopSendDescription,setRepairShopSendDescription] = useState();//수선처 설명

    const [mainCenterDate,setMainCenterDate] = useState();  //본사 접수일
    const [mainCenterSendDate,setMainCenterSendDate] = useState();//본사 발송일
    const [mainCenterSendDescription,setMainCenterSendDescription] = useState();//본사설명

    
    const [repairPrice,setRepairPrice] = useState();        //수선비
    const [isSelected , setSelection] = useState(false);    //유상수선유무

    const [requstImage,setRequstImage] = useState();
   

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


    },[]);
    var repairShops =[]
    
    return(
        <Container>
            <Contents style = {{width: Dimensions.get('window').width, height: Dimensions.get('window').height ,paddingTop:24}}>
                

            <Text style={{marginBottom:10}}>수선처 : {repairShop}</Text>
              <InfoView>
                  <TopText>수선처 접수일</TopText>
                  <InputText>{repairShopDate}</InputText>
                      
                  <TopText>수선처 발송일</TopText>
                  <InputText>{repairShopSendDate}</InputText>
                <TopText>수선처 설명</TopText>
                <InputText>{repairShopSendDescription}</InputText>

              </InfoView>
              

              <InfoView>
                <TopText>본사 접수일</TopText>
                <InputText>{mainCenterDate}</InputText>
                <TopText>본사 발송일</TopText>
                <InputText>{mainCenterSendDate}</InputText>
                <TopText>본사 설명</TopText>
                <InputText>{mainCenterSendDescription}</InputText>
              </InfoView>

              <TopText style={{marginBottom : 10, marginLeft:10}}>매장 인수일</TopText>
              <PrView>
              <InputText style={styles.Lavel}>{selectDay}</InputText>
              </PrView>
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
                    <TopText style={{color : "#ff0000" ,fontSize :18 ,fontWeight :"bold"}}>수선비  {repairPrice}</TopText>
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
export default LookupInfo4;