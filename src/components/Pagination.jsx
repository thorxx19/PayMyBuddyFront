import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "../style/index.css";
import React, { useState, useEffect } from "react";
import { DataTable} from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";


import { connectService } from "../service/Connection";
import { accountService } from "../service/account.service";



const DataTablePaginatorDemo = () => {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    connectService.getAlltransfert()
    .then(data => {
      if (data.request.status === 200) {
        setDatas(data.data.datas)
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        accountService.logout();
        navigate('/auth/login')
      }
    });
  }, []);

  return (
    <div>
      <div className="card">
        <DataTable value={datas} paginator responsiveLayout="scroll" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5, 10, 20]}>
          <Column field="idCredit.name" header="Connections" style={{ width: "25%" }} ></Column>
          <Column field="description" header="Description" style={{ width: "25%" }} ></Column>
          <Column field={"amount"} header="Amount" style={{ width: "25%" }}></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default DataTablePaginatorDemo;
