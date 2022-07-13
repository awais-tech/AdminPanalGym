import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import App from "./App";
import UerServices from "./Services/services/UserServices";
import Swal from "sweetalert2";
import { url } from "./Services/services/url";
import { useNavigate } from "react-router-dom";
import DetailsIcon from "@mui/icons-material/Details";

const BussnessUser = () => {
  const [user, setuser] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    UerServices.getbussness().then((val) => {
      console.log(val);
      setuser(
        val.user
          .filter((val) => val.status == 0)
          .map((value) => ({
            ...value,
            id: value._id,
         

     
          }))
       
      );
    });
  }, []);
  // const changestatus = (id, status) => {
  //   UerServices.updateuser(id, status).then((val) => {
  //     setuser(
  //       user.map((value) =>
  //         value.userId._id == id ? { ...value, status: status } : value
  //       )
  //     );
  //     Swal.fire({
  //       title: "Detail",
  //       text: status == 1 ? "Approved" : "Disaproved",

  //       confirmButtonText: "Ok",
  //     });
  //   });
  // };
  // const viewdetail = (a, b, c, d, e, f, g, h, i) => {
  //   Swal.fire({
  //     title: "Detail",
  //     html: `
  //         <div style="font-weight:bold">Address:${a}</div>
  //         <div style="font-weight:bold">specialist:${b}</div>
  //         <div style="font-weight:bold">fightName:${c}</div>
  //         <div style="font-weight:bold">fightRecord:${d}</div>
  //         <div style="font-weight:bold">titles:${e}</div>
  //         <div style="font-weight:bold">monthyFees:${f}</div>
  //         <div style="font-weight:bold">medal:${g}</div>
  //         <div style="font-weight:bold">about:${h}</div>
          
  //         <img src="${url}${i}" width="25%" />
  //     `,

  //     confirmButtonText: "Ok",
  //   });
  // };
  return (
    <App>
      <h4 style={{ textAlign: "center" }}>Business User</h4>

      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          style={{
            width: "100%",
            color: "green",
          }}
          columns={[
            { field: "firstName", width: 190 },

            { field: "phoneNo", width: 200 },
            { field: "email", width: 300 },
            { field: "lastName", width: 100 },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 200,
              disableExport: true ,

              renderCell: (params) => {
                return (
                  <Button onClick={()=>navigate("/Profile/"+params.row._id)}>Add Profile</Button>
                )}}
 


        
          ]}
          rows={user}
          pageSize={8}
          rowsPerPageOptions={[8]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </App>
  );
};
export default BussnessUser;
