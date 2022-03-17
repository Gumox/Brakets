export const parseRepairReceptionData =(dataList)=>{
    let parseDataList =[];

    dataList.map((item,index)=>{
        let obj ={};
        obj["서비스번호"]=item.receipt_code;
        obj["매장접수일"]=item.receipt_date;
        obj["매장명"]=item.store_name;
        obj["브랜드"]=item.brand_name;
        
        parseDataList[index] = obj
    })

    return parseDataList;
}

export const parseInquiryData =(dataList)=>{
    let parseDataList =[];

    dataList.map((item,index)=>{
        let obj ={};
        obj["서비스번호"]=item.receipt_code;
        obj["매장접수일"]=item.receipt_date;
        obj["매장명"]=item.store_name;
        obj["브랜드"]=item.brand_name;
        obj["시즌"]=item.season_name;
        obj["스타일"]=item.style_code;
        obj["컬러"]=item.color;
        obj["사이즈"]=item.size;
        obj["과실구분"]=item.fault;
        obj["내용분석"]=item.analysis;
        obj["판정결과"]=item.result;
        obj["수선내용1"]=item.repair1_name;
        obj["수선비용1"]=item.repair_detail_repair1_price;
        obj["수선내용2"]=item.repair2_name;
        obj["수선비용2"]=item.repair_detail_repair2_price;
        obj["수선내용3"]=item.repair3_name;
        obj["수선비용3"]=item.repair_detail_repair3_price;
        obj["매장접수 내용"]=item.store_message;
        
        parseDataList[index] = obj
    })

    return parseDataList;
}
export const parseReturnunRegisteredData =(dataList)=>{
    let parseDataList =[];

    dataList.map((item,index)=>{
        let obj ={};
        obj["수선처"]=item.shop_name;
        obj["미등록 반송 등록일"]=item.return_date;
        obj["서비스 번호"]=item.receipt_code;
        obj["받는곳"]=item.receiver_name;
        obj["고객이름"]=item.customer_name;
        obj["매장명"]=item.store_name;
        obj["브랜드"]=item.brand_name;
        
        parseDataList[index] = obj
    })

    return parseDataList;
}