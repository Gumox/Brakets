import excuteQuery from "../db"

async function addFaultDivision(claimValue, claimText, claimType, headquarterId) {
    const result = await excuteQuery({
        query: `INSERT INTO 
                claim(
                    claim_value,
                    claim_text,
                    claim_type,
                    headquarter_id
                    ) VALUES (?,?,?,?)`,
        values:[claimValue, claimText, claimType, headquarterId],
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.body);
        
        const { claimValue, claimText, claimType, headquarterId } = req.body;

    try {
      const result = await addFaultDivision(claimValue, claimText, claimType, headquarterId);

      if (result.error) throw new Error(result.error);
        res.status(200).json({ body: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;