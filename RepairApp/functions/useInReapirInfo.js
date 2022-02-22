import ip from "../serverIp/Ip";
export  const getData = async (code) => {
        console.log("in getData")

    try {
        const response = await fetch(ip+`/api/RepairDetailInfo`,{method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        params: {code:code}
        });
        const json = await response.json();
        console.log("in getData")
        console.log(json)
    } catch (error) {
        console.error(error);
    } finally {

    }
}
const getProductCategory = async () => {
        
    try {
        const response = await fetch(ip+'/api/getProductCategory',{method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(bodyData)
        });
        const json = await response.json();
        console.log(json.body);
        console.log(data);
        store.dispatch({type:'GET_APL_TYPE',setAplType: json.body});
        console.log(store.getState().getProductCategory);
        store.dispatch({type:'REQUIREMENT',requirement:{name:"수선",id:1}});
        
        setLoading(false);
       
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
        navigation.navigate("ShopStepThree");
    }
}