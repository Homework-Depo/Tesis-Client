import { useEffect, useState, Fragment } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  useMediaQuery,
  useTheme,
  Grid,
  IconButton,
  Box,
  Tooltip,
  Paper,
  Button
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLoaderData, useParams } from "react-router-dom";
import Client from "./models/Client";
import { Edit } from "@mui/icons-material";

type Labels = {
  [key: string]: string
}

export default function DetailsClientComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(!isMobile);
  const loaderData = useLoaderData() as Client;
  const params = useParams();

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const labels: Labels = {
    status: 'Estado',
    name: 'Nombres',
    lastName: 'Apellidos',
    dni: 'DNI',
    phone: 'Teléfono',
    email: 'Correo'
  }

  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          padding: 1,
          paddingRight: 3,
          marginBottom: 2,
        }}
      >
        <Button
          component={Link}
          to={`/clientes/${params.id}/editar`}
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            width: 'auto',
            height: 35,
          }}
          variant="contained"
          color="primary"
          startIcon={<Edit />}
        >
          Editar
        </Button>
        <Button
          component={Link}
          to={`/clientes/${params.id}/editar`}
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
            width: 'auto',
            height: 35,
          }}
          variant="contained"
          color="primary"
        >
          <Edit />
        </Button>
      </Paper >
      {loaderData && (
        <Accordion expanded={expanded} onChange={handleChange}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight={700}>DETALLES</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} alignItems="center">
              {Object.entries(loaderData).map(([key, value]) => (
                <Fragment key={key}>
                  <Grid item xs={12} sm={6} lg={2}>
                    <Typography fontWeight={600}>{labels[key]}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={2}>
                    <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                      <Tooltip title={<span>{value}</span>} arrow>
                        <Typography noWrap>
                          {key === 'status' ? (value ? 'Activo' : 'Inactivo') : value}
                        </Typography>
                      </Tooltip>
                      {key !== 'status' && (
                        <IconButton onClick={() => handleCopyToClipboard(value)}>
                          <ContentCopyIcon />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )
      }
    </>
  )
}
