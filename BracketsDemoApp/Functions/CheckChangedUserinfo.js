import React from "react";
import axios from "axios";
import ip from "../serverIp/Ip";
import AsyncStorage from "@react-native-community/async-storage";
import store from "../store/store";


const checkChangedUserInfo =(navigation)=>{
        let userEmail =store.getState().storeStaffId
        console.log(userEmail)
        

        axios.get( ip + `/api/auth/store?email=${userEmail}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then((response) => {
            // 응답 처리
                let checkResult= ( JSON.stringify({'userName':response.data.data[0].staff_name,'userEmail': userEmail,"data": response.data.data,"storeName":response.data.data[0].name}))
                console.log(checkResult)

                AsyncStorage.getItem('userInfo', (err, result) => {
                    if (result !== null) {
                        if(checkResult !== result){
                            alert("사용자 정보가 변경되어 로그아웃 되었습니다.")
                            AsyncStorage.removeItem('userInfo'),
                            navigation.reset({routes: [{name: 'Login'}]})

                        }
                    }
                })

            })
            .catch((error) => {
            // 예외 처리
            console.error(error);
            })

        
        
}
export default checkChangedUserInfo