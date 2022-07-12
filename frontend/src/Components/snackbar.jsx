import React from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';

const SnackBar = (props) => {
  const open = props.open;
  const setOpen = props.setOpen;

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen()}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={Boolean(open)}
      autoHideDuration={3000}
      onClose={() => setOpen()}
      message={open}
      action={action}
    />
  );
};

export default SnackBar;
