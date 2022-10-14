import axios from "axios";


class Connect {
    getAllTransfer = async()=>{
        let number = 8
        let respons = []
        try {
            respons = await axios.get("http://localhost:9001/transfert",{
                params: {id: number}  
            });
            console.log(respons.data)
            return respons;
        } catch (error){
            console.log(error)
            return 0
        }
    } 
    getClientById = async(id)=>{
        let respons = []
        try {
            respons = await axios.get("http://localhost:9001/clientId",{
                params:{
                    id
                }
            })
            console.log(respons.data)
            return respons
        } catch (error) {
            return 0
        }
    }
    getConnectById = async()=>{
        let number = 8
        let respons = []
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
    postTransfert = async(idDebtor, idCredit, balance , descriptif)=>{
        let respons = []
        try {
            respons = await axios.post("http://localhost:9001/transfert",{
            idDebtor,
            idCredit,
            balance,
            descriptif
            })
            return respons
        } catch (error) {
            return false
        }
    }
    getAllClients = async()=>{
        let respons = []
        try {
            respons = await axios.get("http://localhost:9001/clients")
            console.log(respons.data)
            return respons
        } catch (error) {
            return 0
        }
    }
    getFirstTrans = async()=>{
        let number = 8
        let respons = []
        try {
            respons = await axios.get("http://localhost:9001/trans",{
                params: {id: number}  
            });
            console.log(respons.data)
            return respons;
        } catch (error){
            console.log(error)
            return 0
        }
    } 
}
export default new Connect();