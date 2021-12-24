import excuteQuery from "../../db";

async function getManufacturerDetail(id) {
  const detail = await excuteQuery({
    query: `SELECT detail_id, mfr_detail_id, DATE_FORMAT(send_date, '%Y-%m-%d %H:%i:%s') AS send_date   
            FROM receipt_detail 
            WHERE receipt_id = ? AND receiver_type = 3`,
    values: [id],
  });

  if (detail.length == 0) return {};

  const sendDate = detail[0].send_date;
  const mfrId = detail[0].mfr_detail_id;
  if (!mfrId) return { send_date: sendDate };

  const result = await excuteQuery({
    query: `SELECT mfr_detail_id, 
                    DATE_FORMAT(register_date, '%Y-%m-%d %H:%i:%s') AS register_date,    
                    IF(substitute=0, "N", "Y") AS substitute,
                    message,
                    redo,
                    DATE_FORMAT(complete_date, '%Y-%m-%d %H:%i:%s') AS complete_date
            FROM mfr_detail 
            WHERE mfr_detail_id = ?`,
    values: [mfrId],
  });

  if (result.length == 0) return {};

  return { ...result[0], send_date: sendDate };
}

const receipt = async (req, res) => {
  if (req.method === "GET") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.query");
    console.log(req.query);
    const { id } = req.query;
    try {
      const mfrDetail = await getManufacturerDetail(id);
      res.status(200).json({ data: mfrDetail });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default receipt;
