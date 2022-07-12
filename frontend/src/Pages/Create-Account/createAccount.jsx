import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { registerHandler } from "../../Helpers";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import MenuAppBar from "../../Components/header";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your First Name")
    .min(3, "Enter a valid First Name")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your Last Name")
    .min(3, "Enter a valid Last Name")
    .required("Last Name is required"),
  email: yup
    .string("Enter your email address")
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Mismatch between password and Password confirmation"
    ),
});

const sx = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const CreateUser = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      delete values.passwordConfirmation;
      registerHandler(values, navigate, setStatus, setError);
    },
  });

  return (
    <>
      <MenuAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={sx} component="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="firstName"
            label="First Name"
            variant="standard"
            margin="dense"
            required
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="lastName"
            label="Last Name"
            required
            fullWidth
            variant="standard"
            margin="dense"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            id="email"
            label="Email"
            required
            fullWidth
            variant="standard"
            margin="dense"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            required
            fullWidth
            margin="dense"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            id="passwordConfirmation"
            label="Confirm Password"
            variant="standard"
            required
            fullWidth
            margin="dense"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
            error={
              formik.touched.passwordConfirmation &&
              Boolean(formik.errors.passwordConfirmation)
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
          />
          <Grid container sx={{ mt: 3, alignItems: "flex-end" }}>
            <Grid item xs>
              <Button type="submit" variant="contained">
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                Allready have an Account ? Login
              </Link>
            </Grid>
          </Grid>
          <Grid>
            {status && (
              <Alert severity="info" sx={{ mt: 5 }}>
                {status}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 5 }}>
                {error}
              </Alert>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CreateUser;
