import _ from "lodash"
const checkDuplicate =(list,name,myName)=>{
    const target = String(name).replace(/ /g,"")
    let result = false;
    
    for(const index in list){
        const item = list[0];
        const itemTarget =String(item.store_name).replace(/ /g,"")
        
        if(myName && itemTarget.toUpperCase() === String(myName).replace(/ /g,"").toUpperCase()){
            break;
        }
        else if(itemTarget.toUpperCase() === target.toUpperCase()){
            result = true;
            break;
        }
    }
    console.log(result)
    return(result)
}
export default checkDuplicate