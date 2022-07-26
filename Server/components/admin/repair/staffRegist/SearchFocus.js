import React, { useState,useEffect ,useCallback} from "react";
import axios from "axios";
import styled from "styled-components";
import COLOR from "../../../../constants/color";

const SearchFocus = ({
  shopList=[],
  name="",
  setName=()=>{},
  handler=()=>{},
}) => {
  const [target,setTarget] = useState("")

  const [shopListResult,setShopListResult] = useState(shopList)

  const [isFocus,setIsFocus] = useState(false)

  

  const clicker=(target,text,code)=>{
      setIsFocus(false)
      setTarget(target)
      setName(text)

      handler(text,target,code)
      
  }
  const emptySpace =(str)=>{
    let name = ""
    for(let i =0; i<str.length;i++){
        if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
            name += "-"
        }else if(str[i] !== " " && str[i]){
            name += str[i]
        }
    }
    return(String(name).replace(/-/g," "))
    
}
  
  const search=(text)=>{

      setTarget(text)
      setName(text)
      if(text){
          let filt = _.filter(shopList,function(obj){
            return String(obj.receiver_name).indexOf(text) !== -1;
          })
          setShopListResult(filt)
      }else{
          setShopListResult(shopList)
      }
  }

  const keyPressHandler = useCallback(
    (e) => {
      if (e.key == "Enter") {
        let isRegisted = false
        shopListResult.map((item)=>{
          if(emptySpace(e.target.value) === emptySpace(item.receiver_name)){
            clicker(item.receiver_id,item.receiver_name,`R.${String(item.receiver_name).replace(/ /g,"_")}`)
            isRegisted = true;
          }
        })
        if(!isRegisted){
          alert("존재하지 않는 수선처 입니다")
        }
      }
    },
    
    []
);
  
  const sleep = (sec) => {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
  }
    
  return(
      <div 
        style={{display:"flex",width:"356px",minHeight:"56px",position:"absolute",top:0,flexDirection:"column"}}
        
        onFocus={()=>{
          setShopListResult(shopList)
          handler(0,false)
          setIsFocus(true)
        }}

        onBlur={async()=>{
          await sleep(0.2)
          setIsFocus(false)
        }}
      >
        <InputLine placeholder="검색 or 입력" value={name || ""} style={{flex:1,minHeight:"56px",border:0,padding:10 ,display:"flex",textAlign:"center",}} 
          onKeyPress={(e)=>{keyPressHandler(e)}}
          onChange={(e)=>{search(e.target.value)}}/>
          {
            isFocus &&
            <div>
              {shopListResult.length>0 &&
                <SearchResultList style={{width:"340x",marginTop:"3px"}}>

                {
                  shopListResult.map((item,index)=>{
                    if(item.receiver_name){
                      return(
                          <SearchResult key={index}  style={{width:"340x",height:"45px",cursor:"pointer"}} 
                            onClick={()=>{clicker(item.receiver_id,item.receiver_name,`R.${String(item.receiver_name).replace(/ /g,"_")}`)}} >{item.receiver_name}</SearchResult>
                      )
                    }})
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
    font-size:15px;
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