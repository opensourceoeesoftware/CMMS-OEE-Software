import React from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MaintenanceCard from "../../OperatorView/MaintenanceCard";
import AssetCard from "../../OperatorView/AssetCard";

export default function MaintenanceViewerDrawer({ open, onClose, maintenance }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: "50vw", minWidth: 420, maxWidth: 720 }
      }}
    >
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6">
            Maintenance Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, overflowY: "auto", height: "100%" }}>
        <MaintenanceCard maintenance={maintenance} />
        <Divider sx={{ my: 3 }} />
        <AssetCard asset={maintenance?.asset} />
      </Box>
    </Drawer>
  );
}
