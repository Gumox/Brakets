import React ,{useCallback,useState}from "react";
import styled from "styled-components";

const PrivacyNotice = ({data}) => {
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
                    <Text key = {key} style={{fontSize:11,color:fontColor, margin:12}}>{element}</Text>
                )
                ntc[key] = (noticeInfo); 
            }
            
        }
    }
    return(
        <Container >
            <View style={{margin:30,flex:1,alignItems:"center",justifyContent:"center",marginBottom:12*5}}>
                {ntc}
            </View>
        </Container>
    )
}
export default PrivacyNotice

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