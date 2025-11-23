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
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import AuthContext from '../../../AuthProvider/AuthContext';
import { FormControl, FormHelperText, Input, } from '@mui/material';
import { Grid } from '@mui/material';
import { Backdrop, CircularProgress, MenuItem, TextField, Select } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
function formatDateForInput(date) {
    const d = new Date(date);
    const pad = (n) => n < 10 ? '0' + n : n;
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}
class AssetEditForm extends React.Component {
    constructor(props) {
        super(props);
        const { asset } = props;  // Receive the asset object from props
        this.state = {
            is_loading: false,
            name: asset?.name || '',
            ref: asset?.ref || '',
            photo: null,

            asset_type: asset?.asset_type || 'Equipment',
            location: asset?.location || '',
            serial_number: asset?.serial_number || '',
            purchase_date: this.props.asset ? new Date(this.props.asset.purchase_date).toISOString().slice(0, 16) : '',
            warranty_expiration_date: this.props.asset ? new Date(this.props.asset.warranty_expiration_date).toISOString().slice(0, 16) : '',
            cost: asset?.cost || '',
            current_value: asset?.current_value || '',
            running_hour_consumption_kw: asset?.running_hour_consumption_kw || 0,
            on_hour_consumption_kw: asset?.on_hour_consumption_kw || 0,
            running_hour_cost: asset?.running_hour_cost || 0,
            on_hour_cost: asset?.on_hour_cost || 0,
            status: asset?.status || 'Active',
            menu_open: true
        };
        this.isBadForm = this.isBadForm.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }

    handleDateChange = (e) => {
        const { name, value } = e.target;
        const isoValue = new Date(value).toISOString();
        this.setState({ [name]: formatDateForInput(value) });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        if (e.target.files[0].size > 2000000) {
            toast.error('The uploaded file is bigger than 2MB\nPlease select another file')
            this.setState({ photo: '' });

        }
        else
            this.setState({ photo: e.target.files[0] });
    };
    handleClose() {
        this.setState({ ...this.state, menu_open: false })
    }
    handleRegister = async () => {
        if (this.isBadForm()) return;
        this.setState({ is_loading: true });
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            if (this.state[key])
                formData.append(key, this.state[key]);
        });

        try {
            const { asset } = this.props;  // Get the asset object from props
            const method = asset ? 'patch' : 'post';
            const url = url_base + '/api/v1/assets/' + (asset ? `${asset.uuid}/` : '');

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + this.context.state.token
                }
            });

            toast.success(`Asset ${asset ? 'updated' : 'created'}`);
            if (this.props.OnUpdate)
                this.props.OnUpdate()
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Please try again. Hint: " + error.response.data['detail']);
        } finally {
            this.setState({ is_loading: false });
        }
    };
    isBadForm() {
        const { name, ref, serial_number, location } = this.state;
        if (!name || !ref || !serial_number || !location) {
            toast.error("Please fill in all required fields");
            return true;
        }
        return false;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.asset !== this.props.asset) {
            const asset = this.props.asset;

            this.setState({
                name: asset?.name || '',
                ref: asset?.ref || '',
                photo: null,
                asset_type: asset?.asset_type || 'Equipment',
                location: asset?.location || '',
                serial_number: asset?.serial_number || '',
                purchase_date: asset
                    ? new Date(asset.purchase_date).toISOString().slice(0, 16)
                    : '',
                warranty_expiration_date: asset
                    ? new Date(asset.warranty_expiration_date).toISOString().slice(0, 16)
                    : '',
                cost: asset?.cost || '',
                current_value: asset?.current_value || '',
                running_hour_consumption_kw: asset?.running_hour_consumption_kw || 0,
                on_hour_consumption_kw: asset?.on_hour_consumption_kw || 0,
                running_hour_cost: asset?.running_hour_cost || 0,
                on_hour_cost: asset?.on_hour_cost || 0,
                status: asset?.status || 'Active',
            });
        }
    }

    render() {
        const { asset } = this.props;
        return (
            <>
                <Drawer
                    anchor="right"
                    open={this.props.show}
                    onClose={this.props.handleClose}
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
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                        open={this.state.is_loading}
                    >
                        <CircularProgress />
                    </Backdrop>
                    <AppBar
                        elevation={0}
                        color="default"
                        sx={{
                            borderBottom: "1px solid",
                            borderColor: (theme) => theme.palette.divider,
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                        }}
                    >
                        <Toolbar>
                            <IconButton edge="start" onClick={this.props.handleClose}>
                                <CloseIcon />
                            </IconButton>

                            <Typography sx={{ flex: 1 }} variant="h6">
                                {asset ? "Edit Asset" : "New Asset"}
                            </Typography>

                            <Button variant="contained" onClick={this.handleRegister}>
                                {asset ? "Save" : "Create"}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            px: 0,
                            py: 0,
                        }}
                    >

                        <Grid container spacing={2} sx={{ p: 2 }}>
                       <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>

  {/* SECTION 1 — BASIC INFORMATION */}
  <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
    <Typography variant="h6" fontWeight={600}>Basic Information</Typography>
    <Divider sx={{ my: 2 }} />

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={this.state.name}
          onChange={this.handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Reference"
          name="ref"
          fullWidth
          value={this.state.ref}
          onChange={this.handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Serial Number"
          name="serial_number"
          fullWidth
          value={this.state.serial_number}
          onChange={this.handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Location"
          name="location"
          fullWidth
          value={this.state.location}
          onChange={this.handleChange}
        />
      </Grid>
    </Grid>
  </Paper>

  {/* SECTION 2 — ENERGY & COST INFORMATION */}
  <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
    <Typography variant="h6" fontWeight={600}>Energy & Cost</Typography>
    <Divider sx={{ my: 2 }} />

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="On-Hour Consumption (kW/h)"
          name="on_hour_consumption_kw"
          type="number"
          fullWidth
          value={this.state.on_hour_consumption_kw}
          onChange={this.handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Running Consumption (kW/h)"
          name="running_hour_consumption_kw"
          type="number"
          fullWidth
          value={this.state.running_hour_consumption_kw}
          onChange={this.handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="On-Hour Cost ($)"
          name="on_hour_cost"
          type="number"
          fullWidth
          value={this.state.on_hour_cost}
          onChange={this.handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Running Cost ($)"
          name="running_hour_cost"
          type="number"
          fullWidth
          value={this.state.running_hour_cost}
          onChange={this.handleChange}
        />
      </Grid>
    </Grid>
  </Paper>

  {/* SECTION 3 — FINANCIAL INFORMATION */}
  <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
    <Typography variant="h6" fontWeight={600}>Financial Information</Typography>
    <Divider sx={{ my: 2 }} />

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Cost ($)"
          name="cost"
          type="number"
          fullWidth
          value={this.state.cost}
          onChange={this.handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Current Value ($)"
          name="current_value"
          type="number"
          fullWidth
          value={this.state.current_value}
          onChange={this.handleChange}
        />
      </Grid>
    </Grid>
  </Paper>

  {/* SECTION 4 — STATUS & TYPE */}
  <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
    <Typography variant="h6" fontWeight={600}>Status & Type</Typography>
    <Divider sx={{ my: 2 }} />

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Status"
          name="status"
          select
          fullWidth
          value={this.state.status}
          onChange={this.handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
          <MenuItem value="Retired">Retired</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Asset Type"
          name="asset_type"
          select
          fullWidth
          value={this.state.asset_type}
          onChange={this.handleChange}
        >
          <MenuItem value="Vehicle">Vehicle</MenuItem>
          <MenuItem value="Equipment">Equipment</MenuItem>
          <MenuItem value="Building">Building</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  </Paper>

  {/* SECTION 5 — DATES */}
  <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
    <Typography variant="h6" fontWeight={600}>Dates</Typography>
    <Divider sx={{ my: 2 }} />

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Purchase Date"
          name="purchase_date"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={this.state.purchase_date}
          onChange={this.handleDateChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Warranty Expiration Date"
          name="warranty_expiration_date"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={this.state.warranty_expiration_date}
          onChange={this.handleDateChange}
        />
      </Grid>
    </Grid>
  </Paper>

  {/* SECTION 6 — PHOTO */}
  <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
    <Typography variant="h6" fontWeight={600}>Photo</Typography>
    <Divider sx={{ my: 2 }} />

    <Button variant="outlined" component="label">
      Upload Photo
      <input type="file" hidden onChange={this.handleFileChange} />
    </Button>

    {this.state.photo && (
      <Typography variant="body2" sx={{ mt: 1 }}>
        Selected: {this.state.photo.name}
      </Typography>
    )}
  </Paper>

</Box>


                        </Grid>
                    </Box>

                </Drawer>

            </>
        );
    }
}
AssetEditForm.contextType = AuthContext
export default AssetEditForm;
