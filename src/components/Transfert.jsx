import React from "react";
import Connection from "../service/Connection";


class Transfert extends React.Component{
    constructor(props){
        super(props)
        this.state = {transfert: [], connect : [], value : 0, valueCount : 0, id : 0} 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChangeCount = this.handleChangeCount.bind(this);
        
     
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    handleChangeCount(event){
        this.setState({valueCount: event.target.value})
    }
    
    handleSubmit(event) {
        if (this.state.value !== 0 && this.state.valueCount !== 0) {
            Connection.postTransfert(this.state.id,this.state.value,this.state.valueCount).then((respons)=>{
                respons === "no save" ? console.log("no save") : window.location.reload(false)
            })
        }
        event.preventDefault();
    }

    componentDidMount(){



        Connection.getAllTransfer().then((respons)=>{
            respons === 0 ? this.setState({transfert: []}) : this.setState({transfert: respons})
        })
        Connection.getConnectById().then((responsConnect)=>{
            responsConnect === 0 ? this.setState({connect: []}) : this.setState({connect : responsConnect.data})
            responsConnect === 0 ? this.setState({id: 0}) : this.setState({id : responsConnect.data[0].idUn.id})
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
                    <form onSubmit={this.handleSubmit}>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value={0}>Select A Connection</option>
                        {this.state.connect.map((con)=>
                           <option key={con.idDeux.id} value={con.idDeux.id}>{con.idDeux.name}</option>
                        )}
                    </select>
                        
                    
                    <input type="number" min={0} max={100} step={1} value={this.state.valueCount} onChange={this.handleChangeCount} className="mx-2"/>
                    <input type="submit" value="Pay" className="btn btn-success"/>
                    </form>
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