import React ,{useCallback,useState}from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native";
import Container from "../../components/Container";
import axios from "axios";
import ip from "../../serverIp/Ip";

export default function PrivacyNotice({navigation}) {
    const [textData,setTextData] =useState(null)
    const fontSize =(Dimensions.get('window').width)*0.055;
    console.log(fontSize)

    const getPrivacyNotice = useCallback(async () => {
        const { data } = await axios.get(ip+`/api/notice/privacy`);
        setTextData(data.data[0].text)
    })
    getPrivacyNotice()
    console.log(textData)
    let ntc =[]
    
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