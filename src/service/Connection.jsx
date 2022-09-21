import axios from "axios";


class Connect {
    getAllTransfer = async()=>{
        let number = 7
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
        let number = 7
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
    postTransfert = async(idDeb, idCred, bal)=>{
        let respons = null
        try {
            respons = await axios.post("http://localhost:9001/transfert",{
            idDebtor: idDeb,
            idCredit: idCred,
            balance: bal
            })
            return respons
        } catch (error) {
            return "no save"
        }
    }
   
}
export default new Connect();