import React from "react";
import _ from "lodash";

const getNextStaffCode=(staffs)=>{
    const codeList =[];
    staffs.map((item)=>{
        if(item.staff_code){
            codeList.push(item.staff_code)
        }
    })
    
    const dist = _.uniq(codeList)
    const filt =_.filter(dist,function(o){
        return o.length > 0
    })
    const numbering =[];
    filt.map((el)=>{
        const xplit =String(el).split(".")
        const xplitLength =xplit.length
        numbering.push(Number(xplit[xplitLength-1]))
    })
    const lastNumber = _.sortBy(numbering).reverse()[0]
    const nextNumber = String(lastNumber+1)
    if(nextNumber.length === 1){
        return "000"+nextNumber
    }else if(nextNumber.length === 2){
        return "00"+nextNumber
    }else if(nextNumber.length === 3){
        return "0"+nextNumber
    }else if(nextNumber.length === 4){
        return nextNumber
    }else {
        return "over staff"
    }
}
export default getNextStaffCode