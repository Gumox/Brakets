import excuteQuery from "../db";

async function staffs(phone) {
  const result = await excuteQuery({
    query: `SELECT *
              FROM staff 
              WHERE phone = ?`,
    values:[phone]
  });

  return result;
}

const staff = async (req, res) => {
  if (req.method == "GET") {
    const { phone } = req.query;
    try {
      const result = await staffs(phone);
      if (result.error) throw new Error(result.error);

      res.status(200).json({data:result});
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default staff;
