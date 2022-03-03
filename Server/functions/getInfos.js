import axios from "axios";
export const getRepairShop = async()=>{
    const[datas] =await Promise.all([
        axios.get(`${process.env.API_URL}/store/getRepairShop`)
        .then(({ data }) => data.data)
        .catch(error=>{

        })
      ])
      return datas;
}