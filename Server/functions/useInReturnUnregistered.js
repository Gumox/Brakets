import axios from 'axios';
import formatDate from './formatDate';
export const getBrandList = async()=>{
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/brand/AllBrandList`)
        .then(({ data }) => data.data),
      ])
      return datas;
}
export const getRepairShopList = async()=>{
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/store/getAllRepairShop`)
        .then(({ data }) => data.data),
      ])
      return datas;
}
export const getTargetInfo = async(code,shop,shopName)=>{
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/RepairShop/unregistered/getTargetInfo?code=${code}`)
        .then(({ data }) => data.data),
      ])
      if(datas.length>0){
        datas[0].shop_id =shop
        datas[0].level = 1
        datas[0].shop_name = shopName
      }
      console.log(datas.length)
      console.log(datas[0])
      return datas;
}
export const insertData = async(list) =>{
  const[datas] =await Promise.all([
    axios.post(`${process.env.API_URL}/RepairShop/unregistered/registReturn`,{
      body: list,
    })
    .then(({ data }) => data),
  ])
  return datas;
}
export const getReturnList = async(id,shopName)=>{
  let[datas] =await Promise.all([
      axios.get(`${process.env.API_URL}/RepairShop/unregistered?shop_id=${id}`)
      .then(({ data }) => data.data),
    ])
    if(datas.length>0){
      datas.forEach((obj,index) => {
        let date = obj.return_date
        console.log(datas.length)
        datas[index].return_date = formatDate(new Date(date))
        datas[index].level = 0
        datas[index].shop_name = shopName
      });
    }
    return datas;
}

export const deleteRegist = async(id)=>{
  let[datas] =await Promise.all([
      axios.post(`${process.env.API_URL}/RepairShop/unregistered/registReturn/deleteRegist?id=${id}`)
      .then(({ data }) => data.data),
    ])
    return datas;
}
