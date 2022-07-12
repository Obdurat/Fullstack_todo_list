import React, { useState } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { onChangeFormHandler, addTask, updateTaskHandler } from "../Helpers";
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

export const ModalComponent = (props) => {
  const {
    isOpen: { status, edit },
    setIsOpen,
  } = props;
  const [task, setTask] = useState({ task: "" });
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setIsOpen({ status: true, edit });
  const handleClose = () => {
    setTask({ task: "" });
    setIsOpen({ status: false, edit: false });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: [300, 400],
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <IconButton
        color="primary"
        onClick={handleOpen}
        size="large"
        sx={{ position: "fixed", bottom: "10px", right: "20px" }}
      >
        <AddCircleRoundedIcon fontSize="large" sx={{ width: "50px", height: "50px" }} />
      </IconButton>

      <Modal open={status} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            id="modal-modal-title"
            sx={{ textAlign: "center" }}
          >
            {edit ? 'Edit Task' : 'Add Task'}
          </Typography>
          <Box
            id="modal-modal-description"
            style={{ margin: "5px", alignItems: "center" }}
            component="form"
          >
            <TextField
              id="task"
              variant="standard"
              label={edit ? "Update task" : "Enter a Task"}
              required
              fullWidth
              value={edit ? edit.task : task.task}
              autoComplete={'off'}
              onChange={({ target }) => {
                if (edit) {
                  setIsOpen({ status, edit: { ...edit, task: target.value } });
                  console.log(edit);
                  return;
                }
                onChangeFormHandler(target, task, setTask);
              }}
            />
            <Grid container sx={{ justifyContent: "space-around", mt: 2 }}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={loading ? <CircularProgress sx={{ color: "success" }} size={24}/> : <SendIcon />}
                  onClick={ async () => {
                    if (edit) {
                      await updateTaskHandler(edit.id, {
                        task: edit.task,
                        completed: edit.completed,
                      }, edit.callback, edit.counter, setLoading);
                      handleClose();
                      return;
                    }
                    await addTask(task, setLoading);
                    handleClose();
                  }}
                >
                  { edit ? 'Update Task': 'Add Task' }
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
