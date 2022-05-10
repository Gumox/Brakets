import excuteQuery from "../db";

async function addStyle( styleNo, brandId) {
  const result = await excuteQuery({
    query: `INSERT INTO 
                style_type(
                    style_code,
                    brand_id
                ) VALUES (?,?)`,
    values: [ styleNo, brandId],
  });
  return result;
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/product/addStyle");
    console.log()
    console.log(req.body)
    console.log()
    console.log("*********************")
    try {
      const {  
            styleNo,
            brandId
        } = req.body;
      
        const style = await addStyle( styleNo, brandId) ;

      if (style.error) throw new Error(style.error);

      res.status(200).json({ data: style });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
