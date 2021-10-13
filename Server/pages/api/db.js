/*
const mysql = require('mysql');  // mysql 모듈 로드
const conn = {  // mysql 접속 설정
host: process.env.MYSQL_HOST,
port: process.env.MYSQL_PORT,
database: process.env.MYSQL_DATABASE,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD
};


export default async function excuteQuery({query}) {

	var connection = mysql.createConnection(conn); // DB 커넥션 생성
	connection.connect();   // DB 접속
	
	var result;

	connection.query(query, function (err, results, fields) { // testQuery 실행
	    if (err) {
		console.log(err);
	    }
	    //console.log(results);
	    result = results;
	});


	connection.end(); // DB 접속 종료
	return result

}
*/

import mysql from 'serverless-mysql';

export const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    },
});


export default async function excuteQuery({query}) {
    try {
        const results = await db.query(query);
	/*
	await db.query(query, (err, result, fields, data) => {
        	data = JSON.stringify(result);
		console.log("dbconnbb" + data);
		return data;
    	})
	*/
        await db.end();
	//console.log("dbconnaa" + JSON.stringify({results}));
        return results;
    } catch (error) {
        return { error };
    }
}
