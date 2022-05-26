import excuteQuery from "../db"


async function modifyStoreStaff(
    staffState,
    staffName,
    staffPhone,
    staffEmail,
    
    staffId
) {
    const result = await excuteQuery({
        query: `UPDATE staff SET 
                
                    state = ?,
                    name = ?,
                    phone = ?,
                    staff_email = ?,
                    staff_code = ?

                    WHERE staff_id  = ?
                    `,
        values:[
            staffState,
            staffName,
            staffPhone,
            staffEmail,
            staffName,
            staffId
        ]
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.body");
        console.log(req.body);
        const {
            staffState,
            staffName,
            staffPhone,
            staffEmail,
            
            staffId,
        } = req.body;

        
    try {
      const result = await modifyStoreStaff(
                                        staffState,
                                        staffName,
                                        staffPhone,
                                        staffEmail,
                                        
                                        staffId
                                    );
                                    console.log(result)
      if (result.error) throw new Error(result.error);
        res.status(200).json({ body: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
