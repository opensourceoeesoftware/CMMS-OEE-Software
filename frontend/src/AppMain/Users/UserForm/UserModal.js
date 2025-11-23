import React from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UserModal = ({ open, handleClose, user }) => {
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
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column"
        }
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
          zIndex: 10
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={handleClose}>
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            View User
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Basic Information
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                <strong>First Name:</strong> {user?.first_name}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Last Name:</strong> {user?.last_name}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Username:</strong> {user?.username}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Email:</strong> {user?.email}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Last login:</strong>{" "}
                {user?.last_login
                  ? new Date(user.last_login).toUTCString()
                  : "Never"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Date joined:</strong>{" "}
                {user?.date_joined
                  ? new Date(user.date_joined).toUTCString()
                  : ""}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default UserModal;
