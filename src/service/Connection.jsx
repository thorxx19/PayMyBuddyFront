import axios from "axios";


class Connect {
    getAllTransfer = async()=>{
        let number = 1
        let respons = null;
        try {
            respons = await axios.get("http://localhost:9001/transfert",{
                params: {id: number}  
            });
            console.log(respons.data)
            return respons.data;
        } catch (error){
            return 0
        }
    } 
    getConnectById = async()=>{
        let number = 1
        let respons = null
        try {
            respons = await axios.get("http://localhost:9001/connectId",{
                params:{idUn: number}
            })
            console.log(respons.data)
            return respons;
        } catch (error) {
            return 0
        }
    }
   
}
export default new Connect();