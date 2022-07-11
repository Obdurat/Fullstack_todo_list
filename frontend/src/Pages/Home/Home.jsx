import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import TaskIcon from "@mui/icons-material/Task";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Grid from "@mui/material/Grid";
import MenuAppBar from "../../Components/header";
import "./home.css";
import { useAuth } from "../../Context/Auth";

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  const partcilesLoaded = (container) => {
    console.log(container);
  };
  return (
    <>
      <MenuAppBar />
      <Box >        
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={partcilesLoaded}
          options={{
            background: {
              color: {
                value: "#42a5f5",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: -1,
            },
            fpsLimit: 120,
            particles: {
              number: {
                value: 200,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#1565C0",
                animation: {
                  enable: true,
                  speed: 20,
                  sync: true,
                },
              },
              opacity: {
                value: 0.8,
              },
              size: {
                value: {
                  min: 0.1,
                  max: 3,
                },
              },
              links: {
                enable: true,
                distance: 110,
                color: "#ffffff",
                opacity: 0.9,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                outModes: {
                  default: "out",
                },
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                onClick: {
                  enable: false,
                  mode: "pull",
                },
                resize: true,
              },
              modes: {
                repulse: {
                  distance: 100,
                },
                pull: {
                  quantity: 2,
                },
              },
            },
            detectRetina: true,
          }}
        />
        <Typography
          variant="h4"
          sx={{ position: "absolute", top: 160, left: 100, fontSize: '6vw' }}
          color="white"
        >
          Fullstack Todo List
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          marginTop: 0,
          justifyContent: "space-around",
          textAlign: "center",
        }}
      >
        <Grid item sx={{ width: "250px" }}>
          <AssignmentIndIcon color="primary" sx={{ width: 150, height: 100 }} />
          <Typography variant="h6" sx={{ width: 250 }}>
            Cria sua Conta !!!
          </Typography>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat
            diam, porta sed feugiat ut, finibus at elit. Fusce blandit vel mi ut
            faucibus. Cras aliquam nunc nisi, ac condimentum elit placerat et.
          </p>
        </Grid>
        <Grid item sx={{ width: "250px" }}>
          <ListAltIcon color="primary" sx={{ width: 150, height: 100 }} />
          <Typography variant="h6" sx={{ width: 250 }}>
            Liste todas suas Tarefas !!!
          </Typography>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat
            diam, porta sed feugiat ut, finibus at elit. Fusce blandit vel mi ut
            faucibus. Cras aliquam nunc nisi, ac condimentum elit placerat et.
          </p>
        </Grid>
        <Grid item sx={{ width: "250px" }}>
          <TaskIcon color="primary" sx={{ width: 150, height: 100 }} />
          <Typography variant="h6" sx={{ width: 250 }}>
            Verifique o progresso !!!
          </Typography>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat
            diam, porta sed feugiat ut, finibus at elit. Fusce blandit vel mi ut
            faucibus. Cras aliquam nunc nisi, ac condimentum elit placerat et.
          </p>
        </Grid>
      </Grid>
      <Container xs sx={{ display: 'flex' ,justifyContent: 'center', marginTop: 8 }}>
        <Button          
          variant="contained"
          onClick={() => {
            auth.logedIn.logedIn ? navigate("/task") : navigate("/login");
          }}
        >
          {auth.logedIn.logedIn ? "Continue your tasks" : "Get started !"}
        </Button>
      </Container>
    </>
  );
};

export default Home;
