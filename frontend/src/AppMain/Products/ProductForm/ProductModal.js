import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductModal = ({ open, handleClose, product }) => {
  if (!product) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "50vw",
          minWidth: 420,
          maxWidth: 720,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        },
      }}
      ModalProps={{ keepMounted: true }}
    >
      {/* Sticky Header */}
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
            View Product
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Typography variant="h6" fontWeight={600}>
            Basic Information
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" gutterBottom>
            <strong>Product Name:</strong> {product.product_name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Product ID:</strong> {product.product_id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Ideal Cycle (seconds):</strong> {product.ideal_cycle}
          </Typography>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default ProductModal;
