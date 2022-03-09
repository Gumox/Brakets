import ip from "../serverIp/Ip";

import { PathToFlie } from '../functions/PathToFlie';
import store from "../store/store";
export const postUpdateAfterImage = async (receipt_id,sendType,store_id,image1,image2,image3,image4) => {
    var formdata = new FormData();

    formdata.append("receipt", receipt_id )//받는곳
    formdata.append("store", store_id) //수선처

    formdata.append("image1", PathToFlie(image1));//수선사진들
    formdata.append("image2", PathToFlie(image2));
    formdata.append("image3", PathToFlie(image3));
    formdata.append("image4", PathToFlie(image4));
    console.log(formdata)

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
            }
            else{
                store.dispatch({type:"IMAGE_RESET", reset:null})
            }
        }
       
    } catch (error) {
        console.error(error);
    } finally {
    }
    
}

export const postSendRepairInfo = async (place,date,sendType,sendPay,repair_detail_id) => {
    const bodyData={
        store:place,
        complete_date: date,
        shipment_type: sendType,
        shipment_price: sendPay,
        repair_detail_id:repair_detail_id
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
        
       
    } catch (error) {
        console.error(error);
    } finally {
    }
}