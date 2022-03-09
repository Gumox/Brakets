import React, { useState, useCallback, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import styled from "styled-components";
import COLOR from "../../constants/color";
import List from './list'
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
  
  const [openPack,setOpenPack] = useState([]);

  console.log(selectDate)

  const makePack =(arr)=>{
    const beforePack = _.sortBy(arr,'staff_code')
    let list =[]
    let index =0;
    console.log(beforePack)
    beforePack.map((el)=>{
      if(list[index] !=undefined){
        console.log(list[index][0].staff_code)
        if(list[index][0].staff_code !==el.staff_code){
          console.log("out");
          index = index+1;
        }else{
          list[index].push(el)
        }
      }else{
        list[index] = [el]
      }
    })
    console.log(list)
    setPack(list)
  }
  const getSmsResult = async(sendDate,month,year)=>{
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
  return (
 
    <>
      <SmsInqueryView>
        <SmsInquery>
            <div style={{marginBottom:10,fontSize:15,fontWeight:"bold"}}>SMS 전송결과 조회</div>
            <LaView> 
              <div style={{marginRight:10}}>조회일자:</div> 
              <input type={"date"} onChange={(e)=>{
                  if(e.target.value){
                    console.log(1)
                    setSelectDate(formatDate(new Date(e.target.value)))
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
          <LaView><div>사용자</div><div>결과</div><div>count</div></LaView>
          {
            pack.map((el,i)=>{
              return(
                <LaView key={i} onClick={()=>{setOpenPack(el)}}><div>{el[0].staff_code}</div><div>결과</div><div>{el.length}</div></LaView>
              )
            })
          }
        </TempView>
      </SmsInqueryView>
        
        {/*<List data={openPack}></List> */}
    </>
 
  );
};

const SmsInqueryView = styled.div`
  display: flex;
  flex-direction: row;
  height: 40%;
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
  background-color:${COLOR.LIGHT_GRAY}
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
