import ip from "../serverIp/Ip";
export  const getData = async (code) => {
        console.log("in getData")

    try {
        const response = await fetch(ip+`/api/RepairDetailInfo`,{method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        query: {code:code}
        });
        const json = await response.json();
        console.log("in getData")
        console.log(json)
    } catch (error) {
        console.error(error);
    } finally {

    }
}