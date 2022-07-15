import COLOR from "../constants/color";
import axios from "axios";
export const getSelectList =async (api,hq_id) => {
    const [data] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/`+api,{
          params: { hq_id:hq_id},})
        .then(({ data }) => data)
        .catch(error=>{

        })
    ]);
    return(data.body);
  }
  

export const setSelectList = (selectItems) => {
    let type = "text";
    const code = "value";
    let resultItems =[];
    if(selectItems !== undefined){
      selectItems.map((item,index) => {
        let resultItem;
        const key = index;                    
        if(item.level == 1){
            resultItem =(
              <option value={item[code]} key={key}>
              {item[type]}
              </option>
            )
        }else if(item.level == 0){
            resultItem =(
              <option disabled value={item[code]} key={key} style={{backgroundColor:`${COLOR.LIGHT_GRAY}`}}>
              {item[type]}
              </option>
            )
        }
        resultItems[index] = (resultItem)
      })
    }
    return(resultItems)
  }
export const getRepairType= async(hq_id,brand,shop)=>{
    const [data] = await Promise.all([
        axios
        .get(`${process.env.API_URL}/type/repair`,{
        params: { headquarterId: hq_id ,brandId:brand,storeId:shop},})
        .then(({ data }) => data)
        .catch(error=>{

        })
    ]);
    return(data.data);
}
export const getReceiptRepairInfo = async(receipt_id)=>{
  const[datas] =await Promise.all([
      axios.get(`${process.env.API_URL}/RepairShop/getReceiptList/getReceiptRepairInfo?receipt_id=${receipt_id}`
      )
      .then(({ data }) => data)
      .catch(error=>{

      })
    ])
    return datas;
}

export const setSelectType = (selectItems) => {
  let type = "text";
  const code = "value";

  let resultItems =[];
  if(selectItems !== undefined){
    selectItems.map((item,index) => {
      let resultItem;
      const key = index;
      resultItem =(
        <option value={item[code]} key={key}>
          {item[type]}
        </option>
      )   
      resultItems[index] = (resultItem)
    })
  }
  return(resultItems)
}

export const checkHaveRepairDetail =(el,shop)=>{
  if(el.repair1_store_id === shop){
    if(el.repair1_result_id != null) {return COLOR.MOCCA}
  }
  else if(el.repair2_store_id === shop){
    if(el.repair2_result_id != null) {return COLOR.MOCCA}
  }
  else if(el.repair3_store_id === shop){
    if(el.repair3_result_id != null) {return COLOR.MOCCA}
  }
}
export const checkHaveMfrDetail =(el)=>{
  if(el.mfr_register_date) {return "rgb(156,203,171)"}
}

export const getUnitPriceList = async(brandId) => {
  const[datas] =await Promise.all([
    axios.get(`${process.env.API_URL}/unitPriceList?brandId=${brandId}`
    )
    .then(({ data }) => data.data)
    .catch(error=>{

    })
  ])
  return datas;
}