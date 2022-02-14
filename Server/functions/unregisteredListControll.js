const unregisteredListControll = (list,company,repair,brand,startDate,endDate)=>{
    let target = list
    let result =[]
    if(company !== null && company!="전체"){
        target.map((item)=>{
            if(item.headquarter_id == company){
                result.push(item)
            }
        })
        target = result;
        result =[];
    }
    if(repair !== null && repair.length >0){
        
        target.map((item)=>{
            if(item.receiver_id == repair){
                result.push(item)
            }
        })
        target = result;
        result =[];
    }
    if(brand !== null && brand.length >0){
        
        target.map((item)=>{
            if(item.brand_id == brand){
                result.push(item)
            }
        })
        target = result;
        result =[];
    }
    if(startDate !== null && startDate != 'Invalid Date'){
        
        target.map((item)=>{
            if(item.return_date >= startDate){
                result.push(item)
            }
        })
        target = result;
        result =[];
    }
    if(endDate !== null && endDate != 'Invalid Date'){
        
        target.map((item)=>{
            if(item.return_date <= endDate){
                result.push(item)
            }
        })
        target = result;
        result =[];
    }
    return target

} 
export default unregisteredListControll;