const remakeCallNumber=(value)=>{
    let numberString = String(value).replace(/-/g,"")
    let fst="",scd = "",thr="";
    
    if(numberString.length >2){
        let numbers
        if(numberString.slice(0,2)=="02"){
            fst = numberString.slice(0,2)
            numbers= numberString.slice(2,)
        }else{
            fst = numberString.slice(0,3)
            numbers= numberString.slice(3,)
        }
        if(numbers.length == 3){
            scd ="-" + numbers.slice(0,3)
        }else if(numbers.length == 4){
            scd ="-" + numbers.slice(0,4)
        }else if(numbers.length > 5){
            scd ="-" + numbers.slice(0,3)
            thr ="-" + numbers.slice(3,)
        }else{
            scd =numbers
        }
        

        if(numbers.length == 7){
            scd ="-" + numbers.slice(0,3)
            thr ="-" + numbers.slice(3,)

        }else if(numbers.length > 7){
            scd ="-" + numbers.slice(0,4)
            thr ="-" + numbers.slice(4,)
        }
        if(numberString.length > 11){
            fst = numberString.slice(0,4)
            scd ="-" + numberString.slice(4,8)
            thr ="-" + numberString.slice(8,)
        }
        return(fst+scd+thr)
    }else{
        return( value)
    }

    
}
export default remakeCallNumber