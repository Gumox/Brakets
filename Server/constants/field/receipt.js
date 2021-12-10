const FIELD = {
    ID: 'receipt_id',
    CODE: 'receipt_code', // 서비스카드 번호
    RECEIPT_DATE: 'receipt_date', // 매장접수일
    REGISTER_DATE: 'register_date', //본사접수일
    DUE_DATE: 'due_date', // 고객약속일
    CATEGORY: 'receipt_category', // 접수구분
    TYPE: 'receipt_type',  // 고객요구
    FAULT_ID: 'fault_id', // 과실구분
    FAULT_NAME: 'fault_name', // 과실구분
    ANALYSIS_ID: 'analysis_id', // 내용분석
    ANALYSIS_NAME: 'analysis_name', // 내용분석
    RESULT_ID: 'result_id', // 판정결과
    RESULT_NAME: 'result_name', // 판정결과
    SUBSTITUE: 'substitute', // 상품대체
    MESSAGE: 'receipt_message', // 본사설명
    FREECHARGE: 'freecharge', // 유상 | 무상
    CHARGE: 'charge', // 비용
    CASHRECEIPT_NUM: 'cashreceipt_num', // 현금영수증 번호
    STORE_SEND_DATE: 'complete_date', // 발송일 to S(store)

    // TODO: 아직 DB 에 없는 부분
    REPAIR_PLACE_ID: 'repair_send_date', // 수선처
    REPAIR_SEND_DATE: 'repair_send_date', // 발송일 to R(repair)
    MANUFACTURER_ID: 'manufacturer_id', // 생산업체 ID
    MANUFACTURER_CODE: 'manufacturer_code', // 생산업체 CODE
    MANUFACTURER_NAME: 'manufacturer_name', // 생산업체 NAME
    MANUFACTURER_SEND_DATE: 'manufacturer_send_date', // 발송일 to M(manufacturer)
}

export default FIELD;