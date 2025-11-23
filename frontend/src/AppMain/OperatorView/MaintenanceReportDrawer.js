import React from "react";
import {
  Drawer,
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Divider,
  Backdrop,
  CircularProgress
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { url as url_base } from "../../Config";
import AuthContext from "../../AuthProvider/AuthContext";

import AssetCard from "./AssetCard";
import MaintenanceCard from "./MaintenanceCard";

class MaintenanceReportDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleFinishClick = this.handleFinishClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  // ---- Shared PATCH handler ----
  async updateMaintenance(data) {
    const { maintenance } = this.props;
    this.setState({ is_loading: true });

    try {
      const url = url_base + "/api/v1/maintenances-plans/" + maintenance.uuid + "/";
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => v && formData.append(k, v));

      await axios.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + this.context.state.token
        }
      });

      toast.success("Maintenance updated");

      if (this.props.onClose) this.props.onClose();
    } catch (error) {
      toast.error("Error: " + error?.response?.data?.detail);
    } finally {
      this.setState({ is_loading: false });
    }
  }

  // ---- STATUS ACTIONS ----
  handleStartClick() {
    const t = new Date();
    t.setHours(t.getHours() + 2);
    this.updateMaintenance({ status: "In Progress", started_at: t.toISOString() });
  }

  handleFinishClick() {
    const t = new Date();
    t.setHours(t.getHours() + 2);
    this.updateMaintenance({ status: "Completed", finished_at: t.toISOString() });
  }

  handlePauseClick() {
    this.updateMaintenance({ status: "Pending" });
  }

  handleCancelClick() {
    this.updateMaintenance({ status: "Cancelled" });
  }

  render() {
    const { open, onClose, maintenance } = this.props;

    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: "100%", md: "900px" }
          }
        }}
      >
        <ToastContainer />

        {/* BACKDROP */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10 }}
          open={this.state.is_loading}
        >
          <CircularProgress />
        </Backdrop>

        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #ddd",
            display: "flex",
            alignItems: "center"
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ ml: 2 }}>
            View Maintenance Plan
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}
        <Grid container spacing={2} sx={{ p: 2 }}>
          {maintenance?.status === "Pending" && (
            <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
              <Paper
                elevation={1}
                onClick={this.handleStartClick}
                sx={actionCard("success.main")}
              >
                <PlayCircleOutlineIcon sx={{ fill: "white" }} fontSize="large" />
                <Typography variant="h5" sx={{ color: "white", ml: 2 }}>
                  Start
                </Typography>
              </Paper>
            </Grid>
          )}

          {maintenance?.status === "In Progress" && (
            <>
              <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                  elevation={1}
                  onClick={this.handleFinishClick}
                  sx={actionCard("success.main")}
                >
                  <CheckCircleIcon sx={{ fill: "white" }} fontSize="large" />
                  <Typography variant="h5" sx={{ color: "white", ml: 2 }}>
                    Finish
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                  elevation={1}
                  onClick={this.handlePauseClick}
                  sx={actionCard("info.main")}
                >
                  <PauseCircleIcon sx={{ fill: "white" }} fontSize="large" />
                  <Typography variant="h5" sx={{ color: "white", ml: 2 }}>
                    Pause
                  </Typography>
                </Paper>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Paper
              elevation={1}
              onClick={this.handleCancelClick}
              sx={actionCard("error.main")}
            >
              <CancelIcon sx={{ fill: "white" }} fontSize="large" />
              <Typography variant="h5" sx={{ color: "white", ml: 2 }}>
                Cancel
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider />

        {/* CONTENT */}
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <AssetCard asset={maintenance?.asset} />
          </Grid>

          <Grid item xs={12} md={8} sx={{ display: "flex", justifyContent: "center" }}>
            <MaintenanceCard asset={maintenance?.asset} maintenance={maintenance} />
          </Grid>
        </Grid>
      </Drawer>
    );
  }
}

// Shared card style
const actionCard = (color) => ({
  justifyContent: "center",
  height: 100,
  width: "85%",
  bgcolor: color,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 2
});

MaintenanceReportDrawer.contextType = AuthContext;
export default MaintenanceReportDrawer;
