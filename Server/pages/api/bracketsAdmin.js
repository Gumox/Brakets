import excuteQuery from "./db";

async function setCompany(id) {
  const result = await excuteQuery({
    query: `UPDATE staff_store SET store_id = ? WHERE staff_store.staff_store_id = 1`,
    values: [id],
  });

  return result;
}

const check = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/bracketsAdmin");
    try {
        const { companyStoreId } = req.query;
        const result = await setCompany(companyStoreId);
        if (result.error) throw new Error(check.error)
        console.log(result)
        res.status(200).json({ message : result });
        
        
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default check;