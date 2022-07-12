import React, { useEffect, useState } from "react";
import { getTasks } from "../../Helpers";
import { ModalComponent } from "../../Components/modal";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import MenuAppBar from "../../Components/header";
import Container from "@mui/material/Container";
import Tasks from "../../Components/tasks";

const Task = () => {
  const [tasks, setTasks] = useState();
  const [isOpen, setIsOpen] = useState({ status: false, edit: false });
  const [eventCounter, setEventCounter] = useState(0);

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, [isOpen, eventCounter]);

  return (
    <>
      <MenuAppBar />
      {tasks ? (
        <Container sx={{ marginTop: 5 }}>
          {tasks.map((t) => (
            <Tasks
              task={t}
              setIsOpen={setIsOpen}
              setEventCounter={setEventCounter}
              eventCounter={eventCounter}
            />
          ))}
        </Container>
      ) : (
        <Stack spacing={0}>
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
        </Stack>
      )}
      <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Task;
