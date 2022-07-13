import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';

import App from './App';

import { Navigate, useParams, useNavigate } from 'react-router-dom';
import bookings from './Services/services/Booking';
import Swal from 'sweetalert2';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
const AdminBooking = () => {
  const [booking, setBooking] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const viewUser = (user) => {
    Swal.fire({
      title: 'Detail',
      html: `
          <div style="font-weight:bold">name:${user.Uname}</div>
          <div style="font-weight:bold">email:${user.Uemail}</div>
         
         
       
         
      `,

      confirmButtonText: 'Ok'
    });
  };

  React.useEffect(() => {
    try {
      bookings.getAdminBooking().then((val) => {
        console.log(val);
        setBooking(
          val.Booking.map((value) => ({
            ...value,
            id: value._id,
         
            Uname: value?.UserId?.firstName,
            Uemail: value.UserId?.email
          }))
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  return (
    <App>
      <h3 style={{ textAlign: 'center' }}>Booking</h3>

      <div style={{ width: '100%', backgroundColor: '#D2E1E3' }}>
        <DataGrid
          autoHeight
          style={{
            width: '100%',
            color: 'green'
          }}
          columns={[
            {
              field: 'Price',
              width: 200
            },
            {
              field: 'Address',
              width: 300
            },
            {
              field: 'Building',
              width: 200
            },

            {
              field: 'City',
              width: 200
            },
            {
              field: 'State',
              width: 100
            },
            {
              field: 'Message',
              width: 200
            },
            {
              field: 'Package',
              width: 200
            },
            {
              field: 'class',
              width: 200
            },
          
            
          
            {
              field: 'Action',
              headerName: 'Action',
              width: 400,
              filterable: false,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                  
                    <AccessibilityNewIcon
                      style={{ marginRight: '4px',fontSize:"30px",cursor:"pointer" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => viewUser(params.row)}
                    >
                      View User
                    </AccessibilityNewIcon>
                  </div>
                );
              }
            }
          ]}
          rows={booking}
          pageSize={8}
          rowsPerPageOptions={[5, 10, 25]}
          components={{
            Toolbar: GridToolbar
          }}
        />
      </div>
    </App>
  );
};
export default AdminBooking;
