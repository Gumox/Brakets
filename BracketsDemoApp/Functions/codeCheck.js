import ip from "../serverIp/Ip";
import axios from "axios";
export const CheckCode =async(_code) =>{
    const code = _code;
    const { data } = await axios.get( ip+`api/codeCheck?${code}`);
    return data
}