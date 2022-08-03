import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";
import _ from "lodash"

const getNextStoreCode=(stores)=>{
    const codeList =[];
    stores.map((item)=>{
        codeList.push(item.store_code)
    })
    
    const dist = _.uniq(codeList)

    const filt =_.filter(dist,function(o){
        return o.length > 0
    })
    const numbering =[];
    filt.map((el)=>{
        const xplit =String(el).split(".")
        const xplitLength =xplit.length
        numbering.push(Number(xplit[xplitLength-1]))
    })
    const lastNumber = _.sortBy(numbering).reverse()[0]
    let nextNumber = "0"
    if(lastNumber >= 0){
        nextNumber = String(lastNumber+1)
    }

    if(nextNumber.length === 1){
        return "0000"+nextNumber
    }else if(nextNumber.length === 2){
        return "000"+nextNumber
    }else if(nextNumber.length === 3){
        return "00"+nextNumber
    }else if(nextNumber.length === 4){
        return "0"+nextNumber
    }else if(nextNumber.length === 5){
        return nextNumber
    }else if(nextNumber.length === 0){
        return "00000"
    }else {
        return "over store"
    }
}

const emptySpace =(str)=>{
  
  return(str.trim())
  
}

async function registStore(
    name,
    store_code,
    brandId,
    storeCategory,
    useMailbag,
    contact,
    address
) {
    const result = await excuteQuery({
        query: `INSERT INTO 
        store(
                store_type,
                name,
                store_code,
                brand_id,
                store_category,
                use_mailbag,
                contact,
                address
                ) VALUES (1,?,?,?,?,?,?,?)`,
        
    values:[
        name,
        store_code,
        brandId,
        storeCategory,
        useMailbag,
        contact,
        address 
    ]
  });

  return result;
}
async function registManager(
    managerAccount,
    managerEmail,
    managerName,
    managerPhone,
    managerCode
  ) {
    const result = await excuteQuery({
        query: `INSERT INTO 
        staff(
            account,
            staff_email,
            name,
            phone,
            staff_code,
            level
                ) VALUES (?,?,?,?,?,2)`,
        
    values:[
        managerAccount,
        managerEmail,
        managerName,
        managerPhone,
        managerCode
    ]
  });

  return result;
}

async function setManagerStore(
    managerId,
    storeId 
  ) {
  const resultStore = await excuteQuery({
    query: `INSERT INTO 
                staff_store(
                    staff_id,
                    store_id
                ) VALUES (?,?)`,
    values:[
        managerId,
        storeId
    ]
  });
  
    return resultStore;
}

async function getBrand(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT  UPPER(brand_name) AS brand_name , brand_id FROM brand  JOIN headquarter ON headquarter.headquarter_id = brand.headquarter_id
           WHERE brand.headquarter_id=?
            `,
    values:[headquarterId]
  });

  return result;
}
async function getManager(account) {
  const result = await excuteQuery({
    query: `SELECT * FROM staff 
           WHERE staff.account = ?
            `,
    values:[account]
  });

  return result;
}

async function getStore(storeName) {
  const result = await excuteQuery({
    query: `SELECT * FROM store 
            WHERE store.name = ?
            `,
    values:[storeName]
  });

  return result;
}

async function getManagerStore(manager_id) {
  const result = await excuteQuery({
    query: `SELECT * 
            FROM staff_store 
            WHERE staff_store.staff_id = ?`,
    values:[manager_id]
  });

  return result;
}

async function getStaffs(store_id,manager_id) {
  const result = await excuteQuery({
    query: `SELECT * FROM staff 
            LEFT JOIN staff_store ON staff.staff_id = staff_store.staff_id
            WHERE staff_store.store_id = ? AND NOT staff_store.staff_id = ?`,
    values:[store_id,manager_id]
  });

  return result;
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/store/registToExcel");
    console.log(req.body)

    const {headquarterId,list,stores} = req.body;
    const failList = []
    try {
        const brands = await getBrand(headquarterId)
        
        console.log("=================================================================")
        
        for(let i =2; i<list.length; i++){
          const item = list[i]
          if( item["brand"] && item["manager_account"]  && item["manager_name"] && item["manager_phone"]
              && item["store_address"] && item["store_category"] && item["store_contact"] && item["store_name"] && item["use_mailbag"]){


            const manager = await getManager(item["manager_account"])
            const store = await getStore(emptySpace(item["store_name"]))

            console.log("store")
            console.log(store.length)

            console.log("manager")
            console.log(manager.length)
            
           
            const itemBrand =_.find(brands,function(o){
              return o.brand_name === String(emptySpace(item["brand"])).toUpperCase() && item["brand"]
            })
              

            const brandCode = String(emptySpace(item["brand"])).replace(/ /g,"_")

            if(itemBrand && store.length === 0){
              const parseToBrand = _.filter(stores,{brand_id:Number(itemBrand.brand_id)})
              const storeCode = `S.${brandCode.toUpperCase()}.${getNextStoreCode(parseToBrand)}`
  
              let storeCategory =1;
              let useMailbag = 1;
  
              if(item["store_category"] == 2 || emptySpace(item["store_category"]) == "상설"){
                storeCategory = 2;
              }
              if(item["use_mailbag"] == 0 || emptySpace(item["use_mailbag"]) == "사용안함"){
                useMailbag = 0;
              }
              
              
              const store = await registStore(
                                    emptySpace(item["store_name"] ),
                                              storeCode,
                                              itemBrand.brand_id ,
                                              storeCategory ,
                                              useMailbag ,
                                    emptySpace(item["store_contact"]) ,
                                    emptySpace(item["store_address"]) 
                                              );
  
              console.log(store)
              if (store.error) throw new Error(store.error);
  
                
              if(manager.length){
                console.log(manager[0])
                const managerId = manager[0].staff_id
        
                await setManagerStore(managerId,store.insertId)
                const managerStore = await getManagerStore(managerId)
        
                const staffs = await getStaffs(managerStore[0].store_id,managerId)
                
                for(let staff of staffs){
                  await setManagerStore(staff.staff_id,store.insertId)
                }

              }else{
                let managerEmail = item["manager_email"]
                if(managerEmail){
                  managerEmail = emptySpace(item["manager_email"])
                }else{
                  managerEmail = null
                }
                const managerResult = await registManager(
                                    emptySpace(item["manager_account"]) ,
                                    managerEmail,
                                    emptySpace(item["manager_name"]) ,
                                    emptySpace(item["manager_phone"]) ,
                                                    "A"
                                                    );
                console.log(managerResult)
  
                
                await setManagerStore(managerResult.insertId,store.insertId)
  
                if (managerResult.error) throw new Error(managerResult.error);
              }
            }else if(store.length >0){
              let result = item;
              result["reason"] = "중복된 매장명"
              failList.push(result)
            }else{
              console.log("error")
            }
          }

        }
        console.log("=================================================================")
        console.log({fail:failList})
        res.status(200).json({message:"succeed",fail:failList})
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message, text: fields, file: files});
    } finally {
      res.end();
    }
  }
};

export default controller;
