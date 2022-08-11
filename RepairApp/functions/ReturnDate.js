const returnDate = (date)=>{
    if(date){
        let string_date = String(date).split("T")
        return(string_date[0])
    }
}
export default returnDate