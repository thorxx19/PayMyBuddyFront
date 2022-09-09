import React from "react";
import Connection from "../service/Connection";

class Transfert extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {transfert: []}  
    }
    connect=()=>{
        Connection.getAllTransfer().then((respons)=>{
            respons === 0 ? this.setState({transfert: []}) : this.setState({transfert: respons})
        })
    }
    render (){
        return (
            <div>
                <h1>Transfert</h1>
                <table className="table table-striped my-5">
                <thead>
                    <tr>
                        <td>Connections</td>
                        <td>Description</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transfert.map((
                        trans)=>
                    <tr key={`${trans.id}`}>
                        <td>{trans.firstName}</td>
                        <td>{trans.lastName}</td>
                        <td>{trans.address}</td>
                    </tr>
                    )}
                    
                </tbody>
            </table>
            </div>

        );

    }
}
export default Transfert;