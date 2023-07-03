import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function ServerError() {
  const navigate = useNavigate();

  const handleClick = () => {
    throw navigate("/", { replace: true });
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100dvh"}
      sx={{
        backgroundColor: "background.default"
      }}
    >

      <Box
        padding={{
          xs: 2,
          md: 4
        }}
        width={"auto"}
        height={"auto"}
      >
        {/* <Paper elevation={10}> */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"row"}
          maxWidth={450}
          gap={2}
        >
          <Typography component={"div"} display={"flex"} variant="h1" fontWeight={700} color={"primary.main"}>
            5
            <Typography fontWeight={700} color={"black"} variant="h1">
              0
            </Typography>
            <Typography fontWeight={700} color={"black"} variant="h1">
              0
            </Typography>
          </Typography>
          <Typography variant="h1" fontWeight={700}>|</Typography>
          <Typography variant="body1" fontWeight={500}>¡Ups! Ha ocurrido un error inesperado. Por favor intentelo de nuevo o comuniquese con el admnistrador.</Typography>
        </Box>
        <Box
          display={"flex"}
          mt={2}
          justifyContent={"center"}
        >
          <Button
            onClick={handleClick}
            startIcon={<ArrowBackIosNewIcon />}
            variant="contained">
            Volver
          </Button>
        </Box>
        {/* </Paper> */}
      </Box>
    </Box >
  );
}