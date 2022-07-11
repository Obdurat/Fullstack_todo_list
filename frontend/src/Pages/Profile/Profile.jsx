import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import { updateUserHandler } from "../../Helpers";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../Context/Auth";
import MenuAppBar from "../../Components/header";
import Alert from "@mui/material/Alert";

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
  avatar: yup.string("Enter your avatar URL").url("Enter a valid URL"),
});

const Profile = () => {
  const auth = useAuth();
  const [status, setStatus] = useState();

  const formik = useFormik({
    initialValues: auth.logedIn.user,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await updateUserHandler(values, setStatus);
    },
  });

  return (
    <div>
      <MenuAppBar />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ marginTop: 5, justifyContent: "center" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt="User Image"
            src={formik.values.avatar}
            sx={{ width: 130, height: 130 }}
          />
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit}>
          {Object.keys(auth.logedIn.user).map((field) => (
            <TextField
              id={field}
              label={
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/N/, " N")
              }
              variant="standard"
              margin="dense"
              required
              fullWidth
              onChange={formik.handleChange}
              value={formik.values[`${field}`]}
              error={
                formik.touched[`${field}`] && Boolean(formik.errors[`${field}`])
              }
              helperText={
                formik.touched[`${field}`] && formik.errors[`${field}`]
              }
            />
          ))}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Update
          </Button>
        </Box>
        {status && (
          <Alert severity="info" sx={{ marginTop: 2 }}>
            {status + " Login again to see the changes"}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Profile;
