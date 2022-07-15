import axios from "axios";

export const getData = async(params,level)=>{
  let paramsData

    paramsData =
    {
      hq_id: params.hq_id,
      shop_id: params.shop_id,
      brand : params.brand,
      code : params.code,
      startDate : params.startDate,
      endDate : params.endDate,
      dateOption : params.dateOption 

    }
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/RepairShop/getInquiryInfo`, {
            params: paramsData,
          })
        .then(({ data }) => data)
        .catch(error=>{
            
        })
      ])
      return datas;
}