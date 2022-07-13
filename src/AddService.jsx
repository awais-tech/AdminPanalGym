import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App from './App';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import { CircularProgress, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useParams, useNavigate } from 'react-router-dom';
import Category from './Services/services/CategoryServices';
import QuizP from './Services/services/quiz';
import Services from './Services/services/Service';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const validationSchema = yup.object({
 
  className: yup
    .string('Enter className')

    .required('className is required'),
  Year1: yup
    .string('Enter halfYear Year1')

    .required('Year1 is is required'),
    halfYear:  yup
    .string('Enter   1/2 halfYear Year1')

    .required('Year1 is required'),
    QuaterYear:  yup
    .string('Enter  Quater halfYear Year1')

    .required('Year1 is required'),
});
export default function AddService() {
 
  const [loading, setloading] = React.useState(false);
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = React.useState({
    Year1: '',
    className: '',
    halfYear: '',
 
    QuaterYear:""
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
     

      Services.addService(values).then((val)=>{

notify("Service is added");
navigate("/allServices")
      })
    }
  });

  const notify = (error) =>
    toast(error, { position: 'top-left', type: 'error' });

  return (
    <App>
      <Wrapper>
        <div
          style={{
            margin: '7px 0',
            display: 'flex',
            height: '100vh',
            alignItems: 'center'
          }}
        >
          <Paper elevation={10} sx={{ backgroundColor: 'transparent' }}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <ShoppingBasketIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    margin: '14px 0'
                  }}
                >
                 Add Service
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    id="Year1"
                    name="Year1"
                    label="Year1"
                    value={formik.values.Year1}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.Year1 && Boolean(formik.errors.Year1)
                    }
                    helperText={
                      formik.touched.Year1 && formik.errors.Year1
                    }
                  />
                  <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    id="name"
                    name="halfYear"
                    label="halfYear"
                    value={formik.values.halfYear}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.halfYear && Boolean(formik.errors.halfYear)
                    }
                    helperText={formik.touched.halfYear && formik.errors.halfYear}
                  />
                    <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    id="name"
                    name="QuaterYear"
                    label="QuaterYear"
                    value={formik.values.QuaterYear}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.QuaterYear && Boolean(formik.errors.QuaterYear)
                    }
                    helperText={formik.touched.QuaterYear && formik.errors.QuaterYear}
                  />
                  <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    id="className"
                    name="className"
                    label="className"
                    value={formik.values.className}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.className && Boolean(formik.errors.className)
                    }
                    helperText={formik.touched.className && formik.errors.className}
                  />
                 

                  {/* <CircularProgress size={10} /> */}
                  <Button
                    style={{ marginTop: '10px' }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      margin: '14px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Container>
          </Paper>
        </div>
      </Wrapper>
    </App>
  );
}