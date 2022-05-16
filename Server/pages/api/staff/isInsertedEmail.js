import excuteQuery from "../db";

async function staffs(staffEmail) {
  const result = await excuteQuery({
    query: `SELECT *
              FROM staff 
              WHERE staff_email = ?`,
    values:[staffEmail]
  });

  return result;
}

const staff = async (req, res) => {
  if (req.method == "GET") {
    const { staffEmail } = req.query;
    try {
      const result =await staffs(staffEmail);
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
