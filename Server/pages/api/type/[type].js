import excuteQuery from "../db";

async function getType(type) {
  const result = await excuteQuery({
    query: `SELECT ${type}_id AS value, ${type}_name AS text
              FROM ${type}_type `,
  });

  return result;
}

const TYPE_CATEGORY = ["analysis", "fault", "result"];
const store = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/type/{type}");
    console.log("req.query");
    console.log(req.query);
    const { type } = req.query;
    try {
      if (!TYPE_CATEGORY.includes(type))
        return res.status(204).send();

      const types = await getType(type);
      if (types.error) throw new Error(receipt.error);

      res.status(200).json({ data: types });
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err);
    }
  }
};

export default store;
