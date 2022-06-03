import React, { useCallback, useState } from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";

const AutoSmsMessage = ({text="",state=false})=>{
    const [message1,setMessage1] = useState(text.auto_sms_message1)
    const [message2,setMessage2] = useState(text.auto_sms_message2)
    const [message3,setMessage3] = useState(text.auto_sms_message3)

    
    const [message1Height,setMessage1Height] = useState(heightMaker(text.auto_sms_message1))
    const [message2Height,setMessage2Height] = useState(heightMaker(text.auto_sms_message2))
    const [message3Height,setMessage3Height] = useState(heightMaker(text.auto_sms_message3))

    const resize =(e,num)=> {
        e.target.style.height = "1px";
        e.target.style.height = (12+e.target.scrollHeight)+"px";

        if(num === 1){
            setMessage1Height(e.target.style.height)
        }else if(num === 2){
            setMessage2Height(e.target.style.height)
        }else if(num === 3){
            setMessage3Height(e.target.style.height)
        }
    }
    let flexDirectionOption = "column-reverse";
    if(!state){
        flexDirectionOption = "column-reverse";
    }else{
        flexDirectionOption = "column";
    }
    
    return(
        <Container style={{flexDirection: flexDirectionOption}}>
            {!state 
                ?
                <MessageView className="pull" style={{}}>
                    {"\n"}
                    {"( 브랜드 )"}
                    {message1}
                    {" ( 매장 )"}
                    {message2}
                    {"( 접수번호 )"}
                    {message3}
                </MessageView>
                :
                <div style={{width:"100%"}} >
                    <div>
                        <DivHeader>
                            {"( 브랜드 )"}
                        </DivHeader>
                        <InputLine value={message1} style={{height:message1Height}} onKeyDown={(e)=>{resize(e,1)}} onKeyUp={(e)=>{resize(e)}} onChange={(e)=>{setMessage1(e.target.value)}} />
                        
                    </div>
                    <div>
                        <DivHeader>
                            {"( 매장 )"}
                        </DivHeader>
                        <InputLine value={message2} style={{height:message2Height}} onKeyDown={(e)=>{resize(e,2)}} onKeyUp={(e)=>{resize(e)}} onChange={(e)=>{setMessage2(e.target.value)}} /> 
                    </div>
                    <div>
                        <DivHeader>
                            {"( 접수번호 )"}
                        </DivHeader>
                        <InputLine value={message3} style={{height:message3Height}} onKeyDown={(e)=>{resize(e,3)}} onKeyUp={(e)=>{resize(e)}} onChange={(e)=>{setMessage3(e.target.value)}} />
                    </div>
                </div>
            }
        </Container>
    )
    
}
const heightMaker =(str)=>{
    let count = 0;
    let pos = str.indexOf('\n'); 

    while (pos !== -1) {
    count++;
    pos = str.indexOf('\n', pos + 1);

   
    }
    console.log(count)
    return(18*count+10)
}

export default AutoSmsMessage

const Container = styled.div`
    flex: 1;
    display: flex; 
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom:60px;
  
`;

const MessageView = styled.div`
    /*display : flex;
    min-height: 60px;
    padding:6px;
    min-width: 20px
    flex-direction : column;
    white-space: pre-wrap;
    background-color:rgba(50,200,50,0.8);
    border-radius: 10px;*/
    
    position:relative;
    
    display : flex;
    min-height: 60px;
    padding:6px;
    min-width: 20px
    flex-direction : column;
    white-space: pre-wrap;
    background-color:rgba(50,200,50,0.8);
    border-radius: 10px;

    &:after {
        content:"";
        position: absolute;
        bottom: 15px;
        right: -10px;
        border-left: 10px solid rgba(50,200,50,0.8);;
        border-top: 4px solid transparent;
        border-bottom: 8px solid transparent;
    }
}   
    

`;
const DivHeader = styled.div`
    color:${COLOR.CYAN_BLUE}

`;

const InputLine  = styled.textarea`
    border 0px;
    width:100%;
    font-size:12px;
    min-height: 18px;
    resize: none;
    background-color:rgba(50,200,50,0.2);
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
    &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        background: rgba(210, 210, 210, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius:0px;
    }

`;
