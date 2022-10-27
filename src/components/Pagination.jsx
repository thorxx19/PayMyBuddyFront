import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "../style/index.css";

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { connectService } from "../service/Connection";

const DataTablePaginatorDemo = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    connectService.getAlltransfert()
    .then(data => {
      data.data.length === 0 ? setDatas([]) : setDatas(data.data)
    })
    .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <div className="card">
        <DataTable value={datas} paginator responsiveLayout="scroll" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink " currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5, 10, 20]}>
          <Column field="idCredit.name" header="Connections" style={{ width: "25%" }} ></Column>
          <Column field="description" header="Description" style={{ width: "25%" }} ></Column>
          <Column field="amount" header="Amount" style={{ width: "25%" }}> € </Column>
        </DataTable>
      </div>
    </div>
  );
};
export default DataTablePaginatorDemo;
