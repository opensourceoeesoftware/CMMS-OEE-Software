import * as React from 'react';
import { url as url_base } from '../../../Config';

import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
  TextField,
  MenuItem,
  Backdrop,
  CircularProgress,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../../../AuthProvider/AuthContext';

class FaultEditForm extends React.Component {
  constructor(props) {
    super(props);

    const { fault } = props;

    this.state = {
      is_loading: false,
      name: fault?.name || '',
      machine: fault?.machine?.uuid || '',
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fault !== this.props.fault) {
      const fault = this.props.fault;
      this.setState({
        name: fault?.name || '',
        machine: fault?.machine?.uuid || '',
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  isBadForm() {
    const { name, machine } = this.state;
    if (!name || !machine) {
      toast.error("Please fill in all required fields");
      return true;
    }
    return false;
  }

  async handleRegister() {
    if (this.isBadForm()) return;

    this.setState({ is_loading: true });

    try {
      const { fault } = this.props;
      const method = fault ? 'patch' : 'post';
      const url = url_base + '/api/v2/faults/' + (fault ? `${fault.uuid}/` : '');

      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("machine", this.state.machine);

      await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': "Token " + this.context.state.token,
        }
      });

      toast.success(`Fault ${fault ? 'updated' : 'created'}`);

      if (this.props.OnUpdate) this.props.OnUpdate();
    } catch (error) {
      toast.error("Something went wrong! " + (error?.response?.data?.detail || ""));
    } finally {
      this.setState({ is_loading: false });
    }
  }

  render() {
    const { fault, assets } = this.props;

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
            bgcolor: "background.default",
          }
        }}
        ModalProps={{ keepMounted: true }}
      >
        {/* Loading Backdrop */}
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 3 }}
          open={this.state.is_loading}
        >
          <CircularProgress />
        </Backdrop>

        {/* Header */}
        <AppBar
          elevation={0}
          color="default"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <Toolbar>
            <IconButton onClick={this.props.handleClose}>
              <CloseIcon />
            </IconButton>

            <Typography sx={{ flex: 1 }} variant="h6">
              {fault ? "Edit Fault" : "New Fault"}
            </Typography>

            <Button variant="contained" onClick={this.handleRegister}>
              {fault ? "Save" : "Create"}
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>

          {/* BASIC INFO SECTION */}
          <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
            <Typography variant="h6" fontWeight={600}>Basic Information</Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {/* Fault Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fault Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Grid>

              {/* Machine selector */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Machine"
                  name="machine"
                  value={this.state.machine}
                  onChange={this.handleChange}
                >
                  {assets.map(asset => (
                    <MenuItem key={asset.uuid} value={asset.uuid}>
                      {asset.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

            </Grid>
          </Paper>

        </Box>
      </Drawer>
    );
  }
}

FaultEditForm.contextType = AuthContext;
export default FaultEditForm;
