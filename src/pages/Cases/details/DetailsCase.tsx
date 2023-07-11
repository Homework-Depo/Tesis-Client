import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery, useTheme, Paper, Tab, Tabs, Tooltip, IconButton } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Case from "./models/Case";
import { Form, Link, redirect, useLoaderData, useNavigate, useParams, useSubmit } from "react-router-dom";
import { Edit, MoreVert } from "@mui/icons-material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { createRef, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import File from "./models/File";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import GradeIcon from '@mui/icons-material/Grade';

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 65, width: 90 },
  {
    field: 'name',
    headerName: 'Nombre',
    flex: 1
  },
  {
    field: 'size',
    headerName: 'Tamaño',
    valueFormatter: (params) => {
      const bytes = params.value as number;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    },
    flex: 1
  },
  {
    field: "favorite",
    headerName: "Favorito",
    type: "boolean",
    flex: 1,
    valueFormatter: (params) => params.value ? "Si" : "No"
  },
  {
    field: 'createdAt',
    headerName: 'Fecha de Creación',
    valueFormatter: (params) => formatDate(new Date(params.value as string)),
    flex: 1
  },
  {
    field: 'updatedAt',
    headerName: 'Fecha de Modificación',
    valueFormatter: (params) => formatDate(new Date(params.value as string)),
    flex: 1
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DetailsCase() {
  const loaderData = useLoaderData() as Case;
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    console.log("Context Menu opened")
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
        // Other native context menus might behave different.
        // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
        null,
    );
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const filesInputRef = createRef<HTMLInputElement>();
  const filesButtonRef = createRef<HTMLButtonElement>();
  const submit = useSubmit();

  const handleFilesClick = () => {
    filesInputRef.current?.click();
  };

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    submit(filesButtonRef.current);
    return handleClose();
  };

  const handleFavoriteToggle = async () => {
    const response = await fetch(`${backendUrl}/files/${selectedFile?.id}/favorite`, {
      method: "POST",
      credentials: "include",
    })

    if (response.ok) {
      const file = await response.json();
      setSelectedFile(file);
    }

    handleContextMenuClose();
    return null;
  };

  return (
    <div>
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
          <MenuItem onClick={handleClose} component={Link} to={`/casos/${params.id}/editar?clientId=${params.id}`}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleFilesClick}>
            <ListItemIcon>
              <UploadFileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Subir Archivo</ListItemText>
          </MenuItem>
          <Form method="post" style={{ display: "none" }} encType="multipart/form-data">
            <input type="hidden" name="caseId" value={params.id} />
            <input type="file" name="files" id="files" multiple ref={filesInputRef} onChange={handleFilesChange} />
            <button type="submit" ref={filesButtonRef} />
          </Form>
        </Menu>
      </Box>
      {loaderData && (
        <Accordion elevation={3} expanded={expanded} onChange={handleChange}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight={500}>DETALLES DEL CASO</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} alignItems="center">
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Cliente</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={`${loaderData.client?.name} ${loaderData.client?.lastName}`} arrow>
                      <Link to={`/clientes/${loaderData.client?.id}`}>
                        <Typography>{`${loaderData.client?.name} ${loaderData.client?.lastName}`}</Typography>
                      </Link>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(`${loaderData.client?.name} ${loaderData.client?.lastName}`)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Rama Legal</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.lawBranch?.name} arrow>
                      <Typography>{loaderData.lawBranch?.name}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(`${loaderData.lawBranch?.name} ${loaderData.client?.lastName}`)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Materia Legal</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.lawMatter?.name} arrow>
                      <Typography>{loaderData.lawMatter?.name}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(`${loaderData.lawBranch?.name} ${loaderData.client?.lastName}`)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Encargado/s</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  {loaderData.users?.map((user, index) => (
                    <Typography key={index}>{`${user.name} ${user.lastName}`}</Typography>
                  ))
                  }
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Fecha de Apertura</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.createdAt && formatDate(new Date(loaderData.createdAt))} arrow>
                      <Typography>{loaderData.createdAt && formatDate(new Date(loaderData.createdAt))}</Typography>
                    </Tooltip>
                    {/* <IconButton onClick={() => handleCopyToClipboard(formatDate(new Date(loaderData?.createdAt)))}>
                      <ContentCopyIcon />
                    </IconButton> */}
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Fecha de Cierre</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography>{loaderData.closedAt ? formatDate(new Date(loaderData.closedAt)) : "-"}</Typography>
                </Grid>
              </>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )
      }
      {loaderData.courtFile && (
        <Accordion elevation={3} expanded={expanded} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography fontWeight={500}>EXPEDIENTE JUDICIAL</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} alignItems="center">
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Nro. de Expendiente</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.courtFile?.code} arrow>
                      <Typography>{loaderData.courtFile?.code}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.courtFile?.code as string)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Juzgado</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.courtFile.court} arrow>
                      <Typography>{loaderData.courtFile.court}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.courtFile?.court as string)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Juez</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.courtFile.judge} arrow>
                      <Typography>{loaderData.courtFile.judge}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.courtFile?.judge as string)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Especialista Legal</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <Tooltip title={loaderData.courtFile.officer} arrow>
                      <Typography>{loaderData.courtFile.officer}</Typography>
                    </Tooltip>
                    <IconButton onClick={() => handleCopyToClipboard(loaderData.courtFile?.officer as string)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </>
            </Grid>
          </AccordionDetails>
        </Accordion >
      )
      }

      <Paper elevation={3}>
        <Box sx={{ width: '100%' }}>
          <Box display={'flex'}>
            <Box>
              <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Archivos" {...a11yProps(0)} />
              </Tabs>
            </Box>
          </Box>
          <TabPanel value={value} index={0}>
            <DataGrid
              autoHeight
              columns={columns}
              rows={loaderData.files || []}
              slots={{ toolbar: GridToolbar }}
              hideFooterSelectedRowCount
              onCellDoubleClick={(params, event) => {
                setSelectedFile(params.row as File);
                handleContextMenu(event);
              }
              }

            /* onRowDoubleClick={(params) => {
              const id = params.id;
              navigate(`/clientes/${id}`);
            }} */
            />
            <Menu
              open={contextMenu !== null}
              onClose={handleContextMenuClose}
              anchorReference="anchorPosition"
              anchorPosition={
                contextMenu !== null
                  ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                  : undefined
              }
            >
              <MenuItem component={Link} to={selectedFile?.signedUrl as string}>
                <ListItemIcon>
                  <DownloadIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  Descargar
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleContextMenuClose}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  Eliminar
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleFavoriteToggle}>
                <ListItemIcon>
                  <GradeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  {selectedFile?.favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                </ListItemText>
              </MenuItem>
            </Menu>
          </TabPanel>
        </Box>
      </Paper>
    </div >
  )
}