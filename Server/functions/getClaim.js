import axios from "axios"

export const getClaim =async(headquarterId)=>{
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/claim?headquarterId=${headquarterId}&state=1`)
        .then(({ data }) => data.data)
        .catch(error=>{

        })
      ])
      return datas;
}
export const getDiscount =async(headquarterId)=>{
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/discount?headquarterId=${headquarterId}&state=1`)
        .then(({ data }) => data.data)
        .catch(error=>{

        })
      ])
      return datas;
}