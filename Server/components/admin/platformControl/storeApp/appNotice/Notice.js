import React ,{useCallback,useEffect,useState}from "react";
import styled from "styled-components";

const Notice = ({data,red="",minHeight=0 ,fontSize = "12px"}) => {

    let ntc = data
   
    return(
        <Container style= {{minHeight:minHeight}}>
            <View style={{margin:20,flex:1,marginTop:12*5,paddingBottom:0}}>
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
export default  Notice
const Container = styled.div`
    flex: 1;
    align-items: center;
  
`;
const View = styled.div`
    
        display : flex;
    flex-direction : column;
    white-space: pre-wrap;
    word-break: break-all;
`;
const Text = styled.div`
   font-size:12px;
   margin-top:12px;
   
`;