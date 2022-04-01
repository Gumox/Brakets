import React from "react";
import ip from "../serverIp/Ip";

const DeleteReceipt = async(id)=>{
    const bodyData = {
        "receiptId": id,
    }
    try {
    const response = await fetch(ip+'/api/receipt/deleteReceipt',{method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    body: JSON.stringify(bodyData)
    });
    const json = await response.json();
    
        
    } catch (error) {
    console.error(error);
    } 
}
export default DeleteReceipt