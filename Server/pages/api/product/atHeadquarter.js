import excuteQuery from "../db";

async function getProduct(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT * FROM product  
            JOIN season_type ON product.season_id = season_type.season_id
            JOIN style_type ON product.style_id = style_type.style_id
            JOIN brand ON product.brand_id = brand.brand_id
            Left JOIN product_category ON product.pcategory_id  = product_category.pcategory_id 
            WHERE brand.headquarter_id=?;
            `,
    values:[headquarterId]
  });

  return result;
}

const ProductList = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/product/inHeadquarter");
    const {headquarterId} = req.query;
    console.log( req.query)
    try {
      const product = await getProduct(headquarterId);
      if (product.error) throw new Error(product.error);

      res.status(200).json({ data: product });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default ProductList;
