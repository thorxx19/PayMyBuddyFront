import axios from "axios";

const URL = "http://localhost:9001/"


class Connect {
    getAllTransfer = async()=>{

        try {
            return await axios.get("/transfert",{
                params: {id: number}
            });
        } catch (error){
            console.error(error)
        }
    } 
}
export default new Connect();