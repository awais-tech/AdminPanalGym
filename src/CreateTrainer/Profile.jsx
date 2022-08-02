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
import ImageUploading from "react-images-uploading";
import App from "../App";
import { useFormik } from "formik";
import * as Yup from "yup";
import UerServices from "../Services/services/UserServices";
import { useNavigate, useParams } from "react-router-dom";
import bussnessServices from "../Services/services/bussnessuser";
import { toast } from "react-toastify";

const theme = createTheme();
const validation = Yup.object({
  address: Yup.string().required("Address is required"),
  specialist: Yup.string().required("specialist is required"),
  fightName: Yup.string().required("fightName is required"),
  fightRecord: Yup.number()
    .positive()
    .required("fightRecord is required")
    .typeError("you must specify a number"),
  titles: Yup.string().required("title is required"),
  monthyFees: Yup.number()
    .positive()
    .min(1, "  Fees must be greater then 0")
    .required()
    .typeError("you must specify a number")

    .required("monthyFees is required"),
  medal: Yup.string().required("medal is required"),
  about: Yup.string().required("about is required"),
});

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: "",
      specialist: "",
      fightName: "",

      fightRecord: "",

      titles: "",
      monthyFees: "",
      medal: "",
      about: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      // 625e92f6c79665679583d09b
      console.log(values);
      try {
        const formData = new FormData();

        formData.append("address", values.address);
        formData.append("specialist", values.specialist);
        formData.append("fightName", values.fightName);
        formData.append("fightRecord", values.fightRecord);
        formData.append("titles", values.titles);
        formData.append("monthyFees", values.monthyFees);
        formData.append("medal", values.medal);
        formData.append("userId", id);
        formData.append("about", values.about);
        formData.append("profile", images[0].file);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        bussnessServices.addBussness(formData, config).then(() => {
          UerServices.updateuser(id, 1).then((val) => {
            navigate(-1);
          });
        });

        navigate(-1);
        toast.success("Account has been created");
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
              Create Profile
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
                    name="address"
                    required
                    fullWidth
                    id="address"
                    label="address"
                    autoFocus
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    id="specialist"
                    label="specialist"
                    name="specialist"
                    autoComplete="family-name"
                    value={formik.values.specialist}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.specialist &&
                      Boolean(formik.errors.specialist)
                    }
                    helperText={
                      formik.touched.specialist && formik.errors.specialist
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    id="fightName"
                    label="fightName"
                    name="fightName"
                    autoComplete="fightName"
                    value={formik.values.fightName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fightName &&
                      Boolean(formik.errors.fightName)
                    }
                    helperText={
                      formik.touched.fightName && formik.errors.fightName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="fightRecord"
                    label="fightRecord"
                    type="fightRecord"
                    id="fightRecord"
                    autoComplete="new-password"
                    value={formik.values.fightRecord}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fightRecord &&
                      Boolean(formik.errors.fightRecord)
                    }
                    helperText={
                      formik.touched.fightRecord && formik.errors.fightRecord
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="titles"
                    label="titles"
                    type="titles"
                    id="titles"
                    value={formik.values.titles}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.titles && Boolean(formik.errors.titles)
                    }
                    helperText={formik.touched.titles && formik.errors.titles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="medal"
                    label="Experience"
                    type="medal"
                    id="medal"
                    value={formik.values.medal}
                    onChange={formik.handleChange}
                    error={formik.touched.medal && Boolean(formik.errors.medal)}
                    helperText={formik.touched.medal && formik.errors.medal}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="about"
                    label="about"
                    type="about"
                    id="about"
                    value={formik.values.about}
                    onChange={formik.handleChange}
                    error={formik.touched.about && Boolean(formik.errors.about)}
                    helperText={formik.touched.about && formik.errors.about}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="monthyFees"
                    label="Per Hour Fees"
                    type="monthyFees"
                    id="monthyFees"
                    value={formik.values.monthyFees}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.monthyFees &&
                      Boolean(formik.errors.monthyFees)
                    }
                    helperText={
                      formik.touched.monthyFees && formik.errors.monthyFees
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ImageUploading
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper mt-3">
                        <button
                          type="button"
                          className="btn btn-info custom_btn"
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Click or Drop here
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-info custom_btn"
                          onClick={onImageRemoveAll}
                        >
                          Remove all images
                        </button>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image["data_url"]} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                              <button
                                type="button"
                                className="btn custom_btn"
                                onClick={() => onImageUpdate(index)}
                                style={{ marginBottom: "10px" }}
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                className="btn custom_btn"
                                onClick={() => onImageRemove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="custom_btn"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, maxWidth: "400px" }}
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
