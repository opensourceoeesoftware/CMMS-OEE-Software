import React from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Slide,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import MaintenanceCard from '../../OperatorView/MaintenanceCard';
import AssetCard from '../../OperatorView/AssetCard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const MaintenanceModal = ({ open, handleClose, maintenance }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "50vw",
          minWidth: 420,
          maxWidth: 780,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        },
      }}
      ModalProps={{ keepMounted: true }}
      TransitionComponent={Transition}
    >
      {/* HEADER */}
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
            View Maintenance Plan
          </Typography>
        </Toolbar>
      </AppBar>

      {/* CONTENT */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        
        {/* ASSET */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Asset
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container justifyContent="center">
            <AssetCard asset={maintenance?.asset} />
          </Grid>
        </Box>

        {/* MAINTENANCE DETAILS */}
        <Box>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Maintenance Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container justifyContent="center">
            <MaintenanceCard maintenance={maintenance} />
          </Grid>
        </Box>

      </Box>
    </Drawer>
  );
};

export default MaintenanceModal;
