import axios from "axios";




class Connect {
    getAllTransfer = async()=>{
        const number = 12
        try {
            return await axios.get("/transfert",{
                params: {id: number}
            });
        } catch (error){
            return 0
        }
    } 
}
export default new Connect();