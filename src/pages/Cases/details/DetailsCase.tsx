import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery, useTheme, Paper, Tab, Tabs } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Case from "./models/Case";
import { Form, Link, useLoaderData, useParams, useSubmit } from "react-router-dom";
import { Edit, MoreVert } from "@mui/icons-material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { createRef, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

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
    // format to KB, MB, GB, TB
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
          <MenuItem onClick={handleClose} component={Link} to={`/casos/${params.id}/editar`}>
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
            <Grid container spacing={2}>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Cliente</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography>{`${loaderData.client?.name} ${loaderData.client?.lastName}`}</Typography>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Rama Legal</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography>{loaderData.lawBranch?.name}</Typography>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Materia Legal</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography>{loaderData.lawMatter?.name}</Typography>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Materia Legal</Typography>
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
                  <Typography>{loaderData.createdAt && formatDate(new Date(loaderData.createdAt))}</Typography>
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
      )}
      {loaderData.courtFile && (
        <Accordion elevation={3}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography fontWeight={500}>EXPEDIENTE JUDICIAL</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Nro. de Expendiente</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography>{loaderData.courtFile.code}</Typography>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Juzgado</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography>{loaderData.courtFile.court}</Typography>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Juez</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography>{loaderData.courtFile.judge}</Typography>
                </Grid>
              </>
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>Especialista Legal</Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                  <Typography fontWeight={500}>{loaderData.courtFile.officer}</Typography>
                </Grid>
              </>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      <Paper elevation={3}>
        <Box sx={{ width: '100%' }}>
          <Box display={'flex'}>
            <Box>
              <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Todos" {...a11yProps(0)} />
                <Tab label="Archivos" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
                width: '100%',
                margin: 1,
                paddingRight: 2,
                height: 40,
              }}
            >
              <Button
                sx={{
                  display: {
                    xs: 'flex',
                    md: 'none',
                  },
                  height: 35,
                  width: 'auto',
                }}
                variant="contained"
              >
                {/* <PersonAddAlt1Icon /> */}
              </Button>
              <Button
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                  width: 'auto',
                  height: 35,
                }}
                variant="contained"
                component={Link}
                to="/clientes/nuevo"
              /* startIcon={<PersonAddAlt1Icon />} */
              >
                Nuevo Cliente
              </Button>
            </Box>
          </Box>
          <TabPanel value={value} index={0}>
            {/* <DataGrid
            autoHeight
            columns={columns}
            rows={data}
            slots={{ toolbar: GridToolbar }}
            hideFooterSelectedRowCount
            onRowDoubleClick={(params) => {
              const id = params.id;
              navigate(`/clientes/${id}`);
            }}
          /> */}

          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <DataGrid
            autoHeight
            columns={columns.filter((col) => col.field !== 'status')}
            rows={data.filter((client) => client.status)}
            slots={{ toolbar: GridToolbar }}
            hideFooterSelectedRowCount
            onRowDoubleClick={(params) => {
              const id = params.id;
              navigate(`/clientes/${id}`);
            }}
          /> */}
            <DataGrid
              autoHeight
              columns={columns}
              rows={loaderData.files || []}
              slots={{ toolbar: GridToolbar }}
              hideFooterSelectedRowCount
            /* onRowDoubleClick={(params) => {
              const id = params.id;
              navigate(`/clientes/${id}`);
            }} */
            />
          </TabPanel>
        </Box>
      </Paper>
    </div>
  )
}