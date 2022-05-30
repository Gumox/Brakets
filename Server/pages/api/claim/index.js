import excuteQuery from "../db";

async function getClaim(headquarterId,query) {
  const result = await excuteQuery({
    query: `SELECT 
                claim_id AS value,
                claim_text AS text,
                claim_type,
                claim_value,
                state,
                headquarter_id
              FROM claim WHERE headquarter_id=? ${query}`,
    values: [headquarterId],
  });

  return result;
}

const claim = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/claim");
    try {
      const { headquarterId ,state } = req.query;
      let query =''
      if(state){
        query='AND state = 1'
      }
      const claim = await getClaim(headquarterId,query);
      if (claim.error) throw new Error(claim.error);

      res.status(200).json({ data: claim });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default claim;
