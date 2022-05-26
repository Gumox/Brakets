import axios from "axios"

const logout = (
    user
)=>{
    if(user){
        console.log(user)
        
        const handleLogout = async () => {
            await axios.get(`/api/auth/logout?staffId=${user.staff_id}&account=${user.account}&uid=${user.id}`);
        };
        handleLogout()
        return true
    }else{
        return false
    }
}
export default logout