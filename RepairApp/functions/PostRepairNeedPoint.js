import store from "../store/store"
import { PathToFlie } from "./PathToFlie";
import ip from "../serverIp/Ip";
export default function PostRepairNeedPoint(receipt_id,image,takeNeedPhotos){
    console.log(receipt_id,store.getState().shopId,store.getState().needPhotos)

    const postRepairNeedPoint = async () => {
        var formdata = new FormData();

        formdata.append("receipt", receipt_id);
        formdata.append("store", store.getState().shopId);
        formdata.append("image",  PathToFlie(image));
        formdata.append("image1", PathToFlie(takeNeedPhotos[0].photo));
        formdata.append("image2", PathToFlie(takeNeedPhotos[1].photo));
        formdata.append("image3", PathToFlie(takeNeedPhotos[2].photo));
        formdata.append("image4", PathToFlie(takeNeedPhotos[3].photo));
        console.log(formdata)

        try {
            const response = await fetch(ip+'/api/needRepair',{method: 'POST',
            headers: {
                'Accept': '',
                'Content-Type': 'multipart/form-data'
                },
            body: formdata
            });
            const json = await response.json();
            console.log(json)
           
        } catch (error) {
            console.error(error);
        } finally {

        }
    }
    postRepairNeedPoint();
}