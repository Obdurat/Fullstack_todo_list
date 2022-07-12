import React from "react";
import { TextField, Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from "@mui/material/Alert";
import { resetPassHandler } from "../../Helpers";
import { useParams } from "react-router-dom";

const sx = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const validationSchema = yup.object({
  password: yup
    .string("Enter your email address")
    .min(8, 'Password must be at least 8 characters long')
    .required("Password is required"),  
  passwordConfirmation: yup
  .string()
  .oneOf([yup.ref('password'), null], 'Mismatch between password and Password confirmation'),
});

const ForgotPass = () => {
    const [status, setStatus] = useState();
    const [error, setError] = useState();
    const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        return resetPassHandler(values.password, token, [setStatus, setError]);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={sx} component="form" onSubmit={formik.handleSubmit}>
        <TextField
          id="password"
          required
          fullWidth
          value={formik.values.password}
          label="Password"
          variant="standard"
          margin="dense"
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
          <TextField
          id="passwordConfirmation"
          required
          fullWidth
          value={formik.values.passwordConfirmation}
          label="Password confirmation"
          variant="standard"
          margin="dense"
          onChange={formik.handleChange}
          error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
          helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
        />
        <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            startIcon={formik.isSubmitting ? <CircularProgress sx={{ color: "white" }} size={24}/> : <SendIcon />}
            disabled={formik.isSubmitting}
            onClick={() => {setStatus(false); setError(false);}}
          >
            Reset Password
          </Button>
      </Box>
      {status && <Alert severity="info">{`${status}`}</Alert>}
      {error && <Alert severity="error">{`${error}`}</Alert>}
    </Container>
  );
};

export default ForgotPass;
