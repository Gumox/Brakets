import excuteQuery from "../db";

async function getType(type, headquarterId) {
  const result = await excuteQuery({
    query: `SELECT ${type}_id AS value, ${type}_name AS text
              FROM ${type}_type WHERE headquarter_id=?`,
    values: [headquarterId],
  });

  return result;
}

const TYPE_CATEGORY = ["analysis", "fault", "result"];
const store = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/type/{type}");
    console.log("req.query");
    console.log(req.query);
    const { type, headquarterId } = req.query;
    try {
      if (!TYPE_CATEGORY.includes(type)) return res.status(204).send();

      const types = await getType(type, headquarterId);
      if (types.error) throw new Error(receipt.error);

      res.status(200).json({ data: types });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default store;
