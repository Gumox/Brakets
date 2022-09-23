import excuteQuery from "../db"

async function setHeadquarter(
    state,
    headquarter_name,
    headquarter_name_kr,
    headquarter_code,
    ceo,
    ceo_address,
    ceo_email,
    company_registration_number,
    headquarter_call

) {
    const result = await excuteQuery({
        query: `INSERT INTO 
                headquarter(
                    state,
                    headquarter_name,
                    headquarter_name_kr,
                    headquarter_code,
                    ceo,
                    ceo_address,
                    ceo_email,
                    company_registration_number,
                    headquarter_call
                    ) VALUES (?,?,?,?,?,?,?,?,?)`,
        values:[
            state,
            headquarter_name,
            headquarter_name_kr,
            headquarter_code,
            ceo,
            ceo_address,
            ceo_email,
            company_registration_number,
            headquarter_call
        ]
      });
    
    
      return result;
}
async function setHeadquarterDefaultFaultData(
  headquarter_id,
) {
  const result = await excuteQuery({
      query: `INSERT INTO 
                    fault_type ( fault_name, fault_code, level, state, headquarter_id) 
              VALUES 
              ( '고객과실', '1', '1', '1', ${headquarter_id}), 
              ( '고객요구', '2', '0', '1', ${headquarter_id}), 
              ( '본사과실', '3', '0', '1', ${headquarter_id}), 
              ( '업체과실', '4', '0', '1', ${headquarter_id}), 
              ( '유통과실', '5', '0', '1', ${headquarter_id}), 
              ( '제품특성', '6', '1', '1', ${headquarter_id}), 
              ( '기타', '7', '0', '1', ${headquarter_id}), 
              ( '부자재분실', '8', '0', '1', ${headquarter_id})`,
      
    });
  
  
    return result;
}
async function setHeadquarterDefaultAnalysisData(
  headquarter_id,
) {
  const result = await excuteQuery({
      query: `INSERT INTO 
              analysis_type ( analysis_name, analysis_code, headquarter_id) 
              VALUES 
              ('봉제', '1', ${headquarter_id} ), 
              ('원단', '2', ${headquarter_id} ), 
              ('재단', '3', ${headquarter_id} ), 
              ('부자재', '4', ${headquarter_id} ), 
              ('오염', '5', ${headquarter_id} ), 
              ('사이즈수선', '6', ${headquarter_id} )`,
      
    });
  
  
    return result;
}
async function setHeadquarterDefaultResultData(
  headquarter_id,
) {
  const result = await excuteQuery({
      query: `INSERT INTO judgment_result 
              ( hq_id, judgment_name, level, judgment_code)
              VALUES 
              (${headquarter_id}, '본사수선', '0', '1'), 
              (${headquarter_id}, '업체수선', '0', '2'), 
              (${headquarter_id}, '외주수선', '1', '3'), 
              (${headquarter_id}, '하자반품', '0', '4'), 
              (${headquarter_id}, '업체교환', '0', '5'), 
              (${headquarter_id}, '업체클레임', '0', '6'), 
              (${headquarter_id}, '매장반송', '1', '7'), 
              (${headquarter_id}, '본사반송', '1', '8'), 
              (${headquarter_id}, '외부심의', '0', '9'), 
              (${headquarter_id}, '심의반송', '0', '10'), 
              (${headquarter_id}, '기타', '1', '11')`,
      
    });
  
  
    return result;
}

async function setDefaultClaim(  headquarter_id,) {
  const result = await excuteQuery({
      query: `INSERT INTO claim
              ( claim_value	,claim_text, claim_type, headquarter_id)
              VALUES 
              (1,'100%','택가',${headquarter_id}),
              (0.5,'50%','택가',${headquarter_id})
              (1,'100%','원가',${headquarter_id})
              (1.5,'150%','원가',${headquarter_id})`,
    });
  
    return result;
}

async function setHeadquarterDefaultAutoMessageData(
  headquarter_id,
) {
  const result = await excuteQuery({
      query: `INSERT INTO auto_sms_message 
              ( message_type, auto_sms_message1, auto_sms_message2, auto_sms_message3, headquarter_id) 
              VALUES 
              ('1', '입니다. \r\n의뢰하신 상품이', '점에 접수 되었습니다.\r\n접수 번호는 ', '입니다. 감사합니다.', ${headquarter_id}), 
              ('2', '입니다. \r\n요청하셨던 요청하셨던 접수가 처리되어 제품이', '점에 도착했습니다. \r\n접수 번호는', '입니다.  \r\n매장에 방문해 주시길 바랍니다.  감사합니다.', ${headquarter_id})`,
      
    });
  
  
    return result;
}

async function setHeadquarterDefaultNotice(
  headquarter_id,
) {
  const result = await excuteQuery({
      query: `INSERT INTO notice (  notice_type,
                                    text, 
                                    red_text,
                                    headquarter_id
                                  ) 
              VALUES
              
                (
                '1',
                '의류:\n동일원단이 없을 시 다른 원단으로 수선합니다.\n\n신발:\n동일한 창 및 자재가 없을 시 제품에 적합한 창, 부자재로 수선합니다.\n\n용품:\n스펙에 적합한 자재로 수선합니다.\n', 
                '*통보일로부터 1개월 이상 경과된 제품에 대해서는 당사에서 책임을 지지 않습니다', 
                ${headquarter_id}
                ),
                
                (
                '2',
                '수선 접수와 완료에 관한 안내 문자가 제공됩니다.', 
                '문자서비스 발송에 동의하십니까?', 
                ${headquarter_id}
                ),

                ( 
                '3',
                '1.개인정보 수집, 이용목적 :\r\n 수선접수 및 인도\r\n2.수지하는 개인정보의 항목\r\n 1) 이용자 식별을 위한 내용 : 성명 주소\r\n 2) 수선 안내를 위한 내용: 전화번호, 휴대폰, 주소\r\n3.개인정보 보유 및 이용기간:\r\n 3년\r\n', 
                '개인정보 수집 및 활용 동의를 거부할 권리가 있으며, 거부하는 경우 제품수선에 관한 적절한 절차를 보장 받지 못할 수 있습니다', 
                ${headquarter_id}
                )`,
      
    });
  
  
    return result;
}

async function setHeadquarterDefaultMessageData(
  headquarter_id,
) {
  const result = await excuteQuery({
      query: `INSERT INTO sms_message 
              ( sms_message, headquarter_id ,level) 
              VALUES 
              ('고객님께서 부담하실 수선비는  원 입니다(현금만 결제 가능)', ${headquarter_id} ,'2')`,
      
    });
  
  
    return result;
}
async function setHeadquarterDiscount(
  headquarter_id,
) {
  const result = await excuteQuery({
      query: `INSERT INTO discount_type 
              (discount_id, discount_name, discount_value, headquarter_id) 
              VALUES (NULL, '10%', '0.90', ${headquarter_id}), 
              (NULL, '20%', '0.80', ${headquarter_id}), 
              (NULL, '30%', '0.70', ${headquarter_id}), 
              (NULL, '40%', '0.60', ${headquarter_id}), 
              (NULL, '50%', '0.50', ${headquarter_id}), 
              (NULL, '60%', '0.40', ${headquarter_id}), 
              (NULL, '70%', '0.30', ${headquarter_id}), 
              (NULL, '80%', '0.20', ${headquarter_id}), 
              (NULL, '90%', '0.10', ${headquarter_id})`
      
    });
  
  
    return result;
}


async function setHeadquarterStore(
  headquarter_name,
  headquarter_code,
  headquarter_call,
  headquarter_id,
  address

) {
  const resultStore = await excuteQuery({
    query: `INSERT INTO 
              store(
                store_type,
                name,
                store_code,
                brand_id,
                use_mailbag,
                contact,
                address
                ) VALUES (?,?,?,?,?,?,?)`,
    values:[
      0,
      headquarter_name+" 서비스센터",
      headquarter_code,
      headquarter_id,
      1,
      headquarter_call,
      address
    ]
  });
  
    return resultStore;
}


const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.body");
        console.log(req.body);
        const{
            state,
            headquarter_name,
            headquarter_name_kr,
            headquarter_code,
            ceo,
            ceo_address,
            ceo_email,
            company_registration_number,
            headquarter_call,
            address
        } =req.body
        
    try {
      const result = await setHeadquarter(
                                    state,
                                    headquarter_name,
                                    headquarter_name_kr,
                                    headquarter_code,
                                    ceo,
                                    ceo_address,
                                    ceo_email,
                                    company_registration_number,
                                    headquarter_call
                                    );
      if (result.error) throw new Error(result.error);

      const id = result.insertId
      const resultStore = await setHeadquarterStore( headquarter_name,headquarter_code,headquarter_call, id, address);
        res.status(200).json({ body: resultStore });
        
      const resultFaultData = await setHeadquarterDefaultFaultData(id);
      if(resultFaultData.error){console.log(resultFaultData.error)}
      
      const resultAnalysis = await setHeadquarterDefaultAnalysisData(id);
      if(resultAnalysis.error){console.log(resultAnalysis.error)}
      
      
      const resultResult = await setHeadquarterDefaultResultData(id);
      if(resultResult.error){console.log(resultResult.error)}
      
      const resultClaim = await setDefaultClaim(id);
      if(resultClaim.error){console.log(resultClaim.error)}
      
      const resultAutoMessage = await setHeadquarterDefaultAutoMessageData(id);
      if(resultAutoMessage.error){console.log(resultAutoMessage.error)}
      
      
      const resultMessageData = await setHeadquarterDefaultMessageData(id);
      if(resultMessageData.error){console.log(resultMessageData.error)}

      const resultNoticeData = await setHeadquarterDefaultNotice(id);
      if(resultNoticeData.error){console.log(resultNoticeData.error)}

      const resultDiscount = await setHeadquarterDiscount(id);
      if(resultDiscount.error){console.log(resultDiscount.error)}
      
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;

