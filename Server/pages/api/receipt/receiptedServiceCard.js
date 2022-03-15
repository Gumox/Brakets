import excuteQuery from "../db";

async function checkServiceCard (code){
  return excuteQuery({
    query: "SELECT * FROM receipt WHERE receipt_code=?",
    values: [code],
  });
}

const receiptedServiceCard = async (req, res) => {
  if (req.method === "GET") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.query");
    console.log(req.query);
    const { code } = req.query;
    console.log(req.query)
    try {
      const result = await checkServiceCard(code);
      if (result.error) throw new Error(result.error);
      
      if(result.length>0){
        res.status(200).json({ message: true });  
      }else{
        res.status(200).json({ message: false });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default receiptedServiceCard;