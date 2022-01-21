import excuteQuery from "../db";

const deleteImage = async (id) => {
return excuteQuery({
    query: "DELETE FROM `repair_need_point` WHERE `repair_need_point`.`repair_need_id` = ?",
    values: [id],
});
};

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log(req.query);
        
    const { repair_need_id } = req.query;

    try {
        const result = await deleteImage(repair_need_id);
        if (result.error) throw new Error(result.error);

        if (result) {
            console.log("delete success");
            res.status(200).json({ msg:"delete success" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
        }
    }
};
  
  export default controller;