import React ,{useCallback,useEffect,useState}from "react";
import styled from "styled-components";

const Notice = ({data,minHeight=0}) => {
    const [textData,setTextData] =useState(data)

    console.log(textData)
    let ntc =[]
    if(textData !== null){
        const textNotice = String(textData).split("*")
        

        for (let i = 0; i <textNotice.length; i++) {
            const element =textNotice[i];
            const key =i;
            if(element != ""){
                console.log(element)
                let fontColor ="#000000"
                if(key === textNotice.length-1){
                    fontColor = "#FF0000"
                }
                let noticeInfo =(
                    <Text key = {key} style={{color:fontColor}}>{element}</Text>
                )
                ntc[key] = (noticeInfo); 
            }
            
        }
    }
    return(
        <Container style= {{minHeight:minHeight}}>
            <View style={{margin:30,flex:1,marginTop:12*5}}>
                {ntc}
            </View>
        </Container>
    )
}
export default  Notice
const Container = styled.div`
    flex: 1;
    align-items: center;
  
`;
const View = styled.div`
  
`;
const Text = styled.div`
   font-size:12px;
   margin-top:12px;
`;