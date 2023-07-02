import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Box, Button, Paper, Tab, Tabs } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar, gridNumberComparator } from "@mui/x-data-grid";
import Client from "./models/Client";
import User from "./models/User";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

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

export default function Clients() {
  const [value, setValue] = useState(0);
  const data = useLoaderData() as Client[];
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 65, width: 90 },
    { field: 'name', headerName: 'Nombres', flex: 1 },
    { field: 'lastName', headerName: 'Apellidos', flex: 1 },
    { field: 'status', headerName: 'Estado', flex: 1, sortComparator: gridNumberComparator, valueFormatter: (params) => (params.value ? 'Activo' : 'Inactivo') },
    { field: 'users', headerName: 'Encargado/s', flex: 1, valueFormatter: (params) => params.value.map((user: User) => user.name).join(', '), sortable: false },
  ];

  return (
    <Paper elevation={3}>
      <Box sx={{ width: '100%' }}>
        <Box display={'flex'}>
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Todos" {...a11yProps(0)} />
              <Tab label="Activos" {...a11yProps(1)} />
              <Tab label="Inactivos" {...a11yProps(2)} />
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
              size="small"
            >
              <PersonAddAlt1Icon />
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
              startIcon={<PersonAddAlt1Icon />}
            >
              Nuevo Cliente
            </Button>
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <DataGrid
            autoHeight
            columns={columns}
            rows={data}
            slots={{ toolbar: GridToolbar }}
            onRowDoubleClick={(params) => {
              const id = params.id;
              navigate(`/clientes/${id}`);
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DataGrid
            autoHeight
            columns={columns.filter((col) => col.field !== 'status')}
            rows={data.filter((client) => client.status)}
            slots={{ toolbar: GridToolbar }}
            onRowDoubleClick={(params) => {
              const id = params.id;
              navigate(`/clientes/${id}`);
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DataGrid
            autoHeight
            columns={columns.filter((col) => col.field !== 'status')}
            rows={data.filter((client) => !client.status)}
            slots={{ toolbar: GridToolbar }}
            onRowDoubleClick={(params) => {
              const id = params.id;
              navigate(`/clientes/${id}`);
            }}
          />
        </TabPanel>
      </Box>
    </Paper>
  );
}
