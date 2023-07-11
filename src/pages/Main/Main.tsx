import { Box, Card, CardContent, CardHeader, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Work from "@mui/icons-material/Work";
import { Star } from "@mui/icons-material";
import { Link, useLoaderData } from "react-router-dom";

interface loaderData {
  activeCases: activeCases[];
  favoriteFiles: favoriteFiles[];
}
interface activeCases {
  id: number;
  title: string;
  client: client;
}

interface client {
  id: number;
  name: string;
  lastName: string;
}

interface favoriteFiles {
  id: number;
  name: string;
  path: string;
  key: string;
  signedUrl: string;
}

export default function Main() {
  const loaderData = useLoaderData() as loaderData;
  const activeCases = loaderData.activeCases as activeCases[];
  const favoriteFiles = loaderData.favoriteFiles as favoriteFiles[];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{ paddingX: 1, paddingTop: 2 }} variant="h4" gutterBottom>
        Bienvenido
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader
              title="Mis Casos Abiertos"
              action={
                <IconButton>
                  <Work />
                </IconButton>
              }
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">ID</TableCell>
                      <TableCell>Título</TableCell>
                      <TableCell>Cliente</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activeCases.map((row) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="left" component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell >
                          <Link to={`/casos/${row.id}`}>
                            {row.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/clientes/${row.id}`}>
                            {row.client.name} {row.client.lastName}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader
              title="Mis Archivos Favoritos"
              action={
                <IconButton>
                  <Star />
                </IconButton>
              }
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="left">Nombre</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {favoriteFiles.map((row) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">
                          <Link to={row.signedUrl}>
                            {row.name}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}