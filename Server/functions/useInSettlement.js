import axios from "axios"
import styled from "styled-components"

export const getSettlementData = async(list)=>{
    console.log(list)
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/RepairShop/settlement`,{
          params: list,
        })
        .then(({ data }) => data)
        .catch(error=>{

        })
      ])
      console.log(datas)
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