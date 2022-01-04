import excuteQuery from "../db";

async function registerStaffs(staffs) {
  for (let staff of staffs) {
    const staffInsertResult = await excuteQuery({
      query:
        "INSERT INTO `staff`(`email`, `name`, `phone`, `level`) VALUES (?,?,?,?)",
      values: [staff.email, staff.name, staff.phone, staff.level],
    });

    const staffId = staffInsertResult.insertId;

    const storeInsertResult = await excuteQuery({
      query: "INSERT INTO `staff_store`(`staff_id`, `store_id`) VALUES (?, ?)",
      values: [staffId, staff.store],
    });

    if (storeInsertResult.error) {
      return storeInsertResult;
    }
  }
}

// staff = { email, name, phone, level, store };
const staffRegister = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    const { data } = req.body;
    try {
      console.log(data);
      const result = registerStaffs(data);
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

export default staffRegister;
