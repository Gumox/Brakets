import excuteQuery from "../db";

async function customerInfoChange(customerName,customerPhone,customerId) {
    const result = await excuteQuery({
        query: `UPDATE customer SET name = ?, phone = ? WHERE customer_id  = ?`,
        
        values:[customerName,customerPhone,customerId]
  });

  return result;
}

const CustomerModify = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/customer/modify");
    const {customerName,customerPhone,customerId} = req.query;
    console.log( req.query)
    
    try {
      const customer = await customerInfoChange(customerName,customerPhone,customerId);
      //console.log(customer)
      if (customer.error) throw new Error(customer.error);

      res.status(200).json({ data: customer });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default CustomerModify;
