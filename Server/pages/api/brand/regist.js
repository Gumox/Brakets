import excuteQuery from "../db";

async function setBrand(brandName,headquarterId,serviceDate) {
    const result = await excuteQuery({
        query: `INSERT INTO 
        brand(
                brand_name,
                headquarter_id,
                service_date    ) VALUES (?,?,?)`,
        
    values:[brandName,headquarterId,serviceDate]
  });

  return result;
}

async function setBrandDefualtMessageData(
  brandName,
  headquarterId,
) {
  const result = await excuteQuery({
      query: `INSERT INTO sms_message 
              ( sms_message, headquarter_id ) 
              VALUES 
              ('${brandName }입니다. AS가 완료되어 내일 매장에 도착 예정입니다 (공휴일은 다음날)', ${headquarterId} ),
              ('${brandName} 입니다. 의뢰하신 물품이 본사 고객상담실에 접수 되었습니다. 감사합니다', ${headquarterId} )`,
      
    });
  
  
    return result;
}


const Controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/brand/regist");
    const {brandName,headquarterId,serviceDate} = req.query;
    console.log( req.query)
    try {
      const brand = await setBrand(brandName,headquarterId,serviceDate);
      if (brand.error) throw new Error(brand.error);

      const brandDefualtMessageData = await setBrandDefualtMessageData(brandName,headquarterId);
      if (brandDefualtMessageData.error) throw new Error(brandDefualtMessageData.error);

      res.status(200).json({ data: brand });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default Controller;
