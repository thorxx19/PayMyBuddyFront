import React from "react";
import Connection from "../service/Connection";


class Transfert extends React.Component{
    constructor(props){
        super(props)
        this.state = {transfert: [], connect : [], value : 'default'} 
        this.handleChange = this.handleChange.bind(this); 
        
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }

    componentDidMount(){
        Connection.getAllTransfer().then((respons)=>{
            respons === 0 ? this.setState({transfert: []}) : this.setState({transfert: respons})
        })
        Connection.getConnectById().then((responsConnect)=>{
            responsConnect === 0 ? this.setState({connect: []}) : this.setState({connect : responsConnect.data})
        })
    }

    render (){
        return (
            <div >
                <p className="text-start">Home  /  Transfer</p>
                <div className="container col-8">
                <div className="row justify-content-between my-3">
                    <h3 className="col-3">Send Money</h3>
                    <button type="button" className="btn btn-primary col-3">Add Connection</button>
                </div>
                
                <div>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value='default'>Select A Connection</option>
                        {this.state.connect.map((con)=>
                           <option key={`${con.id}`} value={con.idDeux.name}>{con.idDeux.name}</option>
                        )}
                    </select>
                        
                    
                    <input type="number" name="" id="" className="mx-2" placeholder=""/>
                    <button type="button" className="btn btn-success">Pay</button>
                </div>
                <table className="table table-striped my-5 table-borderless">
                <thead>
                    <tr className="table-success">
                        <td>Connections</td>
                        <td>Description</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transfert.map((trans)=>
                    <tr key={`${trans.id}`}>
                        <td>{`${trans.idCredit.name}`}</td>
                        <td>{`${trans.description}`}</td>
                        <td>{`${trans.amount}`}</td>
                    </tr>
                    )}
                    
                </tbody>
            </table>
            </div>
            </div>

        );

    }
}
export default Transfert;