import React ,{useCallback,useEffect,useState}from "react";
import styled from "styled-components";

const SmsNotice = ({data}) => {
    const [textData,setTextData] =useState(data)

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
                    <Text key = {key} style={{fontSize:11,color:fontColor, margin:11}}>{element}</Text>
                )
                ntc[key] = (noticeInfo); 
            }
            
        }
    }
    return(
        <Container >
            <View style={{margin:30,flex:1,alignItems:"center",justifyContent:"center",marginBottom:11*5}}>
                {ntc}
            </View>
        </Container>
    )
}
export default  SmsNotice
const Container = styled.div`
    flex: 1;
    display:flex;
    justify-content: center;
    align-items: center;
  
`;
const View = styled.div`
    display : flex;
    flex-direction : column;
`;
const Text = styled.div`
   font-size:12px;
   margin-top:12px;
`;