import excuteQuery from "../db";

async function getBrand(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT * FROM brand  JOIN headquarter ON headquarter.headquarter_id = brand.headquarter_id
           WHERE brand.headquarter_id=?;
            `,
    values:[headquarterId]
  });

  return result;
}

const AllBrandList = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/brand/inHeadquarter");
    const {headquarterId} = req.query;
    console.log( req.query)
    try {
      const brand = await getBrand(headquarterId);
      //console.log(brand)
      if (brand.error) throw new Error(brand.error);

      res.status(200).json({ data: brand });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default AllBrandList;
