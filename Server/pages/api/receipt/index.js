import styled from "styled-components";
import excuteQuery from "../db";

async function getReceipt(query, values) {
  const result = await excuteQuery({
    // No. Shop 매장명 구분 매장연락처 등록일 고객ID 접수구분 고객 연락처 시즌 스타일 차수 컬러 사이즈 판매가 고객요구 
    query: `SELECT receipt.receipt_id AS receipt_id,
                    receipt.receipt_code AS receipt_code,
                    receipt.store_id AS store_id,
                    store.name AS store_name,
                    store.store_type AS store_type,
                    store.contact AS store_contact,
                    receipt.receipt_date AS receipt_date,
                    receipt.customer_id AS customer_id,
                    receipt.category AS receipt_category,
                    customer.name AS customer_name, 
                    customer.phone AS customer_phone,
                    product.season AS product_season,
                    product.style AS product_style,
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
        isStoreType, // 매장별
        storeName,  // 매장명
        isStyleType,  // 스타일별
        season, // 시즌
        style,  // 스타일
        dateOption, // 날짜기준
        dateType, // 기간전체, 하루만
        startDate, 
        endDate,
        analysisId, // 내용분석 
        resultId, // 판정결과
        customerName, // 고객이름
        customerContact,  // 연락처(뒷4자리)
        companyName,  // 업체명
        hasRegistered,  // 접수여부
        hasSent,  // 발송여부
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
        if (style && style.length > 0) {
          query += " AND product.style = ? ";
          values = [...values, style]
        }
      }
      if (dateType === "all") {
        if (startDate) {
          query += ` AND DATE(receipt.${dateOption}) >= ? `;
          values = [...values, startDate];
        }
        if (endDate) {
          query += ` AND DATE(receipt.${dateOption}) <= ? `;
          values = [...values, endDate];
        }
      } else {
        if (startDate) {
          query += ` AND DATE(receipt.${dateOption}) = ? `;
          values = [...values, startDate];
        }
      }

      if(hasRegistered) {
        if(hasRegistered === "true") {
          query += ` AND receipt.register_date IS NOT NULL `;
        } else {
          query += ` AND receipt.register_date IS NULL `;
        }
      }

      if(hasSent) {
        if(hasSent === "true") {
          query += ` AND receipt.send_date IS NOT NULL `;
        } else {
          query += ` AND receipt.send_date IS NULL `;
        }
      }

      if(analysisId) {
        query += " AND receipt.analysis_id = ? ";
        values = [...values, analysisId];
      }

      if(resultId) {
        query += " AND receipt.result_id = ? ";
        values = [...values, resultId];
      }

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
