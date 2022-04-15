import ip from '../serverIp/Ip';

const AutoSms= async({storeId,receiptId})=>{
    const body = { 
        "storeId":storeId,
        "receiptId":receiptId

        }

        console.log(body)

        

        try {
        const response = await fetch(ip+'/api/sms/storeAutoSms',{method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(body)
        });
        const json = await response.json();
        console.log(json)
           
        } catch (error) {
            console.error(error);
        } finally {

        }
    
}
export default AutoSms