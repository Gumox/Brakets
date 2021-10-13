import Axios from "axios";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";

export default function Login() {
  const router = useRouter();
  function login() {
    event.preventDefault();

    Axios({
	  method: "POST",
	  url: "/api/login",
	  headers: {
	    "Content-Type": "application/json"
	  },
	  data: {
	    //id: "kakao-1234-1234",
	    //pwd: "0000",
	    id: event.target.id.value,
	    pwd: event.target.pwd.value,
	  },
    })
    .then(res => {
	  console.log("res", res.data.message);
	
	if (res.status === 200) {
        	//로그인 성공
        	//console.log(JSON.stringify(res));
        	//console.log(res.data.body); 
        	console.log("login succ");
		alert("login succ");
        	router.push("/");
      	}
      	else if (res.status === 204) {
        	console.log("login fail");
		alert("login fail");
      	}
    })
    .catch(err => {
	  console.log("error in request", err);
    });

  }



  return (
    <div style={{ padding: "100px 0", textAlign: "inherit" }}>
    <form onSubmit={login} style={{display: "grid", padding: "90px"}}>
      <label htmlFor="id">ID</label>
      	<input id="id" name="id" type="text" autoComplete="id" required />
	<br />
      <label htmlFor="pwd">PWD</label>
      	<input id="pwd" name="pwd" type="password" autoComplete="pwd" required />
	<br />
      <button type="submit">Login</button>
    </form>

    </div>
  );
}
