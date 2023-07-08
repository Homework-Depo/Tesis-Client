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
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLoaderData, useParams } from "react-router-dom";
import Client from "./models/Client";
import { Edit, Work, MoreVert } from "@mui/icons-material";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      <Box display={"flex"} flexDirection={"row-reverse"} mb={1}>
        <Button
          variant="contained"
          endIcon={<MoreVert />}
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            }
          }}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Opciones
        </Button>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            }
          }}
        >
          <MoreVert />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose} component={Link} to={`/casos/nuevo?clientId=${params.id}`}>
            <ListItemIcon>
              <Work fontSize="small" />
            </ListItemIcon>
            <ListItemText>Nuevo Caso</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to={`/clientes/${params.id}/editar`}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      {loaderData && (
        <Accordion elevation={3} expanded={expanded} onChange={handleChange}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight={500}>DETALLES DEL CLIENTE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} alignItems="center">
              {Object.entries(loaderData).map(([key, value]) => (
                <Fragment key={key}>
                  <Grid item xs={12} sm={6} lg={2}>
                    <Typography fontWeight={500}>{labels[key]}</Typography>
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
