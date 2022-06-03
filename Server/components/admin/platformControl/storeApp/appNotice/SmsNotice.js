import React ,{useCallback,useEffect,useState}from "react";
import styled from "styled-components";

const SmsNotice = ({data,red="",minHeight=0,fontSize = "12px"}) => {

    let ntc = data
   
    return(
        <Container style= {{minHeight:minHeight}}>
            <View style={{margin:20,flex:1,paddingBottom:0,width:"100%"}}>
                <div style={{fontSize: fontSize}}>
                    {ntc}
                </div>
                
                {red.length >0
                    &&
                    <div style={{color: "#FF0000",fontSize: fontSize}}>
                        {"\n"}
                        {red}   
                    </div>
                    

                }
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
    white-space: pre-wrap;
`;
const Text = styled.div`
   font-size:12px;
   margin-top:12px;
`;