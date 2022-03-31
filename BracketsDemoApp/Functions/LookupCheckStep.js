
const LookupCheckStep =(data)=>{    
    let step;
    
    //console.log(data.category)    // 1
    //console.log(data.receipt_type)// 2
    //console.log(data.image)       // 3
    //console.log(data.receipt_code)// 4 
    //console.log(data.step)        // 5
    if(data.signature){
        step = 0;
        if(data.category){
            step = 1;
            if(data.receipt_type){
                step = 2;
                if(data.image){
                    step = 3;
                    if(data.receipt_code){
                        step = 4;
                        if(data.step > 0){
                            step = 5;
                        }
                    }
                }
            }
        }
    }
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log("data.category :",data.category  )
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    if(data.category == 3){
        step = 1;
        if(data.receipt_type){
            step = 2;
            if(data.image){
                step = 3;
                if(data.receipt_code){
                    step = 4;
                    if(data.step > 0){
                        step = 5;
                    }
                }
            }
        }
    }
    return step
}
export default LookupCheckStep
