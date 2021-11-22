import styled from "styled-components";
import excuteQuery from "../db";

async function getReceipt(query, values) {
  const result = await excuteQuery({
    query: `SELECT receipt.receipt_id AS receipt_id,
                    receipt.receipt_code AS receipt_code,
                    receipt.store_id AS store_id,
                    store.name AS store_name,
                    store.store_type AS store_type,
                    store.contact AS store_contact,
                    receipt.receipt_date AS receipt_date,
                    receipt.customer_id AS customer_id,
                    customer.phone AS customer_phone,
                    product.season AS product_season,
                    product.degree AS product_degree,
                    product.color AS product_color,
                    product.size AS product_size, 
                    receipt.receipt_type AS receipt_type
            FROM receipt 
            JOIN store ON receipt.store_id = store.store_id 
            JOIN product ON receipt.product_id = product.product_id 
            JOIN customer ON receipt.customer_id = customer.customer_id 
            WHERE true ${query}`,
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
    try {
      const {
        isStoreType,
        storeName,
        isStyleType,
        season,
        dateOption,
        dateType,
        startDate,
        endDate,
        customerName,
        customerContact,
        companyName,
      } = req.query;
      let query = "";
      let values = [];
      if (isStoreType && isStoreType !== "false" && storeName) {
        query += " AND receipt.store_id = ? ";
        values = [...values, storeName];
      }

      if (isStyleType && isStyleType !== "false") {
        if (season) {
          query += " AND product.season = ? ";
          values = [...values, season];
        }
        // TODO: DB 에 column 추가
        // if (style && style.length > 0) {
        //   query += " AND product.style = ? ";
        //   values = [...values, style]
        // }
      }
      // TODO: date 종류 추가
      // if (dateType === "all") {
      //   if (startDate) {
      //     query += ` AND DATE(receipt.${dateOption}) >= ?`;
      //     values = [...values, startDate];
      //   }
      //   if (endDate) {
      //     query += ` AND DATE(receipt.${dateOption}) <= ?`;
      //     values = [...values, endDate];
      //   }
      // } else {
      //   if (startDate) {
      //     query += ` AND DATE(receipt.${dateOption}) = ?`;
      //     values = [...values, startDate];
      //   }
      // }

      if (customerName) {
        query += " AND customer.name LIKE ? ";
        values = [...values, `%${customerName}%`];
      }

      if (customerContact) {
        query += " AND customer.phone LIKE ? ";
        values = [...values, `%${customerContact}`];
      }

      if (companyName) {
        query += " AND store.name LIKE ? ";
        values = [...values, `%${companyName}%`];
      }

      const receipt = await getReceipt(query, values);
      if (receipt.error) throw new Error(receipt.error);
      res.status(200).json({ data: receipt });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default receipt;
