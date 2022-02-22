import axios from "axios"
import styled from "styled-components"

export const getSettlementData = async(list)=>{
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/RepairShop/settlement`,{
          params: list,
        })
        .then(({ data }) => data)
        .catch(error=>{

        })
      ])
      return datas;
}
export const setStateAtOne = async(list) =>{
    const[datas] =await Promise.all([
      axios.put(`${process.env.API_URL}/RepairShop/settlement/setStateAtOne`,{
        body: list,
      })
      .then(({ data }) => data)
      .catch(error=>{

      })
    ])
    return ;
  }
  
export const setStateAtTwo = async(list) =>{
    const[datas] =await Promise.all([
      axios.put(`${process.env.API_URL}/RepairShop/settlement/setStateAtTwo`,{
        body: list,
      })
      .then(({ data }) => data)
      .catch(error=>{

      })
    ])
    return ;
}
  

export const sortSettlementData = (data ,types) =>{
    const repair_type = types
    let sorteddata=``;
    let repair1_name,repair2_name,repair3_name;
    repair_type.map((el)=>{
        if(data.repair1_type_id === el.value){
            repair1_name = el.text;
            sorteddata +=repair1_name+`(${data.repair1_count})` 
        }
        if(data.repair2_type_id === el.value){
            repair2_name = el.text;
            sorteddata += `\n`+repair2_name+`(${data.repair2_count})` 
        }
        if(data.repair3_type_id === el.value){
            repair3_name = el.text;
            sorteddata +=`\n`+repair3_name+`(${data.repair3_count})` 
        }
    })
    return(sorteddata)
  
}