import ip from "../serverIp/Ip";
import axios from "axios";
export const CheckCode =async(_code) =>{
    const code = _code;
    const { data } = await axios.get( ip+`/api/codeCheck?code=${code}`);
    return (data.message)
}
export const CheckJudgmentResult =async(judgment) =>{
    const code = judgment;
    const { data } = await axios.get( ip+`/api/judgmentResult`);
    const list = data.body;
    if(judgment !==0){
        let result
        list.map((item)=>{
            if(item.value == judgment){
                result = item.text
            }
        })
        return result
    }else{
        return null
    }
}
export const CheckAnalysisType =async(analysis) =>{
    const code = analysis;
    const { data } = await axios.get( ip+`/api/analysisType`);
    const list = data.body;
    if(analysis !==0){
        let result
        list.map((item)=>{
            if(item.value == analysis){
                result = item.text
            }
        })
        return result
    }else{
        return null
    }
}
export const CheckFaultDivision =async(fault) =>{
    const code = fault;
    const { data } = await axios.get( ip+`/api/faultDivision`);
    const list = data.body;
    if(fault !==0){
        let result
        list.map((item)=>{
            if(item.value == fault){
                result = item.text
            }
        })
        return result
    }else{
        return null
    }
}