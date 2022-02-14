const checkDisable=(userLevel)=>{
    if(userLevel == 3){
        return false
    }else if(userLevel == 1){
        return true
    }else if(userLevel == 0){
        return true
    }else if(userLevel == 5){
        return true
    }
}
export default checkDisable;