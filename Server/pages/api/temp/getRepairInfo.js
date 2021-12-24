// import excuteQuery from './db';


// export async function getRepairInfo(repair, category, receipt, name) {
//     try {

// 	var q = "";

// 	if (repair == 'type'){ 
// 	    if(category == 1 && receipt == 1){
// 		//고객용, 수선 -> 수선처
// 	    	//q = "SELECT repair_name, receiver, receiver_name FROM repair_type WHERE repair_id>0 AND priority=0";
// 	    	q = "SELECT repair_id, repair_name, receiver, receiver_name FROM repair_type WHERE priority=0";
// 	    }
// 	    else{
// 		//나머지 -> 본사
// 	    	q = "SELECT type.repair_id, type.repair_name, place.receiver, place.receiver_name FROM repair_type as type LEFT JOIN repair_type as place ON type.priority = place.repair_id WHERE type.repair_id>0 AND type.priority=0";
// 	    }
// 	}
	
// 	//repair == 'store'
// 	else{
// 	    q = "SELECT priority, repair_id, repair_name, receiver, receiver_name FROM repair_type WHERE repair_name = ? ORDER BY priority";
// 	}

//         const result = await excuteQuery({
//             query: q,
//             values: [name]
//         });

//         return result;

//     } catch (error) {
//         console.log(error);
//     }
// }

// export default (req, res) => {
//   if (req.method === "POST") {
//     console.log("req");
//     console.log(req.body);
//     var repair = req.body.repair; 	//type:수선유형, store:수선유형에 따른 수선처
//     var category = req.body.category; 	//1:고객용 2:매장용 3:선처리
//     var receipt = req.body.receipt; 	//1: 수선 2: 교환 3: 환불 4: 심의
//     var name = req.body.name; 		//수선유형 

//     getRepairInfo(repair, category, receipt, name).then((body) => {

//         if (body.length){
//                 console.log("Repair type Info");
//                 res.statusCode = 200;
//                 res.json({body});
//         }
//         else{
//                 console.log("No Repair type");
//                 res.status(204).send();
//         }

//     });
//   }
// };

