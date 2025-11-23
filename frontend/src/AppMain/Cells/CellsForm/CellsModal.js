import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Grid,
  Paper,
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CellsModal = ({ open, handleClose, cell }) => {
  if (!cell) return null;

  const machine = cell.machine;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
    sx: {
      width: "50vw",       // main width
      minWidth: 420,        // consistent min width
      maxWidth: 720,        // consistent max width
      display: "flex",
      flexDirection: "column",
      bgcolor: "background.default",
    }
  }}
      ModalProps={{ keepMounted: true }}
    >

      {/* Header */}
      <AppBar
        elevation={0}
        color="default"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={handleClose}>
            <CloseIcon />
          </IconButton>

          <Typography sx={{ flex: 1 }} variant="h6">
            View Cell
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>

        {/* BASIC INFO */}
        <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
          <Typography variant="h6" fontWeight={600}>
            Basic Information
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                image={machine?.photo}
                alt={machine?.name}
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Typography variant="body1" gutterBottom>
                <strong>Cell Name:</strong> {cell.name}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Machine Name:</strong> {machine?.name}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Machine Type:</strong> {machine?.asset_type || "N/A"}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Status:</strong> {machine?.status || "Unknown"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

      </Box>
    </Drawer>
  );
};

export default CellsModal;
