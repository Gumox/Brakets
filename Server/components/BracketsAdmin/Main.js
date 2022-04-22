import React from "react";
import styled from "styled-components";
import RegistCompay from "./RegistCompay";
const Main=(
  {
    pageNumber =0
  
  }
)=>{

  let page;
  if(pageNumber === 1){
    console.log(pageNumber)
  }else if(pageNumber === 2){
    console.log(pageNumber)
    page=(<RegistCompay></RegistCompay>)
  }else if(pageNumber === 3){
    console.log(pageNumber)
    
  }else if(pageNumber === 4){
    console.log(pageNumber)
    
  } 
  return (
    <Wrapper>
      {page}
      <h1>{pageNumber}</h1>
    </Wrapper>
  );
}

export default  Main
const Wrapper =styled.div`
  padding:18px;
`;