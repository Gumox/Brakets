
import excuteQuery from "../db"
async function getInvoice(receipt_code){
    const result = await excuteQuery({
      query: 
              `SELECT * FROM invoice_paid_repair WHERE receipt_id =?`,
      values:[receipt_code],
    });
    return result
  }
async function getInvoiceList(List) {
    let results=[]
    for (let data of List) {
      const result = await getInvoice(data.receipt_id)
      if(result !== {}){
        results.push(result)
      }
    }
    return results;
  }

  const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.body);
        
        const {
            list
        } = req.body;
        // console.log(list)
    try {
      const invoiceList = await getInvoiceList(list)
      if (invoiceList.error) throw new Error(invoiceList.error); 
      if (invoiceList.length ) {
          console.log(invoiceList.length)
        res.status(200).json({ data: invoiceList });
      } else {
        console.log("No invoiceList");
        res.status(204).json({ message: false });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;