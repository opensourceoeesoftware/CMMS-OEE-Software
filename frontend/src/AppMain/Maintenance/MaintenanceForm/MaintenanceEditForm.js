import * as React from 'react';
import { url as url_base } from '../../../Config';

import {
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Drawer,
  Paper,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Backdrop,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../../../AuthProvider/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

class MaintenancePlanForm extends React.Component {
  constructor(props) {
    super(props);
    const { maintenancePlan } = props;

    this.state = {
      is_loading: false,

      // BASIC INFO
      planned_starting_date: maintenancePlan?.planned_starting_date?.slice(0, 16) || "",
      planned_finished: maintenancePlan?.planned_finished?.slice(0, 16) || "",
      name: maintenancePlan?.name || "",
      ref: maintenancePlan?.ref || "",
      assigned_to: maintenancePlan?.assigned_to?.id || "",
      asset: maintenancePlan?.asset?.uuid || "",

      // OTHER INFO
      started_at: maintenancePlan?.started_at?.slice(0, 16) || "",
      finished_at: maintenancePlan?.finished_at?.slice(0, 16) || "",
      type: maintenancePlan?.type || "Planned",
      priority: maintenancePlan?.priority || "Medium",
      status: maintenancePlan?.status || "Pending",
      estimated_cost: maintenancePlan?.estimated_cost || "",
      instructions: null
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    this.setState({ instructions: e.target.files[0] });
  };

  isBadForm() {
    const {
      name,
      ref,
      assigned_to,
      asset,
      planned_starting_date,
      planned_finished
    } = this.state;

    if (!name || !ref || !assigned_to || !asset || !planned_starting_date || !planned_finished) {
      toast.error("Please fill in all required fields");
      return true;
    }

    return false;
  }

  handleRegister = async () => {
    if (this.isBadForm()) return;

    this.setState({ is_loading: true });

    const formData = new FormData();
    Object.keys(this.state).forEach((key) => {
      if (this.state[key] !== null && this.state[key] !== "")
        formData.append(key, this.state[key]);
    });

    try {
      const { maintenancePlan } = this.props;
      const method = maintenancePlan ? "patch" : "post";
      const url =
        url_base +
        "/api/v1/maintenances-plans/" +
        (maintenancePlan ? `${maintenancePlan.uuid}/` : "");

      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + this.context.state.token
        }
      });

      toast.success(
        `Maintenance Plan ${maintenancePlan ? "updated" : "created"}`
      );

      if (this.props.OnUpdate) this.props.OnUpdate();
    } catch (error) {
      toast.error(
        "Error: " + (error?.response?.data?.detail || "Please try again.")
      );
    } finally {
      this.setState({ is_loading: false });
    }
  };
  componentDidUpdate(prevProps) {
  if (prevProps.maintenancePlan !== this.props.maintenancePlan) {
    const m = this.props.maintenancePlan || {};

    this.setState({
      planned_starting_date: m?.planned_starting_date?.slice(0, 16) || "",
      planned_finished: m?.planned_finished?.slice(0, 16) || "",
      name: m?.name || "",
      ref: m?.ref || "",
      assigned_to: m?.assigned_to?.id || "",
      asset: m?.asset?.uuid || "",
      started_at: m?.started_at?.slice(0, 16) || "",
      finished_at: m?.finished_at?.slice(0, 16) || "",
      type: m?.type || "Planned",
      priority: m?.priority || "Medium",
      status: m?.status || "Pending",
      estimated_cost: m?.estimated_cost || "",
      instructions: null
    });
  }
}


  render() {
    const { maintenancePlan, users, assets } = this.props;

    return (
      <Drawer
        anchor="right"
        open={this.props.show}
        onClose={this.props.handleClose}
        PaperProps={{
          sx: {
            width: "50vw",
            minWidth: 420,
            maxWidth: 720,
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.default"
          }
        }}
        ModalProps={{ keepMounted: true }}
      >
        {/* LOADING BACKDROP */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10 }}
          open={this.state.is_loading}
        >
          <CircularProgress />
        </Backdrop>

        {/* HEADER */}
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
            <IconButton edge="start" onClick={this.props.handleClose}>
              <CloseIcon />
            </IconButton>

            <Typography sx={{ flex: 1 }} variant="h6">
              {maintenancePlan ? "Edit Maintenance Plan" : "New Maintenance Plan"}
            </Typography>

            <Button variant="contained" onClick={this.handleRegister}>
              {maintenancePlan ? "Save" : "Create"}
            </Button>
          </Toolbar>
        </AppBar>

        {/* CONTENT */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>

          {/* SECTION 1 - BASIC INFO */}
          <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
            <Typography variant="h6" fontWeight={600}>
              Basic Information
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Planned Start"
                  type="datetime-local"
                  name="planned_starting_date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={this.state.planned_starting_date}
                  onChange={this.handleDateChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Planned Finish"
                  type="datetime-local"
                  name="planned_finished"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={this.state.planned_finished}
                  onChange={this.handleDateChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Reference"
                  name="ref"
                  fullWidth
                  value={this.state.ref}
                  onChange={this.handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Assigned To"
                  name="assigned_to"
                  select
                  fullWidth
                  value={this.state.assigned_to}
                  onChange={this.handleChange}
                >
                  {users.map((u) => (
                    <MenuItem key={u?.user?.id} value={u?.user?.id}>
                      {u?.user?.username}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Asset"
                  name="asset"
                  select
                  fullWidth
                  value={this.state.asset}
                  onChange={this.handleChange}
                >
                  {assets.map((asset) => (
                    <MenuItem key={asset.uuid} value={asset.uuid}>
                      {asset.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* SECTION 2 - OTHER DETAILS */}
          <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
            <Typography variant="h6" fontWeight={600}>
              Additional Information
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Actual Start"
                  type="datetime-local"
                  name="started_at"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={this.state.started_at}
                  onChange={this.handleDateChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Actual Finish"
                  type="datetime-local"
                  name="finished_at"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={this.state.finished_at}
                  onChange={this.handleDateChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Type"
                  name="type"
                  select
                  fullWidth
                  value={this.state.type}
                  onChange={this.handleChange}
                >
                  <MenuItem value="Planned">Planned</MenuItem>
                  <MenuItem value="UnPlanned">UnPlanned</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Priority"
                  name="priority"
                  select
                  fullWidth
                  value={this.state.priority}
                  onChange={this.handleChange}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Status"
                  name="status"
                  select
                  fullWidth
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Estimated Cost"
                  name="estimated_cost"
                  type="number"
                  fullWidth
                  value={this.state.estimated_cost}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="outlined" component="label">
                  Upload Instructions
                  <input type="file" hidden onChange={this.handleFileChange} />
                </Button>

                {this.state.instructions && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {this.state.instructions.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Drawer>
    );
  }
}

MaintenancePlanForm.contextType = AuthContext;
export default MaintenancePlanForm;
