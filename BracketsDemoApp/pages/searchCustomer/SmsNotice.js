import React ,{useCallback,useState}from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native";
import Container from "../../components/Container";
import axios from "axios";
import ip from "../../serverIp/Ip";
import {useNetInfo}from "@react-native-community/netinfo";

export default function SmsNotice({navigation}) {
    const [textData,setTextData] =useState(null)
    const fontSize =(Dimensions.get('window').width)*0.05;
    console.log(fontSize)

    const getNotice = useCallback(async () => {
        const { data } = await axios.get(ip+`/api/notice/sms`);
        setTextData(data.data[0].text)
    })
    getNotice()
    console.log(textData)
    let ntc =[]
    const netInfo = useNetInfo();
    if(netInfo.isConnected){
        console.log("netInfo.isConnected: ",netInfo.isConnected)
    }else{
        alert("네트워크 연결 실패\n 연결상태를 확인해주세요")
    }
    if(textData !== null){
        const textNotice = textData.split("*")
        
        console.log("Text notice")
        for (let i = 0; i <textNotice.length; i++) {
            const element =textNotice[i];
            const key =i;
            if(element != ""){
                console.log(element)
                var fontColor ="#000000"
                
                var noticeInfo =(
                    <Text key = {key} style={{fontSize:fontSize,color:fontColor, margin:fontSize}}>{element}</Text>
                )
                ntc[key] = (noticeInfo); 
            }
            
        }
    }
    return(
        <Container>
            <View style={{margin:30,flex:1,alignItems:"center",justifyContent:"center",marginBottom:fontSize*5}}>
                {ntc}
            </View>
        </Container>
    )
}