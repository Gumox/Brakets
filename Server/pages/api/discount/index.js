import excuteQuery from "../db";

async function getDiscount(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT discount_id AS value, discount_name AS text,discount_value,headquarter_id
              FROM discount_type WHERE headquarter_id=?`,
    values: [headquarterId],
  });

  return result;
}

const discount = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/discount");
    try {
      const { headquarterId } = req.query;
      const discount = await getDiscount(headquarterId);
      if (discount.error) throw new Error(discount.error);

      res.status(200).json({ data: discount });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default discount;
