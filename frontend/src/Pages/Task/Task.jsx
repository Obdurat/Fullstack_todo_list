import React, { useEffect, useState } from "react";
import { getTasks, updateTaskHandler, deleteTaskHandler } from "../../Helpers";
import { ModalComponent } from "../../Components/modal";
import { Paper, Typography, Button, Grid } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Task = () => {
  const [tasks, setTasks] = useState();
  const [isOpen, setIsOpen] = useState({ status: false, edit: false });
  const [eventCounter, setEventCounter] = useState(0);

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, [isOpen, eventCounter]);

  return (
    <>
      <div>
        {tasks ? (
          <div>
            {tasks.map((t) => (
              <Paper
                id={t.id}
                elevation={2}
                sx={{
                  verticalAlign: "middle",
                  flexDirection: "row",
                }}
                key={t.id}
              >
                <Grid container>
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
                          eventCounter
                        );
                      }}
                    >
                      <CheckRoundedIcon />
                    </Button>
                  </Grid>
                  <Grid item sx={{ verticalAlign: "middle" }}>
                    <Typography sx={{ mb: 2 }}>{t.task}</Typography>
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
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() =>
                        deleteTaskHandler(t.id, setEventCounter, eventCounter)
                      }
                    >
                      <DeleteForeverRoundedIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </div>
        ) : (
          <Stack spacing={0}>
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
          </Stack>
        )}
      </div>
      <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Task;
