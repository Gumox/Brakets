import formidable from "formidable";
import fs from "fs";
import excuteQuery from './db';


export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {

	saveFile(files, fields['receipt_id'], fields['num']).then((body) => {
		console.log(body);
		if (body != "fail"){
			console.log("submit Receipt Image SUCC");
			res.statusCode = 200;
                	res.json(body);
		}	
		else{
		
			console.log("submit Receipt Image FAIL");
			res.status(400).send();	
		}
	
	
	});
  });

};

const saveFile = async (files, rid, num) => {
	if (!rid)
		return "fail";
	if (!num)
		return "fail";

	//console.log("for " + file);
	var image = files.image;
	var image1 = files.image1;
	var image2 = files.image2;
	var image3 = files.image3;
	var image4 = files.image4;
	var name = "./public/storage/receipt/"+rid+"-"+num+"-";
	var url = "http://13.125.232.214/storage/receipt/"+rid+"-"+num+"-";

	console.log(image);
	const data = fs.readFileSync(image.path);
	fs.writeFileSync(`${name}image.jpg`, data);
	await fs.unlinkSync(image.path);

	const data1 = fs.readFileSync(image1.path);
	fs.writeFileSync(`${name}image1.jpg`, data1);
	await fs.unlinkSync(image1.path);

	var query = "UPDATE receipt_detail SET image=?, image1=? ";
	var values = [url+'image.jpg', url+'image1.jpg'];
	if (image2){
		const data2 = fs.readFileSync(image2.path);
		fs.writeFileSync(`${name}image2.jpg`, data2);
		await fs.unlinkSync(image2.path);
		query += ",image2=? ";
		values.push(url+'image2.jpg');
	}

	if (image3){
		const data3 = fs.readFileSync(image3.path);
		fs.writeFileSync(`${name}image3.jpg`, data3);
		await fs.unlinkSync(image3.path);
		query += ",image3=? ";
		values.push(url+'image3.jpg');
	}

	if (image4){
		const data4 = fs.readFileSync(image4.path);
		fs.writeFileSync(`${name}image4.jpg`, data4);
		await fs.unlinkSync(image4.path);
		query += ",image4=? ";
		values.push(url+'image4.jpg');
	}

	query += "WHERE receipt_id=? AND num=?";
	const result = Array.from(values);
	values.push(rid, num);


	const update_image = await excuteQuery({
            query: query,
            values: values
        });


  return {result};
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};

