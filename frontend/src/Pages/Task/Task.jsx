import React, { useEffect, useState } from "react";
import { getTasks, updateTaskHandler, deleteTaskHandler } from "../../Helpers";
import { ModalComponent } from "../../Components/modal";
import { Paper, Typography, Button, Grid } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import MenuAppBar from "../../Components/header";
import { useAuth } from "../../Context/Auth";
import Container from "@mui/material/Container";

const Task = () => {
  const auth = useAuth();
  const [tasks, setTasks] = useState();
  const [isOpen, setIsOpen] = useState({ status: false, edit: false });
  const [eventCounter, setEventCounter] = useState(0);

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, [isOpen, eventCounter]);

  return (
    <>
      <div>
        <MenuAppBar />
        {console.log(auth)}
        {tasks ? (
          <Container sx={{ marginTop: 5 }}>
            {tasks.map((t, index) => (              
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
                            eventCounter
                          );
                        }}
                      >
                        <CheckRoundedIcon />
                      </Button>
                    </Grid>
                    <Grid item xs >
                      <Typography >{t.task}</Typography>
                    </Grid>
                    <Grid item >
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
                          deleteTaskHandler(t.id, setEventCounter, eventCounter)
                        }
                      >
                        <DeleteForeverRoundedIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

            ))}
          </Container>
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
