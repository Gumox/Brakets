import excuteQuery from "../db";

async function getProductCategory(brandId) {
  const result = await excuteQuery({
    query: `SELECT pcategory_id AS value, category_name AS text
              FROM product_category
              WHERE brand_id = ?`,
    values: [brandId],
  });

  return result;
}

const productCategory = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/type/product-category");
    console.log("req.query");
    console.log(req.query);
    const { brandId } = req.query;
    try {
      const category = await getProductCategory(brandId);
      if (category.error) throw new Error(category.error);

      res.status(200).json({ data: category });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message});
    }
  }
};

export default productCategory;
