import React ,{useCallback,useEffect,useState}from "react";
import styled from 'styled-components/native'
import { Dimensions, View } from "react-native";
import { Text } from "react-native";
import Container from "../../components/Container";
import axios from "axios";
import ip from "../../serverIp/Ip";
import store from "../../store/store";

export default function Notice({navigation}) {
    const [textData,setTextData] =useState("")
    const [redTextData,setRedTextData] =useState("")
    const fontSize =(Dimensions.get('window').width)*0.05;
    //console.log(fontSize)

    useEffect(()=>{
        const fetch = async () => {
            let info =store.getState().userInfo[0]
            let smsNoticeData ={
                noticeType:1,
                headquarterId:info.headquarter_id 
              }
            const[smsNotice] =await Promise.all([
    
                axios.post(`${ip}/api/notice/noticeByNoticeType`,smsNoticeData)
                .then(({ data }) => data.data)
                .catch(error=>{
    
                })
            ])
            //console.log(smsNotice[0])
            setTextData(smsNotice[0].text)
            setRedTextData(smsNotice[0].red_text)
        }
        fetch()
        //console.log(store.getState().userInfo)
    },[])

    return(
        <Container style= {{backgroundColor:"#ffffff"}}>
            <View style={{margin:30,flex:1,marginTop:fontSize*5}}>
                <MyText style={{fontSize:fontSize, margin:fontSize}}>
                    {textData}
                </MyText>
                {redTextData.length >0
                    &&
                    <MyText style={{fontSize:fontSize,color: "#FF0000"}}>
                        {"\n"}
                        {redTextData}   
                    </MyText>
                    

                }
            </View>
        </Container>
    )
}
const MyText = styled.Text`
    display : flex;
    flex-direction : column;
    color : #000000;
`;