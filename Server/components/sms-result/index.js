import React, { useState, useCallback, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import styled from "styled-components";
import COLOR from "../../constants/color";
import List from './list'
import SelectList from "./list/selectList";
import { UserContext } from "../../store/Context";
import formatDate from "../../functions/formatDate";
import _ from "lodash"

const SmsResult = ({}) => {
  const user = useContext(UserContext)
  const [selectDate,setSelectDate] =useState(null);
  const [resultDataList,setResultDataList] =useState([]);
  const [check,setCheck] =useState(false);
  const [month,setMonth] =useState();
  const [year,setYear] =useState();
  const [pack,setPack] = useState([]);
  
  const [openPack,setOpenPack] = useState({});

  const makePack =(arr)=>{
    const beforePack = _.sortBy(arr,'staff_code')
    let list =[]
    let index =0;
    let nextList =[];
    let nextIndex =0;
    console.log(beforePack)
    beforePack.map((el)=>{
      if(list[index] !=undefined){
        
        if(list[index][0].staff_code !==el.staff_code){
          index = index+1;
          list[index] = [el]
        }else{
          console.log(el.sms_result_message)
          list[index].push(el)
        }
      }else{
        list[index] = [el]
      }
    })
    if(list.length>0){
      list.map((arr2)=>{
        
        let wordIndex =['empty'];
        const beforePack = _.sortBy(arr2,'sms_result_message')
        beforePack.map((item)=>{

          if(nextList[nextIndex] !=undefined){
            if(item.sms_result_message !==  nextList[nextIndex][0].sms_result_message){
              
              nextIndex = nextIndex+1;
              if(_.findIndex(wordIndex,item.sms_result_message)>0){
                let insertIndex = _.findIndex(wordIndex,item.sms_result_message)
                
                nextList[insertIndex].push(item)

              }else{
                nextList[nextIndex] = [item]  
                wordIndex[nextIndex] =[item.sms_result_message]
              }
            }else{
              
              nextList[nextIndex].push(item)
            }
            
          }else{
            nextList[nextIndex] = [item]
            wordIndex[nextIndex] =[item.sms_result_message]
          }
          
        })
      })
     
    }
    console.log(nextList)
    setPack(nextList)
  }
  const getSmsResult = async(sendDate,month,year)=>{
    console.log(sendDate,month,year)
    if(sendDate){
      const datas = await axios.post(
        `${process.env.API_URL}/sms/getSmsResult`,{
          body:{
            send_date:sendDate,
            month:month,
            year:year,
          }
        }
      );
      console.log(datas.data)
      makePack(datas.data)
      return datas.data
    }
  }
  const unpack =(array)=>{
    //console.log(array)
    let returnList =[]
    array.map((el,i)=>{
      let obj = el;
      let time = el.send_date;

      obj["No"] = i+1;
      obj["send_date"] = String(time).slice(0,10)
      returnList.push(obj)
    })
    setOpenPack(returnList)
  }
  return (
 
    <>
      <SmsInqueryView>
        <SmsInquery>
            <div style={{marginBottom:10,fontSize:15,fontWeight:"bold"}}>SMS 전송결과 조회</div>
            <LaView> 
              <div style={{marginRight:10}}>조회일자:</div> 
              <input type={"date"} onChange={(e)=>{
                  if(e.target.value){
                    setSelectDate(formatDate(new Date(e.target.value)))
                    if(check){
                      setMonth((new Date(e.target.value)).getMonth()+1)
                      setYear((new Date(e.target.value)).getFullYear())
                    }
                  }else{
                    setSelectDate(null)
                  }
                  
                }}/> 
              <input type={"checkbox"} onClick={()=>{
                  if(!check){
                    if(selectDate){
                      setMonth((new Date(selectDate)).getMonth()+1)
                      setYear((new Date(selectDate)).getFullYear())
                    }
                  }
                  else{
                    setMonth()
                    setYear()
                  }
                  setCheck(!check);

                }}/><div style={{color:COLOR.CYAN_BLUE}}>월별</div>
              <SmsButton onClick={()=>{getSmsResult(selectDate,month,year)}}>조회</SmsButton></LaView>
        </SmsInquery>

        <TempView>
          <LaView style={{fontSize: 20}}>
            <WordBoxTop>사용자</WordBoxTop>
            <WordBoxTop>결과</WordBoxTop>
            <WordBoxTop style={{justifyContent:"right",paddingRight:10}}>count</WordBoxTop>
          </LaView>
          {
            pack.map((el,i)=>{
              return(
                <HoverLine  key={i}><WordBoxUnder onClick={()=>{
                  unpack(el)
                }}><WordBoxMiddle>{el[0].staff_code}</WordBoxMiddle>
                   <WordBoxMiddle>{el[0].sms_result_message}</WordBoxMiddle>
                   <WordBoxMiddle style={{justifyContent:"right",paddingRight:10}}>{el.length}</WordBoxMiddle>
                </WordBoxUnder></HoverLine>
              )
            })
          }
        </TempView>
      </SmsInqueryView>
      <ScrollList>
      <SelectList data={openPack} style={{height:"50%"}}></SelectList>
      </ScrollList>
      
        {/*
         <List data={openPack}></List>
         */}
    </>
 
  );
};
const ScrollList =styled.div`

  height: 55%;
  overflow: scroll;
  border-bottom: 2px solid;
  border-left: 1px solid;
  &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
      background: rgba(96, 96, 96, 0.7);
      border-radius: 6px;
  }
  .fixed-layer{
      position: fixed;
  }
`
const WordBoxTop = styled.div`
  display: flex;
  flex-direction: row;
  margin-left:1px;
  align-items:center;
  justify-content:center;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid rgba(192,189,185);
  border-bottom: 2px solid rgba(132,130,124);
  min-width: 120px;
  
`
const WordBoxMiddle = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content:center;
  border-right: 2px solid rgba(192,189,185);
  min-width: 120px;
  height: 30px;
  
`
const WordBoxUnder = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  border-top: 2px solid rgba(132,130,124);
  border-left: 2px solid rgba(192,189,185);
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  
`
const SmsInqueryView = styled.div`
  display: flex;
  flex-direction: row;
  height: 40%;
`;
const HoverLine = styled.div`
  display: flex;
  flex-direction: row;  
  margin:2px;
  align-items:center;
  width: 90%;
  
  &: hover {
    color:${COLOR.WHITE};
    background-color: rgba(0, 119, 211);
  }
`;
const LaView = styled.div`
  display: flex;
  flex-direction: row;  
  margin:2px;
  align-items:center;
`;

const SmsInquery = styled.div`
  width: 40%;
  padding:30px;
  border: 1px solid;
  min-width:400px;
`;

const TempView = styled.div`
  width: 60%;
  border: 1px solid;
  background-color:${COLOR.LIGHT_GRAY};
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: rgba(210, 210, 210, 0.4);
}
&::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
}
`;

const SmsButton = styled.button`
  height: 25px;
  background-color: ${COLOR.FILTER_MAIN};
  color: ${COLOR.WHITE};
  margin: 0 15px;
  padding: 0 20px;
  border-radius: 5px;
  border: none;
`;

export default SmsResult;
