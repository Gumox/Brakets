import React from "react";
import _ from "lodash";

const getNextStoreCode=(stores)=>{
    const codeList =[];
    stores.map((item)=>{
        codeList.push(item.store_code)
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
    let nextNumber = "0"
    if(lastNumber >= 0){
        nextNumber = String(lastNumber+1)
    }

    if(nextNumber.length === 1){
        return "0000"+nextNumber
    }else if(nextNumber.length === 2){
        return "000"+nextNumber
    }else if(nextNumber.length === 3){
        return "00"+nextNumber
    }else if(nextNumber.length === 4){
        return "0"+nextNumber
    }else if(nextNumber.length === 5){
        return nextNumber
    }else if(nextNumber.length === 0){
        return "00000"
    }else {
        return "over store"
    }
}
export default getNextStoreCode