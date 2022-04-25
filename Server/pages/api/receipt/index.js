import styled from "styled-components";
import excuteQuery from "../db";

async function getReceipt(query, values) {
  const result = await excuteQuery({
    query: `SELECT receipt.receipt_id AS receipt_id,
                    receipt.receipt_code AS receipt_code,
                    receipt.category AS receipt_category,
                    receipt.receipt_type AS receipt_type,
                    receipt.store_id AS store_id,
                    receipt.customer_id AS customer_id,
                    receipt.store_message AS store_message,
                    receipt.message AS receipt_message,
                    receipt.receipt_date AS receipt_date,
                    receipt.register_date AS register_date,
                    receipt.due_date AS due_date,
                    receipt.complete_date AS complete_date,
                    receipt.result_detail AS result_detail,
                    receipt.fee,
                    receipt.paid,
                    receipt.deliberation_result,
                    
                    receipt.discount AS discount,
                    receipt.discount_price AS discount_price,
                    receipt.claim AS claim,
                    receipt.claim_price AS claim_price,
                    claim.claim_text,
                    
                    store.store_code AS store_code,
                    store.name AS store_name,
                    store.store_category AS store_category,
                    store.contact AS store_contact,
                    customer.name AS customer_name, 
                    customer.phone AS customer_phone,
                    product.season_id AS product_season_id,
                    season_type.season_name AS product_season_name,
                    product.style_id AS product_style_id,
                    style_type.style_code AS product_style_code,
                    product.degree AS product_degree,
                    product.color AS product_color,
                    product.size AS product_size, 
                    product.tag_price AS product_tag_price,
                    product.org_price AS product_org_price,
                    receipt.cashreceipt_num AS cashreceipt_num,
                    analysis_type.analysis_name AS analysis_name,
                    judgment_result.judgment_name AS result_name,
                    receipt.issued AS issued,
                    fault_type.fault_name AS fault_name,
                    receipt.repair1_detail_id,
                    repair1_store.name AS repair1_store_name,
                    repair1.store_id AS repair1_store_id,
                    DATE_FORMAT(repair1.send_date, '%Y-%m-%d %H:%i:%s') AS repair1_send_date,  
                    DATE_FORMAT(repair1.register_date, '%Y-%m-%d %H:%i:%s') AS repair1_register_date,  
                    repair1.delivery_type AS repair1_delivery_type,
                    repair1.fault_id AS repair1_fault_id,
                    repair1.result_id AS repair1_result_id,
                    repair1.analysis_id AS repair1_analysis_id,
                    repair1.message AS repair1_message,
                    repair1.repair1_type_id AS repair1_repair1_type_id,
                    repair1.repair1_count AS repair1_repair1_count,
                    repair1.repair1_price AS repair1_repair1_price,
                    repair1.repair1_redo AS repair1_repair1_redo,
                    repair1.repair2_type_id AS repair1_repair2_type_id,
                    repair1.repair2_count AS repair1_repair2_count,
                    repair1.repair2_price AS repair1_repair2_price,
                    repair1.repair2_redo AS repair1_repair2_redo,
                    repair1.repair3_type_id AS repair1_repair3_type_id,
                    repair1.repair3_count AS repair1_repair3_count,
                    repair1.repair3_price AS repair1_repair3_price,
                    repair1.repair3_redo AS repair1_repair3_redo,
                    DATE_FORMAT(repair1.complete_date, '%Y-%m-%d %H:%i:%s') AS repair1_complete_date,  
                    (repair1.repair1_price + repair1.repair2_price + repair1.repair3_price) AS repair1_total,
                    repair1.shipment_type AS repair1_shipment_type,
                    repair1.shipment_price AS repair1_shipment_price,
                    receipt.repair2_detail_id,
                    repair2_store.name AS repair2_store_name,
                    repair2.store_id AS repair2_store_id,
                    DATE_FORMAT(repair2.send_date, '%Y-%m-%d %H:%i:%s') AS repair2_send_date,  
                    DATE_FORMAT(repair2.register_date, '%Y-%m-%d %H:%i:%s') AS repair2_register_date,  
                    repair2.delivery_type AS repair2_delivery_type,
                    repair2.fault_id AS repair2_fault_id,
                    repair2.result_id AS repair2_result_id,
                    repair2.analysis_id AS repair2_analysis_id,
                    repair2.message AS repair2_message,
                    repair2.repair1_type_id AS repair2_repair1_type_id,
                    repair2.repair1_count AS repair2_repair1_count,
                    repair2.repair1_price AS repair2_repair1_price,
                    repair2.repair1_redo AS repair2_repair1_redo,
                    repair2.repair2_type_id AS repair2_repair2_type_id,
                    repair2.repair2_count AS repair2_repair2_count,
                    repair2.repair2_price AS repair2_repair2_price,
                    repair2.repair2_redo AS repair2_repair2_redo,
                    repair2.repair3_type_id AS repair2_repair3_type_id,
                    repair2.repair3_count AS repair2_repair3_count,
                    repair2.repair3_price AS repair2_repair3_price,
                    repair2.repair3_redo AS repair2_repair3_redo,
                    DATE_FORMAT(repair2.complete_date, '%Y-%m-%d %H:%i:%s') AS repair2_complete_date,  
                    (repair2.repair1_price + repair2.repair2_price + repair2.repair3_price) AS repair2_total,
                    repair2.shipment_type AS repair2_shipment_type,
                    repair2.shipment_price AS repair2_shipment_price,
                    receipt.repair3_detail_id,
                    repair3_store.name AS repair3_store_name,
                    repair3.store_id AS repair3_store_id,
                    DATE_FORMAT(repair3.send_date, '%Y-%m-%d %H:%i:%s') AS repair3_send_date,  
                    DATE_FORMAT(repair3.register_date, '%Y-%m-%d %H:%i:%s') AS repair3_register_date,  
                    repair3.delivery_type AS repair3_delivery_type,
                    repair3.fault_id AS repair3_fault_id,
                    repair3.result_id AS repair3_result_id,
                    repair3.analysis_id AS repair3_analysis_id,
                    repair3.message AS repair3_message,
                    repair3.repair1_type_id AS repair3_repair1_type_id,
                    repair3.repair1_count AS repair3_repair1_count,
                    repair3.repair1_price AS repair3_repair1_price,
                    repair3.repair1_redo AS repair3_repair1_redo,
                    repair3.repair2_type_id AS repair3_repair2_type_id,
                    repair3.repair2_count AS repair3_repair2_count,
                    repair3.repair2_price AS repair3_repair2_price,
                    repair3.repair2_redo AS repair3_repair2_redo,
                    repair3.repair3_type_id AS repair3_repair3_type_id,
                    repair3.repair3_count AS repair3_repair3_count,
                    repair3.repair3_price AS repair3_repair3_price,
                    repair3.repair3_redo AS repair3_repair3_redo,
                    DATE_FORMAT(repair3.complete_date, '%Y-%m-%d %H:%i:%s') AS repair3_complete_date,  
                    (repair3.repair1_price + repair3.repair2_price + repair3.repair3_price) AS repair3_total,
                    repair3.shipment_type AS repair3_shipment_type,
                    repair3.shipment_price AS repair3_shipment_price,
                    receipt.mfr_detail_id,
                    mfr_store.name AS manufacturer_name,
                    mfr.store_id AS mfr_store_id,
                    DATE_FORMAT(mfr.send_date, '%Y-%m-%d %H:%i:%s') AS mfr_send_date,  
                    DATE_FORMAT(mfr.register_date, '%Y-%m-%d %H:%i:%s') AS mfr_register_date,  
                    IF(mfr.substitute=0, "N", "Y") AS mfr_substitute,
                    mfr.message AS mfr_message,
                    staff.staff_code,
                    manager.staff_code AS manager_code,
                    DATE_FORMAT(mfr.complete_date, '%Y-%m-%d %H:%i:%s') AS mfr_complete_date  
            FROM receipt 
            JOIN brand ON receipt.brand_id = brand.brand_id
            LEFT JOIN store ON receipt.store_id = store.store_id 
            LEFT JOIN product ON receipt.product_id = product.product_id 
            LEFT JOIN season_type ON product.season_id = season_type.season_id
            LEFT JOIN style_type ON product.style_id = style_type.style_id
            LEFT JOIN customer ON receipt.customer_id = customer.customer_id 
            LEFT JOIN analysis_type ON receipt.analysis_id = analysis_type.analysis_id
            LEFT JOIN judgment_result ON receipt.result_id = judgment_result.judgment_result_id 
            LEFT JOIN fault_type ON receipt.fault_id = fault_type.fault_id
            LEFT JOIN repair_detail AS repair1 ON receipt.repair1_detail_id = repair1.repair_detail_id
            LEFT JOIN store AS repair1_store ON repair1.store_id = repair1_store.store_id
            LEFT JOIN repair_detail AS repair2 ON receipt.repair2_detail_id = repair2.repair_detail_id
            LEFT JOIN store AS repair2_store ON repair2.store_id = repair2_store.store_id
            LEFT JOIN repair_detail AS repair3 ON receipt.repair3_detail_id = repair3.repair_detail_id
            LEFT JOIN store AS repair3_store ON repair3.store_id = repair3_store.store_id
            LEFT JOIN mfr_detail AS mfr ON receipt.mfr_detail_id = mfr.mfr_detail_id
            LEFT JOIN store AS mfr_store ON receipt.mfr_id = mfr_store.store_id
            LEFT JOIN claim ON claim.claim_id = receipt.claim
            LEFT JOIN staff ON staff.staff_id = receipt.staff_id
            LEFT JOIN staff AS manager ON manager.staff_id = receipt.manager_id
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
        headquarter_id,
        brandId, // 브랜드 id
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
        serviceCardId
      } = req.query;
      let query = "";
      let values = [];

      if(headquarter_id) {
        query += " AND brand.headquarter_id = ? ";
        values = [...values, headquarter_id];
      }

      if(brandId) {
        query += " AND receipt.brand_id = ? ";
        values = [...values, brandId];
      }

      if (isStoreType && isStoreType !== "false" && storeName) {
        query += " AND receipt.store_id = ? ";
        values = [...values, storeName];
      }

      if (isStyleType && isStyleType !== "false") {
        if (season) {
          query += " AND product.season_id = ? ";
          values = [...values, season];
        }
        if (style && style.length > 0) {
          query += " AND product.style_id = ? ";
          values = [...values, style]
        }
      }

      let dateColumn = dateOption;
      if(dateColumn === "return_date") dateColumn = "complete_date";
      if (dateType === "all") {
        if (startDate) {
          query += ` AND DATE(receipt.${dateColumn}) >= ? `;
          values = [...values, startDate];
        }
        if (endDate) {
          query += ` AND DATE(receipt.${dateColumn}) <= ? `;
          values = [...values, endDate];
        }
      } else if(dateType === "month") {
        if(year) {
          query += ` AND YEAR(receipt.${dateColumn}) = ? `;
          values = [...values, year];
        }
        if(month) {
          query += ` AND MONTH(receipt.${dateColumn}) = ? `;
          values = [...values, month];
        }
      } else {
        if (startDate) {
          query += ` AND DATE(receipt.${dateColumn}) = ? `;
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
          query += ` AND receipt.complete_date IS NOT NULL `;
        } else {
          query += ` AND receipt.complete_date IS NULL `;
        }
      }

      if (hasCharged) {
        if(hasCharged === "true") {
          query += " AND receipt.paid = 1 ";

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
        values = [...values, `%${customerContact}%`];
      }

      if (companyName) {
        query += "AND store.name LIKE";
        values = [...values, `%${companyName}%`];
      }
      if (serviceCardId) {
        query += " AND receipt.receipt_code = ? ";
        values = [...values, serviceCardId];
        console.log(serviceCardId)
      }

      const receipt = await getReceipt(query, values);
      if (receipt.error) throw new Error(receipt.error);
      res.status(200).json({ data: receipt });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message});
    }
  }
};

export default receipt;
