import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { loginHandler } from "../../Helpers";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import * as yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../../Context/Auth";
import MenuAppBar from "../../Components/header";

const sx = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const validationSchema = yup.object({
  email: yup
    .string("Enter your email address")
    .email("Enter a valid Email address")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password must have a minimum of 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState({
    message: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      return loginHandler(values, navigate, setError, auth);
    },
  });

  return (
    <>
      <MenuAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {console.log(auth)}
        <Box sx={sx} component="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            required
            fullWidth
            value={formik.values.email}
            label="Email Address"
            variant="standard"
            margin="dense"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            required
            fullWidth
            type="password"
            value={formik.values.password}
            label="Enter your password"
            variant="standard"
            margin="dense"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Grid>
            {error.message !== "" && (
              <Alert severity="error" sx={{ mt: 5 }}>
                {error.message}
              </Alert>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Login;
