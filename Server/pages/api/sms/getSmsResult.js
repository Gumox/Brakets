
import excuteQuery from "../db";

async function getSmsResult(query,start,end) {
  const result = await excuteQuery({
    query: `SELECT *
            FROM sms_result
            LEFT JOIN staff ON staff.staff_id = sms_result.sender
            ${query}
           `,
    values: [start,end],
  });

  return result;
}

const getResult = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/sms/getSmsResult");
    console.log(req.body)
    const start =' 00:00:00';
    const end =' 23:59:59';
        
    try {
      const { send_date ,month ,year} = req.body.body;
      let _start;
      let _end; 
      let query;
      console.log(   send_date ,month ,year)
      if(month != null){
        _start = year+"-"+month+"-"+"01"
        _end = year+"-"+(Number(month)+1)+"-"+"01"
        query =  `WHERE send_date >= ? AND send_date < ?`
      }else{  
        _start = send_date+start
        _end = send_date+end
        query =  `WHERE send_date >= ? AND send_date <= ?`
      }
      if(send_date){
        const smsMessage = await getSmsResult(query,_start,_end);
        if (smsMessage.error) throw new Error(smsMessage.error);
        res.status(200).send(smsMessage);
      }else{
        res.status(203).json({err:"send_date is null"});
      }
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default getResult;
