import ip from "../serverIp/Ip";

import { PathToFlie } from '../functions/PathToFlie';
import store from "../store/store";
export const postUpdateAfterImage = async (receipt_id,sendType,store_id,image1,image2,image3,image4,needAfter) => {
    let formdata = new FormData();

    formdata.append("receipt", receipt_id )//받는곳
    formdata.append("store", store_id) //수선처

    formdata.append("image1", PathToFlie(image1));//수선사진들
    formdata.append("image2", PathToFlie(image2));
    formdata.append("image3", PathToFlie(image3));
    formdata.append("image4", PathToFlie(image4));

    const needAfterLabels =[]
    if(needAfter.length>0){
        needAfter.map((item)=>{
            let label = "needAfter"+item.num;
            formdata.append(label, PathToFlie(item.photo));
            needAfterLabels.push(label)

        })
        formdata.append("needAfterLabels",JSON.stringify(needAfterLabels))
    }else{
        formdata.append("needAfterLabels",null)
    }
    console.log(formdata["_parts"]) 

    try {
        const response = await fetch(ip+'/api/RepairShop/sendRepairInfo/updateAfterImage',{method: 'PUT',
        headers: {
            'Accept': '',
            'Content-Type': 'multipart/form-data'
            },
        body: formdata
        });
        const json = await response.json();
        console.log(json.msg)
        if(json.msg == 'images saved'){
            if(sendType === 1){
                store.dispatch({type:"IMAGE_RESET", reset:null})
                store.dispatch({type:'NEED_PHOTOS_CLOSE_SET',needClosePhotos:[]}); 
            }
            else{
                store.dispatch({type:"IMAGE_RESET", reset:null})
                store.dispatch({type:'NEED_PHOTOS_CLOSE_SET',needClosePhotos:[]}); 
            }
        }
       
    } catch (error) {
        console.error(error);
    }
}

export const postSendRepairInfo = async (place,date,sendType,sendPay,repair_detail_id,receipt_id,step,navigation) => {

    console.log("-------------------------------------------------------")
    
    console.log(place,date,sendType,sendPay,repair_detail_id,receipt_id)
    const bodyData={
        store:place,
        complete_date: date,
        shipment_type: sendType,
        shipment_price: sendPay,
        repair_detail_id:repair_detail_id,
        receipt_id: receipt_id, //받는곳
        step:step
    }
    try {
        const response = await fetch(ip+'/api/RepairShop/sendRepairInfo',{method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(bodyData)
        });
        const json = await response.json();
        console.log(json);
        navigation.popToTop();
       
    } catch (error) {
        console.error(error);
    } finally {
    }
}