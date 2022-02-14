import excuteQuery from "../../../db";

async function deleltReceipt(values) {
    const result = await excuteQuery({
        query: `DELETE FROM return_unregistered WHERE return_unregistered.return_id = ? `,
        values,
      });
    
      return result;
}

const deleteTarget = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/RepairShop/unregistered/registReturn/deleteRegist");
    const {
        id,
    } = req.query;
    try {
        console.log(id)
      const result = await deleltReceipt(id);
      if (result.error) throw new Error(result.error);

      res.status(200).json({ msg: true });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default deleteTarget;
