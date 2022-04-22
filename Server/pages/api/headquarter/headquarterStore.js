import excuteQuery from "../db"

async function getHeadquarter() {
    const result = await excuteQuery({
        query: `SELECT  headquarter_id  AS value, 
                        headquarter_name_kr AS text,
                        headquarter_name,
                        store_id
                FROM  headquarter
                JOIN store ON store.brand_id =headquarter.headquarter_id
                WHERE store_type = 0
                `,
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "GET") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
        
    try {
      const result = await getHeadquarter();
      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("result");
        res.status(200).json({ body: result });
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