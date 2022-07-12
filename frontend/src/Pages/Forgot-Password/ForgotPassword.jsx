import React from "react";
import { TextField, Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { forgotPasswordHandler } from "../../Helpers";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

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
});

const ForgotPass = () => {
  const [status, setStatus] = useState();
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      return forgotPasswordHandler(values, [setStatus, setError]);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          startIcon={
            formik.isSubmitting ? (
              <CircularProgress sx={{ color: "white" }} size={24} />
            ) : (
              <SendIcon />
            )
          }
          disabled={formik.isSubmitting}
          onClick={() => {
            setStatus(false);
            setError(false);
          }}
        >
          Send recovery mail
        </Button>
      </Box>
      {status && <Alert severity="info">{status}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default ForgotPass;
