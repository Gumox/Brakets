import React from 'react';
import axios  from 'axios';
import ip from '../serverIp/Ip';

const AutoSms= async({headquarterId,receiver,msg})=>{
    const body = {
        "headquarterId":headquarterId,
        "receiver":receiver,
        "msg":msg

        }

        console.log(body)

        /*axios.post(ip+'api/sms/storeAutoSms', body , {
          headers: {
            'Content-Type': 'application/json'
          }})
          .then((response) => {
          // 응답 처리
              const json =  response.data;
              console.log(json);
          
          })
          .catch((error) => {
          // 예외 처리
          console.error(error);
          })*/

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