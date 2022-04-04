import React from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    flex:1;
    width: 48%;
    min-Height: 120px;
    justify-content: center;
    align-items: center;
    margin:15px;
    background-color:rgb(248,248,248);
    border:2px solid #ffffff;
`;
const PrView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%;
    margin-top:10px;
`;
const PrView3 = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin-top:10px;
`;
const PrView2 = styled.View`
    flex-direction: row-reverse;
    width: 100%;
    margin-left:20px;
    margin-top:10px;
`;
const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;
`;
const Label2 = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #000000;
    margin-right:5px;
    
`;
const Label3 = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    margin-right:5px;
    
`;

function LookupInfoCard(props) {
    const obj = props.data;
    const  formatDate = (_inputDate)=> {
        const inputDate = new Date(_inputDate)
        if(_inputDate){
            let month = '' + (inputDate.getMonth() + 1),
                day = '' + inputDate.getDate(),
                year = inputDate.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            const value = [year, month, day].join('-');
            return value
        }
    }
    let prdDiv;
    let prdDivColor ="#000000";
    let basicInfoColor ="#000080"
    let stepTextSize = 15;
    let LongStepTextSize = 14;
    let serviceCardFontSize = 14

    if(obj["step"] == 0){
        prdDiv="접수중";
        prdDivColor ="#008000"
    }
    else if(obj["step"] == 1){
        prdDiv="접수 완료";
        prdDivColor ="#000080"
    }
    else if(obj["step"] == 2){
        prdDiv="인수 완료";
        prdDivColor ="#800000"
    }
    else if(obj["step"] == 3){
        prdDiv="수선처 접수 완료";
        prdDivColor ="#008000"
        stepTextSize =LongStepTextSize;
    }
    else if(obj["step"] == 4){
        prdDiv="수선처 매장 발송";
        prdDivColor ="#008080"
        stepTextSize =LongStepTextSize;
    }
    else if(obj["step"] == 5){
        prdDiv="수선처 본사 발송";
        prdDivColor ="#800080"
        stepTextSize =LongStepTextSize;
    }
    else if(obj["step"] == 6){
        prdDiv="본사 접수 완료";
        prdDivColor ="#808000"
        stepTextSize =LongStepTextSize;
    }
    else if(obj["step"] == 7){
        prdDiv="본사 매장 발송";
        prdDivColor ="#7888ee"
        stepTextSize =LongStepTextSize;
    }
    else if(obj["step"] == 8){
        prdDiv="본사 수선처 발송";
        prdDivColor ="#ee8055"
        stepTextSize =LongStepTextSize;
    }
    let checkReceipt =""
    if( obj["receipt_category"] == 1){                  //접수구분
        checkReceipt ="고객" ;
    }else if( obj["receipt_category"] == 2){
        checkReceipt ="선처리"; 
    }else if( obj["receipt_category"] == 3){
        checkReceipt = "매장"; 
    }
    let receiptDate =formatDate(obj["receipt_date"])
    let receiptDateColor ="#000080"

    if(!receiptDate){
        receiptDate ='미접수'
        receiptDateColor = "#008000"
    }
    let serviceCard = obj["receipt_code"]
    let serviceCardColor ="#000080"
    if(!serviceCard){
        serviceCard = '미등록' 
        serviceCardColor = "#008000"
    }
    console.log("serviceCard", serviceCard, String(serviceCard).length)
    console.log('Dimensions.get("window").width ',Dimensions.get("window").width*0.04)
    if(String(serviceCard).length>9){
        let overSize = String(serviceCard).length - 9
        console.log('width ',Dimensions.get("window").width*0.04-overSize)
        console.log("serviceCard", serviceCard)
        serviceCardFontSize= Dimensions.get("window").width*0.04-overSize;
    }
    return (
        <Container onPress={ props.onPress }>
            <PrView3>
                <Label>접수일</Label>
                <Label3 style={{color:receiptDateColor}}>{receiptDate}</Label3>
            </PrView3>
            <PrView3>
                <Label>서비스#</Label>
                <Label3 style={{color:serviceCardColor,fontSize:serviceCardFontSize}}>{serviceCard}</Label3>
            </PrView3>
            <PrView3>
                <Label>상태</Label>
                <Label2 style={{color:prdDivColor,fontSize:stepTextSize}}>{prdDiv}</Label2>
            </PrView3>
            
            <PrView3>
                <Label>구분</Label>
                <Label2 style={{color:basicInfoColor}}>{checkReceipt}</Label2>
            </PrView3>
            <PrView3>
                <Label>고객</Label>
                <Label2 style={{color:basicInfoColor}}>{obj["customer_name"]}</Label2>
            </PrView3>
            <PrView2>
                <Label3 style={{color:basicInfoColor ,marginRight:0}}>{obj["customer_phone"]}</Label3>
            </PrView2>
            
        </Container>
    )
}

export default LookupInfoCard;
/*3 : 수선처 접수 완료 | 4 : 수선처 매장 발송 | 5 : 수선처 본사 발송 | 6 : 본사 접수 완료 | 7 : 본사 매장 발송 | 8 : 본사 수선처 발송 | */