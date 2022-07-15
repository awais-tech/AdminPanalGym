import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import App from "./App";
import UerServices from "./Services/services/UserServices";
import Swal from "sweetalert2";
import { url } from "./Services/services/url";
import { useNavigate } from "react-router-dom";
import DetailsIcon from "@mui/icons-material/Details";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from '@mui/icons-material/Delete';
import bussnessServices from "./Services/services/bussnessuser";
const BussnessA = () => {
  const [user, setuser] = React.useState([]);
  const navigate = useNavigate();
  const deleteS = (id,users) => {
    bussnessServices.deleteBussness(id).then((value) => {
      setuser(user.filter((val) => val.id != id));
      UerServices.updateuser(users, 0).then((val) => {
        Swal.fire({
          title: "Delete Succesfully",
          text: "Trainer Profile is deleted",
  
          confirmButtonText: "Ok",
        });
      });
     
    });
  };
  React.useEffect(() => {
    UerServices.getbussnessUser().then((val) => {
      console.log(val);
      setuser(
        val.bussness
          .filter((val) => val.userId.status == 1)
          .map((value) => ({
            ...value,
            id: value._id,
            _id: value.userId._id,
            firstName: value.userId.firstName,
            status: value.userId.status,
            email: value.userId.email,
            phoneno: value.userId.phoneNo,
            categoryName: value.categoryId?.name,
            userid: value.userId._id,
          }))
      );
    });
  }, []);
  const changestatus = (id, status) => {
    UerServices.updateuser(id, status).then((val) => {
      setuser(
        user.map((value) =>
          value.userId._id == id ? { ...value, status: status } : value
        )
      );
      Swal.fire({
        title: "Detail",
        text: status == 1 ? "Approved" : "Disaproved",

        confirmButtonText: "Ok",
      });
    });
  };
  const viewdetail = (a, b, c, d, e, f, g, h, i) => {
    Swal.fire({
      title: "Detail",
      html: `
          <div style="font-weight:bold">Address:${a}</div>
          <div style="font-weight:bold">specialist:${b}</div>
          <div style="font-weight:bold">fightName:${c}</div>
          <div style="font-weight:bold">fightRecord:${d}</div>
          <div style="font-weight:bold">titles:${e}</div>
          <div style="font-weight:bold">monthyFees:${f}</div>
          <div style="font-weight:bold">medal:${g}</div>
          <div style="font-weight:bold">about:${h}</div>
          
          <img src="${url}${i}" width="25%" />
      `,

      confirmButtonText: "Ok",
    });
  };
  return (
    <App>
      <Typography
        component="h1"
        variant="h4"
        sx={{ fontFamily: "fantasy", textAlign: "center", py: 3 }}
      >
        Business User
      </Typography>

      <div style={{ width: "100%" }} className="table">
        <DataGrid
          autoHeight
          style={{
            width: "100%",
            color: "#000",
          }}
          columns={[
            { field: "firstName", width: 160 },

            { field: "phoneno", width: 200 },
            { field: "email", width: 300 },

            {
              field: "actions",
              headerName: "Actions",
              width: 400,
              disableExport: true,

              renderCell: (params) => {
                return (
                  <div style={{ width: "100%" }}>
                    <RemoveRedEyeIcon
                      style={{
                        marginRight: "4px",
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "#e2c657",
                      }}
                      variant="contained"
                      onClick={() =>
                        viewdetail(
                          params.row.address,
                          params.row.specialist,
                          params.row.fightName,
                          params.row.fightRecord,
                          params.row.titles,
                          params.row.monthyFees,
                          params.row.medal,
                          params.row.about,
                          params.row.profile
                        )
                      }
                    >
                      View Detail
                    </RemoveRedEyeIcon>
                  <DeleteIcon    onClick={() => deleteS(params.row.id,params.row.userId._id)} 
                  style={{
                        marginRight: "4px",
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "#e2c657",
                      }}></DeleteIcon>
                  </div>
                );
              },
            },
          ]}
          rows={user}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      </div>
    </App>
  );
};
export default BussnessA;
