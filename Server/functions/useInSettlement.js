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
export const updateContentEdit = async(list) =>{
    const[datas] =await Promise.all([
      axios.put(`${process.env.API_URL}/RepairShop/settlement/contentEdit`,{
        body: list,
      })
      .then(({ data }) => data)
      .catch(error=>{

      })
    ])
    return ;
}
export const getBrandList = async()=>{
  const[datas] =await Promise.all([
      axios.get(`${process.env.API_URL}/brand/AllBrandList`)
      .then(({ data }) => data.data)
      .catch(error=>{

      })
    ])
    return datas;
}

export const sortSettlementData = (data ,types,tof) =>{
  const repair_type = types
  let sorteddata=``;
  let repair1_name,repair2_name,repair3_name;
  let result =[];
  if(tof){
    repair_type.map((el,i)=>{
        if(data.repair1_type_id === el.value){
            repair1_name = el.text;
            sorteddata +=repair1_name+`(${data.repair1_count})` 
            result[0]= (<div key={i} style={{width:"100%",display :"flex",justifyContent:"center",alignItems:"center"}}>{repair1_name+`(${data.repair1_count})`}</div>) 
        }
        if(data.repair2_type_id === el.value){
            repair2_name = el.text;
            sorteddata +=`\n`+repair2_name+`(${data.repair2_count})` 
            result[1]= (<div key={i} style={{width:"100%",display :"flex",justifyContent:"center",alignItems:"center"}}>{repair2_name+`(${data.repair2_count})`}</div>) 
        }
        if(data.repair3_type_id === el.value){
            repair3_name = el.text;
            sorteddata +=`\n`+repair3_name+`(${data.repair3_count})` 
            result[2]= (<div key={i} style={{width:"100%",display :"flex",justifyContent:"center",alignItems:"center"}}>{repair3_name+`(${data.repair3_count})`}</div>) 
        }
      })
    return(result)
  }else{
    repair_type.map((el)=>{

      if(data.repair1_type_id === el.value){
          repair1_name = el.text;
          sorteddata +=repair1_name+`(${data.repair1_count})` 
          //console.log(sorteddata)
          //result[0] = repair1_name+`(${data.repair1_count})` 
      }
      if(data.repair2_type_id === el.value){
          repair2_name = el.text;
          sorteddata +=`\n`+repair2_name+`(${data.repair2_count})` 
          //result[1] = repair2_name+`(${data.repair2_count})` 
      }
      if(data.repair3_type_id === el.value){
          repair3_name = el.text;
          sorteddata +=`\n`+repair3_name+`(${data.repair3_count})` 
          //result[2] = repair3_name+`(${data.repair3_count})` 
      }
    })
    //console.log(sorteddata)
    return(sorteddata)
  }
  
}

