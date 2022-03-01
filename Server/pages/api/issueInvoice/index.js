import { result } from "lodash";
import excuteQuery from "../db"

async function getIssuedInvoice(receipt_code) {
    const result = await excuteQuery({
        query: 
                `
                UPDATE
                    receipt
                SET
                    issued = 1
                WHERE
                    receipt_code = ?
                
                `,
        values:[receipt_code],
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
        
        const {
            receipt_code,
        } = req.query;
        

    try {
      const result = await getIssuedInvoice(receipt_code);
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