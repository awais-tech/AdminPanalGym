import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Fab, Typography } from "@mui/material";

import App from "./App";

import { Navigate, useParams, useNavigate } from "react-router-dom";
import bookings from "./Services/services/Booking";
import Swal from "sweetalert2";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Booking = () => {
  const [booking, setBooking] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const viewUser = (user) => {
    console.log(user);
    Swal.fire({
      title: "Detail",
      html: `
          <div style="font-weight:bold">name:${user.Uname}</div>
          <div style="font-weight:bold">email:${user.Uemail}</div>
         
         
       
         
      `,

      confirmButtonText: "Ok",
    });
  };
  const viewdetail = (user) => {
    Swal.fire({
      title: "Detail",
      html: `
          <div style="font-weight:bold">name:${user.Sname}</div>
          <div style="font-weight:bold">Detail:${user.Sdetail}</div>
          <div style="font-weight:bold">Service Price:${user.Sprice}</div>
         
       
         
      `,

      confirmButtonText: "Ok",
    });
  };
  React.useEffect(() => {
    try {
      bookings.getBooking().then((val) => {
        console.log(val);
        setBooking(
          val.Booking.map((value) => ({
            ...value,
            id: value._id,

            Uname: value?.UserId?.firstName,
            Uemail: value.UserId?.email,
          }))
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  return (
    <App>
      <Typography
        component="h1"
        variant="h4"
        sx={{ fontFamily: "fantasy", textAlign: "center", py: 3 }}
      >
        Booking
      </Typography>

      <div style={{ width: "100%" }} className="table">
        <DataGrid
          autoHeight
          style={{
            width: "100%",
            color: "#000",
          }}
          columns={[
            {
              field: "Name",
              width: 200,
            },
            {
              field: "Price",
              width: 200,
            },
            {
              field: "Address",
              width: 200,
            },
            {
              field: "City",
              width: 200,
            },

            {
              field: "Message",
              width: 200,
            },
            {
              field: "Date",
              width: 200,
            },
            {
              field: "Time",
              width: 200,
            },
            {
              field: "Status",
              headerName: "Status",
              width: 200,
              filterable: false,

              renderCell: (params) => {
                return (
                  <div style={{ width: "100%" }}>
                    {params.row.status == 0
                      ? "Requested"
                      : params.row.status == 1
                      ? "Payment Pending"
                      : params.row.status == 2
                      ? "Rejected"
                      : "Canceled"}
                  </div>
                );
              },
            },
          ]}
          rows={booking}
          pageSize={8}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
    </App>
  );
};
export default Booking;
