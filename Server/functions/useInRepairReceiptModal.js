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
  

export const setSelectList = (selectItems,text) => {
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
export const getRepairType= async()=>{
    const [data] = await Promise.all([
        axios
        .get(`${process.env.API_URL}/type/repair`,{
        params: { headquarterId: 2},})
        .then(({ data }) => data)
        .catch(error=>{

        })
    ]);
    return(data.data);
}