import React, { useState } from "react";
import { updateTaskHandler, deleteTaskHandler } from "../Helpers";
import { Paper, Typography, Button, Grid } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CircularProgress from "@mui/material/CircularProgress";

const Tasks = (props) => {
  const t = props.task;
  const setIsOpen = props.setIsOpen;
  const setEventCounter = props.setEventCounter;
  const eventCounter = props.eventCounter;
  const [completeLoading, setCompleteLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <Paper
      id={t.id}
      elevation={8}
      sx={{
        flexDirection: "row",
        mb: 2,
      }}
      key={t.id}
    >
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item>
          <Button
            color={t.completed ? "success" : "error"}
            onClick={() => {
              const { id, task, completed } = t;
              const body = { task, completed: !completed };
              updateTaskHandler(
                id,
                body,
                setEventCounter,
                eventCounter,
                setCompleteLoading
              );
            }}
          >
            {completeLoading ? (
              <CircularProgress sx={{ color: "success" }} size={24} />
            ) : (
              <CheckRoundedIcon />
            )}
          </Button>
        </Grid>
        <Grid item xs>
          <Typography>{t.task}</Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() =>
              setIsOpen({
                status: true,
                edit: {
                  id: t.id,
                  task: t.task,
                  completed: t.completed,
                  callback: setEventCounter,
                  counter: eventCounter,
                },
              })
            }
          >
            <EditRoundedIcon />
          </Button>
          <Button
            onClick={() =>
              deleteTaskHandler(t.id, setEventCounter, eventCounter, setDeleteLoading)
            }
          >
            {deleteLoading ? (
              <CircularProgress sx={{ color: "success" }} size={24} />
            ) : (
              <DeleteForeverRoundedIcon />
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Tasks;
