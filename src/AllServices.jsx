import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import App from "./App";
import DetailsIcon from "@mui/icons-material/Details";
import Category from "./Services/services/CategoryServices";
import SubCategory from "./Services/services/subCategorybyCategory";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { url } from "./Services/services/url";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import Services from "./Services/services/Service";

const AllServices = () => {
  const [service, setServices] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();



  React.useEffect(() => {
    try {
      Services.getService().then((val) => {
        setServices(val.userServices.map((value)=>({
          ...value,
          id: value._id,
       
        })));
     
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <App>
      <Fab color="primary" aria-label="add" onClick={(e)=>navigate("/Services")}>
  <AddIcon />
</Fab>
      <h3 style={{ textAlign: "center" }}>Service</h3>

      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          style={{
            width: "100%",
            color: "green",
          }}
          columns={[
            { field: "className", width: 160 },
            {
              field: "Year1",
              width: 300,
            },
            {
              field: "halfYear",
              width: 200,
            },

            {
              field: "QuaterYear",

              width: 150,
              filterable: false,
            },
          ]}
          rows={service}
          pageSize={8}
          rowsPerPageOptions={[5, 10, 25]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </App>
  );
};
export default AllServices;
