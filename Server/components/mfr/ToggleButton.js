import React from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
const ToggleButton =({
    disabled=false,
    tof=false,
    tofClick = () => {}
})=>{

    let toggle 

    const toggleFunc =()=>{
        tofClick(!tof)
    }

    if(tof){
        toggle = (
            <YesButton onClick={()=>{toggleFunc()}}>Yes</YesButton>
        )
    }else{
        toggle = (
            <NoButton onClick={()=>{toggleFunc()}}>No</NoButton>
        )
    }

 return(
     <div>
        {
            disabled
            ? <DisabledWrapper>
                {toggle}
              </DisabledWrapper>

            : <Wrapper>
                {toggle}
              </Wrapper>
        }
     </div>
 )
}

export default ToggleButton

const YesButton = styled.div`
    font-size:15px;
    cursor: pointer;
    color:${COLOR.RED};

`;
const NoButton = styled.div`
    font-size:15px;
    color:${COLOR.CYAN_BLUE};
    
    cursor: pointer;
    
`;
const Wrapper = styled.div`
    border-radius:5px;
    margin-left:15px;
    padding:2px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width:45px;
    &: hover{
        background-color: ${COLOR.LIGHT_GRAY};
        color: ${COLOR.WHITE};
    }

`;

const DisabledWrapper = styled.div`
    border-radius:5px;
    margin-left:15px;
    padding:2px;
    display:flex;
    justify-content: center;
    align-items: center;
    width:45px;

`;