import REPAIR from "./repair";

const FIELD = {
  ID: `receipt_id`,
  CODE: `receipt_code`, // 서비스카드 번호
  CATEGORY: `receipt_category`, // 접수구분
  TYPE: `receipt_type`, // 고객요구
  SUBSTITUE: `substitute`, // 상품대체
  STORE_MESSAGE: `store_message`, // 매장 접수 내용

  RECEIPT_DATE: `receipt_date`, // 매장접수일
  DUE_DATE: `due_date`, // 고객약속일
  REGISTER_DATE: `register_date`, //본사접수일
  COMPLETE_DATE: `complete_date`, // 발송일 to S (처리 완료일)
  RECEIVED_DATE: `received_date`, // 매장 인수일

  FAULT_ID: `fault_id`, // 과실구분
  FAULT_NAME: `fault_name`, // 과실구분
  ANALYSIS_ID: `analysis_id`, // 내용분석
  ANALYSIS_NAME: `analysis_name`, // 내용분석
  RESULT_ID: `result_id`, // 판정결과
  RESULT_NAME: `result_name`, // 판정결과

  REPAIR_DETAILS: [
    createRepairIds("repair1_"),
    createRepairIds("repair2_"),
    createRepairIds("repair3_"),
  ],

  MANUFACTURER_DETAIL: {
    ID: `mfr_detail_id`,
    SEND_DATE: `mfr_send_date`, // 본사발송일
    REGISTER_DATE: `mfr_register_date`, // 생산업체 접수일
    COMPLETE_DATE: `mfr_complete_date`, // 생산업체 발송일
    SUBSTITUTE: `mfr_substitute`, // 상품대체품목
    MESSAGE: `mfr_message`, // 생산업체 설명
    REDO: `mfr_redo`, // 재수선
  },

  MESSAGE: `receipt_message`, // 본사설명
  PAID: `paid`, // 유상 | 무상
  FEE: `fee`, // 비용
  CASHRECEIPT_NUM: `cashreceipt_num`, // 현금영수증 번호
  STORE_SEND_DATE: `send_date`, // 발송일 to S(store)

  MANUFACTURER_CODE: `manufacturer_code`, // 생산업체 코드
  MANUFACTURER_NAME: `manufacturer_name`, // 생산업체 이름

  IMAGE: `image`, // 전체 이미지
};

function createRepairIds(prefix) {
  return {
    ID: `${prefix}detail_id`,
    PLACE_ID: `${prefix}store_id`, // 수선처 id
    PLACE_NAME: `${prefix}store_name`, // 수선처 이름
    SEND_DATE: `${prefix}send_date`, // 본사발송일
    REGISTER_DATE: `${prefix}register_date`, // 생산업체 접수일
    DELIVERY_TYPE: `${prefix}delivery_type`, // 운송형태
    FAULT_ID: `${prefix}fault_id`, // 과실구분
    ANALYSIS_ID: `${prefix}analysis_id`, // 내용분석
    RESULT_ID: `${prefix}result_id`, // 판정결과
    MESSAGE: `${prefix}message`, // 수선처 설명

    DETAILS: [
      {
        TYPE_ID: `${prefix}repair1_type_id`, // 수선 내용
        COUNT: `${prefix}repair1_count`, // 수량
        PRICE: `${prefix}repair1_price`, // 비용
        REDO: `${prefix}repair1_redo`, // 재수선
      },
      {
        TYPE_ID: `${prefix}repair2_type_id`, // 수선 내용
        COUNT: `${prefix}repair2_count`, // 수량
        PRICE: `${prefix}repair2_price`, // 비용
        REDO: `${prefix}repair2_redo`, // 재수선
      },
      {
        TYPE_ID: `${prefix}repair3_type_id`, // 수선 내용
        COUNT: `${prefix}repair3_count`, // 수량
        PRICE: `${prefix}repair3_price`, // 비용
        REDO: `${prefix}repair3_redo`, // 재수선
      },
    ],

    COMPLETE_DATE: `${prefix}complete_date`, // 수선처 발송일
    SHIPMENT_TYPE: `${prefix}shipment_type`, // 발송방법
    SHIPMENT_PRICE: `${prefix}shipment_price`, // 발송비용

    TOTAL_PRICE: `${prefix}total`, // 총 비용
  };
}

export default FIELD;
