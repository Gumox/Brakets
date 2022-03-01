import { result } from "lodash";
import excuteQuery from "../db"

'2011-12-18 13:17:17'

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

const controller = async (req, res) => {
    if (req.method === "PUT") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
        
        const {
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
            edited_date
        } = req.query;
        

    try {
      const result = await returnInvoiceLog(receipt_id, receipt_code, release_date, status, season, partcode, color, size, qty, amount, created, created_date, edited, edited_date);
      console.log(result);
      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("result");
        res.status(200).json({ data: result });
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