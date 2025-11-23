import React from 'react';
import {
  Drawer,
  Typography,
  Grid,
  Paper,
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AssetModal = ({ open, handleClose, asset }) => {
  if (!asset) return null;

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

      {/* 🧭 Sticky AppBar */}
      <AppBar
        elevation={0}
        color="default"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={handleClose}>
            <CloseIcon />
          </IconButton>

          <Typography sx={{ flex: 1 }} variant="h6">
            View Asset
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🔽 Scrollable body */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>

        {/* ⭐ Section 1: Basic Info + Image */}
        <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>Basic Information</Typography>
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                image={asset.photo}
                alt={asset.name}
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 1
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {asset.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Reference:</strong> {asset.ref}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Type:</strong> {asset.asset_type}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Serial Number:</strong> {asset.serial_number}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Status:</strong> {asset.status}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* ⭐ Section 2: Additional Info */}
        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600}>Additional Information</Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong> {asset.location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Purchase Date:</strong> {new Date(asset.purchase_date).toUTCString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Warranty Expires:</strong> {new Date(asset.warranty_expiration_date).toUTCString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Created At:</strong> {new Date(asset.created_at).toUTCString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Last Updated:</strong> {new Date(asset.last_updated_at).toUTCString()}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Cost:</strong> {asset.cost}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Current Value:</strong> {asset.current_value}
          </Typography>
        </Paper>

      </Box>
    </Drawer>
  );
};

export default AssetModal;
