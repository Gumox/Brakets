import React ,{useCallback,useEffect,useState}from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native";
import Container from "../../components/Container";
import ContainView from "../../components/ContainView";
import axios from "axios";
import ip from "../../serverIp/Ip";
import { split } from "lodash";

export default function Notice({navigation}) {
    const [textData,setTextData] =useState(null)
    const fontSize =(Dimensions.get('window').width)*0.05;
    console.log(fontSize)

    const getNotice = useCallback(async () => {
        const { data } = await axios.get(ip+`/api/notice`);
        setTextData(data.data[0].text)
    })
    getNotice()
    console.log(textData)
    var ntc =[]
    if(textData !== null){
        const textNotice = textData.split("*")
        
        console.log("Text notice")
        for (let i = 0; i <textNotice.length; i++) {
            const element =textNotice[i];
            const key =i;
            if(element != ""){
                console.log(element)
                var fontColor ="#000000"
                if(key === textNotice.length-1){
                    fontColor = "#FF0000"
                }
                var noticeInfo =(
                    <Text key = {key} style={{fontSize:fontSize,color:fontColor, margin:fontSize}}>{element}</Text>
                )
                ntc[key] = (noticeInfo); 
            }
            
        }
    }
    return(
        <Container>
            <View style={{margin:30,flex:1,marginTop:fontSize*5}}>
                {ntc}
            </View>
        </Container>
    )
}