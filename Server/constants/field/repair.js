const FIELD = {
    ID: 'repair_detail_id', 
    PLACE_ID: 'store_id', // 수선처 id
    SEND_DATE: 'send_date', // 본사발송일
    REGISTER_DATE: 'register_date', // 생산업체 접수일
    DELIVERY_TYPE: 'delivery_type', // 운송형태
    FAULT_ID: 'fault_id', // 과실구분
    ANALYSIS_ID: 'analysis_id', // 내용분석
    RESULT_ID: 'result_id', // 판정결과
    MESSAGE: 'message', // 수선처 설명

    TYPE_ID_1: 'repair1_type_id', // 수선 내용
    COUNT_1: 'repair1_count', // 수량
    PRICE_1: 'repair1_price', // 비용
    TYPE_ID_2: 'repair2_type_id',
    COUNT_2: 'repair2_count',
    PRICE_2: 'repair2_price',
    TYPE_ID_3: 'repair3_type_id',
    COUNT_3: 'repair3_count',
    PRICE_3: 'repair3_price',

    DETAILS: [
        {
            TYPE_ID: 'repair1_type_id', // 수선 내용
            COUNT: 'repair1_count', // 수량
            PRICE: 'repair1_price', // 비용
            REDO: 'repair1_redo', // 재수선
        },
        {
            TYPE_ID: 'repair2_type_id', // 수선 내용
            COUNT: 'repair2_count', // 수량
            PRICE: 'repair2_price', // 비용
            REDO: 'repair2_redo', // 재수선
        },
        {
            TYPE_ID: 'repair3_type_id', // 수선 내용
            COUNT: 'repair3_count', // 수량
            PRICE: 'repair3_price', // 비용
            REDO: 'repair3_redo', // 재수선
        },
    ],

    COMPLETE_DATE: 'complete_date', // 수선처 발송일
    SHIPMENT_TYPE: 'shipment_type', // 발송방법
    SHIPMENT_PRICE: 'shipment_price', // 발송비용
    
    TOTAL_PRICE: 'total' // 총 비용
}

export default FIELD;