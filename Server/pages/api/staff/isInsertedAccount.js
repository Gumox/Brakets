import excuteQuery from "../db";

async function staffsAccount(account) {
  const result = await excuteQuery({
    query: `SELECT *
              FROM staff 
              WHERE account = ?`,
    values:[account]
  });
  return result;
}

const staff = async (req, res) => {
  if (req.method == "GET") {
    const { account } = req.query;
    try {
      const result = await staffsAccount(account);
      if (result.error) throw new Error(result.error);

      console.log(result)

      res.status(200).json({data:result});
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default staff;
