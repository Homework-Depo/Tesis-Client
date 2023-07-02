import { Box, Card, CardContent, CardHeader, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Work from "@mui/icons-material/Work";
import { Star } from "@mui/icons-material";

export default function Main() {
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
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Cliente</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">1</TableCell>
                      <TableCell align="right">Caso 1</TableCell>
                      <TableCell align="right">Cliente 1</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">2</TableCell>
                      <TableCell align="right">Caso 2</TableCell>
                      <TableCell align="right">Cliente 2</TableCell>
                    </TableRow>
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
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Tipo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">1</TableCell>
                      <TableCell align="right">Caso 1</TableCell>
                      <TableCell align="right">Cliente 1</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">2</TableCell>
                      <TableCell align="right">Caso 2</TableCell>
                      <TableCell align="right">Cliente 2</TableCell>
                    </TableRow>
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