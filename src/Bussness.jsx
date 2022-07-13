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
import AddBoxIcon from "@mui/icons-material/AddBox";
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
            { field: "firstName", width: "200" },

            { field: "phoneNo", width: "200" },
            { field: "email", width: "200" },
            { field: "lastName", width: "200" },
            {
              field: "actions",
              headerName: "Actions",
              width: "200",
              disableExport: true,

              renderCell: (params) => {
                return (
                  <Button
                    onClick={() => navigate("/Profile/" + params.row._id)}
                  >
                    <AddBoxIcon sx={{ color: "#e2c657" }} />
                  </Button>
                );
              },
            },
          ]}
          rows={user}
          pageSize={8}
          rowsPerPageOptions={[8]}
          // components={{
          //   Toolbar: GridToolbar,
          // }}
        />
      </div>
    </App>
  );
};
export default BussnessUser;
