import jwt from 'jsonwebtoken';

const auth = async (req, res) => {
    if (req.method === "GET") {
      const { token } = req.cookies;
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      console.log(token)
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      if(!token || token === "") return res.status(200).json({ isAuthorized: false });
      
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        console.log(user)
        res.status(200).json({ isAuthorized: true, user :user});
      } catch (err) {
        res.status(200).json({ isAuthorized: false });
      }
    }
  };
  
  export default auth;
  