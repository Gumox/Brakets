import excuteQuery from "../db";

async function getBrand() {
  const result = await excuteQuery({
    query: `SELECT * FROM brand `
  });

  return result;
}

const AllBrandList = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/brand/AllBrandList");
    try {
      const brand = await getBrand();
      if (brand.error) throw new Error(brand.error);

      res.status(200).json({ data: brand });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default AllBrandList;
