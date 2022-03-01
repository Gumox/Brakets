import { result } from "lodash";
import excuteQuery from "../db"

"2011-12-18 13:17:17"

async function returnInvoiceLog(
    receipt_id,
    receipt_code,
    release_date,
    status,
    season,
    partcode,
    color,
    size,
    qty,
    amount,
    created,
    created_date,
    edited,
    edited_date) {
    const result = await excuteQuery({
        query: 
        "INSERT INTO" + 
        "`invoice`(`receipt_id`, `receipt_code`, `release_date`, `status`, `season`, `partcode`, `color`, `size`, `qty`, `amount`, `created`, `created_date`, `edited`, `edited_date` )" + 
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",

        values:[receipt_id, receipt_code, release_date, status, season, partcode, color, size, qty, amount, created, created_date, edited, edited_date],
      });
    
      return result;
}
async function getInvoice(receipt_code){
  const result = await excuteQuery({
    query: 
            `SELECT * FROM invoice WHERE receipt_id =?`,
    values:[receipt_code],
  });
  return result
}
async function getIssuedInvoice(receipt_code) {
  const result = await excuteQuery({
      query: 
              `
              UPDATE
                  receipt
              SET
                  issued = 1
              WHERE
              receipt_id  = ?
              
              `,
      values:[receipt_code],
    });
  
    return result;
}

async function invoice(List,user) {
  let results=[]
  for (let data of List) {
    let qty =1
    let toDay =  new Date();
    let inputDate = toDay.getFullYear()+"-"+toDay.getMonth()+"-"+toDay.getDay()+" "+toDay.getHours()+":"+toDay.getMinutes()+":"+toDay.getSeconds();
    console.log(inputDate);
    let setIssued = [];
    let inputInvoiceLog = [];
    console.log("-------------------------")
    console.log(data)
    const checkInvoice = await getInvoice(data.receipt_id)
    console.log("-----88888--")
    console.log(checkInvoice.length)
    console.log("-------------------------")
    if(checkInvoice.length > 0){
      if((checkInvoice.length) % 2 === 1){
        qty = -1;
      }
      setIssued = await getIssuedInvoice(data.receipt_id)
      inputInvoiceLog =await returnInvoiceLog(
                                                      data["receipt_id"],
                                                      data["서비스카드 번호"],
                                                      /*data[""]*/"2020-12-12 12:00:00",//임시 값 추후 변경 필요
                                                      data["매장구분"],
                                                      data["시즌"],
                                                      data["스타일"],
                                                      data["컬러"],
                                                      data["사이즈"],
                                                      qty,
                                                      "123",
                                                      checkInvoice[0].created,
                                                      checkInvoice[0].created_date,
                                                      user,
                                                      inputDate)
                                                      
      results.push(inputInvoiceLog)
    }else{
      console.log("OK")
      setIssued = await getIssuedInvoice(data.receipt_id)
      inputInvoiceLog =await returnInvoiceLog(
                                                      data["receipt_id"],
                                                      data["서비스카드 번호"],
                                                      /*data[""]*/"2020-12-12 12:00:00",//임시 값 추후 변경 필요
                                                      data["매장구분"],
                                                      data["시즌"],
                                                      data["스타일"],
                                                      data["컬러"],
                                                      data["사이즈"],
                                                      qty,
                                                      "123",
                                                      user,
                                                      inputDate,
                                                      user,
                                                      inputDate)
                                         
    }
  }
  return results;
}
async function getInvoiceList(List) {
  let results=[]
  for (let data of List) {
    const result = await getInvoice(data.receipt_id)
    if(result !== {}){
      results.push(result)
    }
  }
  console.log(results)
  return results;
}
const controller = async (req, res) => {
    if (req.method === "PUT") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.body);
        
        const {
            list,
            user
        } = req.body;
        

    try {
      //const result = await returnInvoiceLog(receipt_id, receipt_code, release_date, status, season, partcode, color, size, qty, amount, created, created_date, edited, edited_date);
      const result = await invoice(list,user)
      //console.log(result);
      if (result.error) throw new Error(result.error); 
      //console.log(result)
      if (result ) {
        const invoiceList = await getInvoiceList(list)
        console.log(invoiceList)
        res.status(200).json({ data: invoiceList });
      } else {
        console.log("No result");
        res.status(204).json({ message: "No result" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;