import axios from "axios";

const isInsertedAccount = async(account) =>{
    const [staffsInfo] = await Promise.all([
        axios
          .get(`${process.env.API_URL}/staff/isInsertedAccount?account=${account}`,)
          .then(({ data }) => data.data), 
    ])
    return staffsInfo
}
export default isInsertedAccount