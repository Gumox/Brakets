import excuteQuery from "../db";

async function deleteReceipt(receiptId) {
  return excuteQuery({
    query: `DELETE FROM receipt WHERE receipt.receipt_id = ?`,
    values: [receiptId],
  });
}

const receipt = async (req, res) => {
  if (req.method === "POST") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.body");
    console.log(req.body);
    const { receiptId } = req.body;
    console.log(req.body)
    try {
      const result = await deleteReceipt(receiptId);
      if (result.error) throw new Error(result.error);
      console.log(result);
      res.status(200).json({ message: "delete" });

    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default receipt;