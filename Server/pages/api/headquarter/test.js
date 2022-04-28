import excuteQuery from "../db"

async function getHeadquarterStore(
    headquarter_id
) {
  const resultStore = await excuteQuery({
    query: `SELECT * FROM store WHERE brand_id =? `,
    values:[headquarter_id]
  });
  
    return resultStore[0];
}
const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.body");
        console.log(req.body);
        const{
            headquarter_id
        } =req.body
        
    try {
      

      const resultStore = await getHeadquarterStore(headquarter_id);
        res.status(200).json({ body: resultStore.store_id });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;