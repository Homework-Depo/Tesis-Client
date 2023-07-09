import { useEffect, useState } from "react";
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
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Client from "./models/Client";
import { Edit, Work, MoreVert } from "@mui/icons-material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import LawBranch from "./models/LawBranch";
import LawMatter from "./models/LawMatter";
import User from "./models/User";

export default function DetailsClientComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(!isMobile);
  const loaderData: Client = useLoaderData() as Client;
  console.log(loaderData);
  const params = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 65, width: 90 },
    {
      field: 'lawBranch', headerName: 'Rama', flex: 1,
      valueGetter: (params) => (params.value as LawBranch).name,
    },
    {
      field: 'lawMatter', headerName: 'Materia', flex: 1,
      valueGetter: (params) => (params.value as LawMatter).name,
    },
    {
      field: 'status', headerName: 'Estado', flex: 1,
      valueFormatter: (params) => (params.value ? 'Activo' : 'Inactivo')
    },
    {
      field: 'users', headerName: 'Encargado/s', flex: 1,
      valueFormatter: (params) => params.value.map((user: User) => user.name).join(', ')
    }
  ];

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
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Estado</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography noWrap fontWeight={500} color={loaderData.status ? "success.main" : "error"}>{loaderData.status ? "Activo" : "Inactivo"}</Typography>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Nombres</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.name} arrow>
                      <Typography noWrap>{loaderData.name}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.name)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Apellidos</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.lastName} arrow>
                      <Typography noWrap>{loaderData.lastName}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.lastName)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>DNI</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.dni} arrow>
                      <Typography noWrap>{loaderData.dni}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.dni)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Teléfono</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.phone} arrow>
                      <Typography noWrap>{loaderData.phone}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.phone)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Correo Electrónico</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.email} arrow>
                      <Typography noWrap>{loaderData.email}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.email)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )
      }
      <Paper elevation={3} sx={{ padding: 2 }}>
        <DataGrid
          autoHeight
          columns={columns}
          rows={loaderData.cases}
          slots={{ toolbar: GridToolbar }}
          hideFooterSelectedRowCount
          onRowDoubleClick={(params) => {
            const id = params.id;
            navigate(`/casos/${id}`);
          }}
        />
      </Paper>
    </>
  )
}
