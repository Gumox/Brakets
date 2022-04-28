import excuteQuery from "../db";

async function registerStaffs(staffs) {
  const result = await excuteQuery({
    query: `SELECT text
              FROM notice WHERE id=1`,
  });

  return result;
}

const staff = async (req, res) => {
  if (req.method == "POST") {
    const { staffs } = req.body;
    try {
      const result = registerStaffs(staffs);
      if (result.error) throw new Error(result.error);

      res.status(200);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default staff;

// const staff = { name, account, phone, level };
