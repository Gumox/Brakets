import ip from '../serverIp/Ip';

const AutoSms= async(smsBody)=>{
    const body = smsBody


        

        try {
        const response = await fetch(ip+'/api/sms/storeAutoSms',{method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(body)
        });
        const json = await response.json();
           
        } catch (error) {
            console.error(error);
        } finally {

        }
    
}
export default AutoSms