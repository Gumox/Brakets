import excuteQuery from './db';


export async function staffLogin(id, pwd) {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM staff WHERE id='" + id + "' AND passwd='" + pwd + "'"
        });

        //console.log( "rr" + result);
        return result;

    } catch (error) {
        console.log(error);
    }
}

export default (req, res) => {
  if (req.method === "POST") {
    console.log("req"+ req.body);
    //var id = "kakao-1234-1234";
    //var pwd = "0001";
    var id = req.body.id;
    var pwd = req.body.pwd;
	
    staffLogin(id,pwd).then((body) => { 
	//console.log("login:", body);

	if (body.length){
		console.log("login succ");
		res.statusCode = 200;
    		res.setHeader("Set-Cookie", "a_name=Mike;Max-Age=3600;HttpOnly,Secure");
		res.json({body});
	}
	else{
		console.log("login fail");
		res.status(204).send();
	}
    
    });
  }
};



