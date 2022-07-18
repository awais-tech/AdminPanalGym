import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "../App";
import { useFormik } from "formik";
import * as yup from "yup";
import UerServices from "../Services/services/UserServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import emailjs, { send } from "@emailjs/browser";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const validation = yup.object({
  name: yup
    .string()
    .min(3, "name must be 3 characters at minimum")
    .max(10, "name must be 11 characters at max")
    .required("Name is Required"),
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  LastName: yup
    .string()
    .min(3, "LastName must be 3 characters at minimum")
    .required("LastName is required"),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  phoneNo: yup
    .string()
    .min(11, "PhoneNo must be 11 characters at minimum")
    .required("PhoneNo is required"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      LastName: "",
      confirmPassword: "",
      phoneNo: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      // 625e92f6c79665679583d09b
      // console.log(values);
      try {
        const data = await UerServices.Register(
          values.name,
          values.LastName,
          values.email,
          values.password,
          values.confirmPassword,
          values.phoneNo,
          "trainer"
        );
        toast.success("Account has been created");
        navigate(-1);
        emailjs
          .send(
            "service_jwf5a3f",
            "template_rmrcsnl",
            values,
            "niEjuz2Sc6Xj_g_4j"
          )
          .then(
            (result) => {
              console.log(result);
              console.log(result.text);
            },
            (error) => {
              console.log(error);
              console.log(error.text);
            }
          );
      } catch (e) {
        toast.error(e.error);
      }
    },
  });

  return (
    <App>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontFamily: "fantasy" }}
            >
              Create Trainer
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="family-name"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    id="LastName"
                    label="LastName"
                    name="LastName"
                    autoComplete="LastName"
                    value={formik.values.LastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.LastName && Boolean(formik.errors.LastName)
                    }
                    helperText={
                      formik.touched.LastName && formik.errors.LastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="phoneNo"
                    label="phoneNo"
                    type="phoneNo"
                    id="phoneNo"
                    value={formik.values.phoneNo}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.phoneNo && Boolean(formik.errors.phoneNo)
                    }
                    helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="custom_btn"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ maxWidth: "400px", margin: "13px" }}
                >
                  Create Account
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </App>
  );
}
