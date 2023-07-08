import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Case from "./models/Case";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { ExpandMore, Edit, Work, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

export default function DetailsCase() {
  const loaderData = useLoaderData() as Case;
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(!isMobile);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Work fontSize="small" />
            </ListItemIcon>
            <ListItemText>Nuevo</ListItemText>
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
    </div>
  )
}