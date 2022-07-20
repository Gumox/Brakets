import remakeCallNumber from "../../functions/remakeCallNumber";

export const onChangePhoneNumber = (value)=>{
    let result =String(value).replace(/[^0-9]/g, '')
    return result
}
export const onFocusPhoneNumber = (value) =>{
    let result = String(value).replace(/-/,"").replace(/-/,"")
    return result
}
export const onBlurPhoneNumber = (value) =>{
    let result = null
    if(value){
        result = remakeCallNumber(value)
    }
    return result
}