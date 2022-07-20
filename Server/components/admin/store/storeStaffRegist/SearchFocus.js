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

  const [isMulti,setIsMulti] = useState("")

  const [shopListResult,setShopListResult] = useState(shopList)

  const [isFocus,setIsFocus] = useState(false)

  

  const clicker=(target,text)=>{
      setIsFocus(false)
      setTarget(target)

      const result = _.filter(shopList,{"staff_id":target})


      if(result.length > 1){
        setIsMulti(true)
      }else{
        setIsMulti(false)
      }
      setName(text)

      handler(target)
      
  }
  const emptySpace =(text)=>{
    let str = String(text)
    let name = ""
    for(let i =0; i<str.length;i++){
      if(text){
        
        if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
          name += "-"
        }else if(str[i] !== " " && str[i]){
            name += str[i]
        }
      }
    }
    return(String(name).replace(/-/g," "))
    
}
  
  const search=(text)=>{

      setTarget(text)
      setName(text)

      

      if(text){
          let filt = _.filter(shopList,function(obj){
            return String(obj.store_name).toUpperCase().indexOf(String(text).toUpperCase()) !== -1;
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

        const result = _.filter(shopList,{"staff_id":target})

        if(result.length > 1){
          setIsMulti(true)
        }else{
          setIsMulti(false)
        }

        shopListResult.map((item)=>{
          if(emptySpace(e.target.value) === emptySpace(item.receiver_name)){
            clicker(item.staff_id,item.store_name)
            isRegisted = true;
          }
        })
        if(!isRegisted){
          alert("존재하지 않는 매장 입니다")
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
        style={{display:"flex",width:"691px",minHeight:"56px",position:"absolute",top:0,flexDirection:"column" ,zIndex:99}}
        
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
        <PrView>
          <div>
            {isMulti 
              ?<MultiCheck>멀티 브랜드</MultiCheck>
              :<MultiCheck></MultiCheck>
            }
          </div>
          <InputLine placeholder="검색 or 입력" value={name || ""} style={{flex:1,minHeight:"52px",border:0,padding:10 ,display:"flex"}} 
            onKeyPress={(e)=>{keyPressHandler(e)}}
            onChange={(e)=>{search(e.target.value)}}/>
        </PrView>
        
          {
            isFocus &&
            <div>
              {shopListResult.length>0 &&
                <SearchResultList style={{width:"340px",marginTop:"3px",}}>

                {
                  shopListResult.map((item,index)=>{
                    if(item.store_name){
                      return(
                          <SearchResult key={index}  style={{width:"340x",height:"45px",cursor:"pointer",justifyContent:"center"}} 
                            onClick={()=>{clicker(item.staff_id,item.store_name)}} >{item.store_name}</SearchResult>
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
const MultiCheck = styled.div`
    color : rgb(100,200,100);
    width : 120px;
    font-size : 13px;
    height : 56px;
    display:flex;
    align-items:center;
    justify-content: center;

`
const SearchResult = styled.div`
    padding-top:15px;
    padding-bottom:5px;
    font-size:14px;
    display:flex;
    height:30px;
    border-bottom: 1px solid  ${COLOR.LIGHT_GRAY};
    background-color : rgb(254,254,254);
    &:hover{
        background-color : ${COLOR.LIGHT_GRAY};
    }

`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;
const InputLine  = styled.input`
    border: 0px;
    margin: 2px;
    padding-left:10px;
    font-size:14px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        //box-shadow: 0 0 10px #719ECE;
    }
`;