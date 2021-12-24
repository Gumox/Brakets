import styled from "styled-components";
import excuteQuery from "../db";

async function getReceipt(query, values) {
  const result = await excuteQuery({
    query: `SELECT receipt.receipt_id AS receipt_id,
                    receipt.receipt_code AS receipt_code,
                    receipt.store_id AS store_id,
                    store.store_code AS store_code,
                    store.name AS store_name,
                    store.store_category AS store_category,
                    store.contact AS store_contact,
                    receipt.receipt_date AS receipt_date,
                    receipt.due_date AS due_date,
                    receipt.register_date AS register_date,
                    receipt.customer_id AS customer_id,
                    receipt.category AS receipt_category,
                    customer.name AS customer_name, 
                    customer.phone AS customer_phone,
                    product.season AS product_season,
                    product.style AS product_style,
                    product.degree AS product_degree,
                    product.color AS product_color,
                    product.size AS product_size, 
                    receipt.receipt_type AS receipt_type,
                    receipt.cashreceipt_num AS cashreceipt_num,
                    analysis_type.analysis_name AS analysis_name,
                    result_type.result_name AS result_name,
                    fault_type.fault_name AS fault_name
            FROM receipt 
            LEFT JOIN store ON receipt.store_id = store.store_id 
            LEFT JOIN product ON receipt.product_id = product.product_id 
            LEFT JOIN customer ON receipt.customer_id = customer.customer_id 
            LEFT JOIN analysis_type ON receipt.analysis_id = analysis_type.analysis_id
            LEFT JOIN result_type ON receipt.result_id = result_type.result_id
            LEFT JOIN fault_type ON receipt.fault_id = fault_type.fault_id
            WHERE receipt.step = 1 ${query}`,
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
        year, // 월별 연도
        month, // 월별 월
        analysisId, // 내용분석 
        resultId, // 판정결과
        customerName, // 고객이름
        customerContact,  // 연락처(뒷4자리)
        companyName,  // 업체명
        hasRegistered,  // 접수여부
        hasSent,  // 발송여부
        hasCharged, // 유상수선
        hasCashReceipt, // 현금영수증번호
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
      } else if(dateType === "month") {
        if(year) {
          query += ` AND YEAR(receipt.${dateOption}) = ? `;
          values = [...values, year];
        }
        if(month) {
          query += ` AND MONTH(receipt.${dateOption}) = ? `;
          values = [...values, month];
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

      if (hasCharged) {
        if(hasCharged === "true") {
          query += " AND receipt.freecharge = 0 ";

          if(hasCashReceipt && hasCashReceipt === "true") {
            query += " AND receipt.cashreceipt_num IS NOT NULL "
          }
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
