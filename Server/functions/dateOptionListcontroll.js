const dateOptionListcontroll = (list,params)=>{
    let target = list
    let result =[]
    if(params.dateOption ==="register_date"){
        if(params.startDate !== null && params.startDate != 'Invalid Date'){
            
            target.map((item)=>{
                if(item.register_date >= params.startDate){
                    result.push(item)
                }
            })
            target = result;
            result =[];
        }
        if(params.endDate !== null && params.endDate != 'Invalid Date'){
            
            target.map((item)=>{
                if(item.register_date <= params.endDate){
                    result.push(item)
                }
            })
            target = result;
            result =[];
        }
    }else if(params.dateOption ==="send_date"){
        if(params.startDate !== null && params.startDate != 'Invalid Date'){
            
            target.map((item)=>{
                if(item.send_date >= params.startDate){
                    result.push(item)
                }
            })
            target = result;
            result =[];
        }
        if(params.endDate !== null && params.endDate != 'Invalid Date'){
            
            target.map((item)=>{
                if(item.send_date <= params.endDate){
                    result.push(item)
                }
            })
            target = result;
            result =[];
        }
    }
    return target

} 
export default dateOptionListcontroll;