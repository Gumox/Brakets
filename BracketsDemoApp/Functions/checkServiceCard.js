import ip from "../serverIp/Ip";
const checkServiceCard = async (code) => {
    try {
        const response = await fetch(ip+`/api/receipt/receiptedServiceCard?code=${code}`,{method: 'GET',
        headers: {
            'Accept': '',
            'Content-Type': 'multipart/form-data'
            }
        });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return null
    } finally {

    }
}
export default checkServiceCard;