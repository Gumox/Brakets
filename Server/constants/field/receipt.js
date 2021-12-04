const FIELD = {
    ID: 'receipt_id',
    CODE: 'receipt_code', // 서비스카드 번호
    RECEIPT_DATE: 'receipt_date', // 매장접수일
    REGISTER_DATE: 'register_date', //본사접수일
    DUE_DATE: 'due_date', // 고객약속일
    CATEGORY: 'receipt_category', // 접수구분
    TYPE: 'receipt_type',  // 고객요구
    FAULT_ID: 'fault_id', // 과실구분
    ANALYSIS_ID: 'analysis_id', // 내용분석
    RESULT_ID: 'result_id', // 판정결과
    SUBSTITUE: 'substitute', // 상품대체
    MESSAGE: 'receipt_message', // 본사설명

    // TODO: 아직 DB 에 없는 부분
    REPAIR_PLACE_ID: 'repair_send_date', // 수선처
    REPAIR_SEND_DATE: 'repair_send_date', // 발송일 to R(repair)
    MANUFACTURER_ID: 'manufacturer_id', // 생산업체 ID
    MANUFACTURER_CODE: 'manufacturer_code', // 생산업체 CODE
    MANUFACTURER_NAME: 'manufacturer_name', // 생산업체 NAME
    MANUFACTURER_SEND_DATE: 'manufacturer_send_date', // 발송일 to M(manufacturer)
    STORE_SEND_DATE: 'store_send_date', // 발송일 to S(store)
}

export default FIELD;