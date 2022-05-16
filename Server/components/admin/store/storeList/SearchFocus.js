import React, { useState,useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import COLOR from "../../../../constants/color";

const SearchFocus = ({
  managerList,
  name="",
  setName=()=>{},
  handler=()=>{},
  checkNewManager = ()=>{}
}) => {
  console.log(managerList)
  const [target,setTarget] = useState("")

  const [managerListResult,setManagerListResult] = useState(managerList)

  const [isFocus,setIsFocus] = useState(false)

  

  const clicker=(target,value)=>{
      setIsFocus(false)
      setTarget(target)
      checkNewManager(false)

      handler(value,true)
      
  }
  
  const search=(text)=>{

      setTarget(text)
      setName(text)
      if(text){
          let filt = _.filter(managerList,function(obj){
            return obj.search_text.indexOf(text) !== -1;
          })
          setManagerListResult(filt)
      }else{
          setManagerListResult(managerList)
      }
  }

  
  const sleep = (sec) => {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }
    
  return(
      <div 
        style={{display:"flex",width:"352px",minHeight:"58px",position:"absolute",top:2,left:"147px",flexDirection:"column"}}
        
        onFocus={()=>{
          setManagerListResult(managerList)
          checkNewManager(true)
          handler(0,false)
          setIsFocus(true)
        }}

        onBlur={async()=>{
          await sleep(0.2)
          setIsFocus(false)
        }}
      >
        <InputLine placeholder="검색 or 입력" value={name || ""} style={{flex:1,minHeight:"58px",border:0,padding:10 ,display:"flex",textAlign:"center",}} onChange={(e)=>{search(e.target.value)}}/>
          {
            isFocus &&
            <div>
              {managerListResult.length>0 &&
                <SearchResultList style={{width:"352px",marginTop:"3px"}}>

                {
                  managerListResult.map((item,index)=>(
                    <SearchResult key={index}  style={{width:"345px",height:"45px",cursor:"pointer"}} onClick={()=>{clicker(item.search_text,item.staff_phone)}} >{item.search_text}</SearchResult>
                  ))
                }
                      
                </SearchResultList>
              }
            </div>
          }
      </div>
  );
};

export default SearchFocus;

const SearchResultList =styled.div`
    max-height:150px;
    border-top: 1px solid  ${COLOR.WHITE};
    border-left: 1px solid  ${COLOR.WHITE};
    border-right: 1px solid  ${COLOR.LIGHT_GRAY};
    border-bottom: 1px solid  ${COLOR.LIGHT_GRAY};
    background-color :  rgb(254,254,254);
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 8px;
      height: 10px;
      background: rgb(230, 230, 230);
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(106, 106, 106);
      border-radius: 6px;
    }
`;

const SearchResult =styled.div`
    padding-top:15px;
    padding-bottom:5px;
    font-size:18px;
    display:flex;
    justify-content:center;
    align-items:center
    height:30px;
    border-bottom: 1px solid  ${COLOR.LIGHT_GRAY};
    background-color : rgb(254,254,254);
    &:hover{
        background-color : ${COLOR.LIGHT_GRAY};
    }

`;

const InputLine  = styled.input`
    border 0px;
    padding-left:10px;
    font-size:15px;
    display:flex;
    &:focus { 
      outline: none !important;
      border-color: #719ECE;
      box-shadow: 0 0 10px #719ECE;
        
    }

`;