import axios from "axios";
const bracketsAdminSelect =async(selectCompany)=>{
    const headquarterId = selectCompany
    const [brands, repairShops, producers, faults, analysis, results, repairs,infos] =
      await Promise.all([
        axios
          .get(`${process.env.API_URL}/brand`, { params: { headquarterId:headquarterId } })
          .then(({ data }) => data), // 브랜드
        axios
          .get(`${process.env.API_URL}/store/2`, {
            params: { brandId: headquarterId },
          })
          .then(({ data }) => data), // 수선처
        axios.get(`${process.env.API_URL}/store/3`).then(({ data }) => data), // 생산업체
        axios
          .get(`${process.env.API_URL}/faultDivision`, {
            params: {hq_id: headquarterId,state:1}
          })
          .then(({ data }) => data), // 과실구분
        axios
          .get(`${process.env.API_URL}/analysisType`, {
            params: {hq_id: headquarterId,state:1}
          })
          .then(
            ({ data }) => data), // 내용분석
        axios
          .get(`${process.env.API_URL}/judgmentResult`, {
            params: {hq_id: headquarterId}
          })
          .then(({ data }) => data), // 판정결과

          // TODO: 수선내용 api
        axios
          .get(`${process.env.API_URL}/type/repair`, {
            params: { headquarterId },
          })
          .then(({ data }) => data), // 수선내용
        axios
          .get(`${process.env.API_URL}/headquarter?headquarterId=${headquarterId}`,)
          .then(({ data }) => data), 
      ]);
      return {
        
        options: {
            brandList: brands ? brands.data : [],
            storeList: [], // 브랜드에 따라서 달라짐
            productCategoryList: [], // 브랜드에 따라서 달라짐
            repairList: repairShops ? repairShops.data : [],
            producerList: producers ? producers.data : [],
            faultType: faults ? faults.body: [],
            analysisType: analysis ? analysis.body: [],
            resultType: results ? results.body: [],
            repairType: repairs ? repairs.data: [],
            seasonList: [],
            infos: infos ? infos.body : []
        },
        
      }
}
export default bracketsAdminSelect