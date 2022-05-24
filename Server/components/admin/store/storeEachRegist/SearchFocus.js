import React, { useState } from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";

const SearchFocus = ({managerList,width,handler=()=>{},focusSeter=()=>{}}) => {
  const [target,setTarget] = useState("")
  const [managerListResult,setManagerListResult] = useState(managerList)

  const [isFocus,setIsFocus] = useState(false)

  const clicker=(target,value)=>{
      setIsFocus(false)
      setTarget(target)
      handler(value)
      
  }


  const search=(text)=>{

      setTarget(text)

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
      style={{display:"flex",width:"352px",position:"absolute",top:2,left:"147px",flexDirection:"column"}}
      
      onFocus={()=>{
        setIsFocus(true)
      }}
      onBlur={async()=>{
        await sleep(0.1)
        setIsFocus(false)
      }}
    >
      <input placeholder="검색 후 해당 매니저를 클릭해 주세요"  value={target || ""} style={{flex:1,minHeight:"56px",border:0,padding:10 ,display:"flex",textAlign:"center"}} onChange={(e)=>{search(e.target.value)}}/>
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