import styled from "styled-components";
import excuteQuery from "../../db";

async function getImageList(code) {
    const result = await excuteQuery({
      query: `SELECT num, type, before_image, before_store_id, after_image, after_store_id FROM receipt_image
              LEFT JOIN receipt ON receipt_image.receipt_id = receipt.receipt_id
              WHERE receipt.receipt_code = ?`,
      values: [code],
    });
    return result;
  }

async function searchServiceCard(query, values) {
  const result = await excuteQuery({
    query: `SELECT *
            FROM receipt 
            WHERE receipt.receipt_code = ?`,
    values,
  });

  return result;
}

const receipt = async (req, res) => {
    if (req.method === "GET") {
      console.log("req.headers.referer");
      console.log(req.headers.referer);
      console.log("req.query");
      console.log(req.query);
      const { code } = req.query;
      try {
        const receipt = await searchServiceCard(code);
        const imageResult = await getImageList(code);
        if (receipt.error) throw new Error(receipt.error);
        if (receipt.length == 0) return res.status(204).send();
        console.log(receipt);
        console.log(imageResult);
        res.status(200).json({ data: { ...receipt[0] }, imageList: imageResult });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
      }
    }
  };
export default receipt;
