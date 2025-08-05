import * as React from 'react';
import { url as url_base } from '../../../Config';

import {
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {  toast } from 'react-toastify';
import AuthContext from '../../../AuthProvider/AuthContext';
import { FormControl, FormHelperText, Input, } from '@mui/material';
import {  Grid } from '@mui/material';
import { Backdrop, CircularProgress, MenuItem, TextField, Select } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
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
    render() {
        const { asset } = this.props;
        return (
            <>
                <Dialog
                    fullScreen
                    open={this.props.show}
                    onClose={this.props.handleClose}
                    TransitionComponent={Transition}
                >
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                        open={this.state.is_loading}
                    >
                        <CircularProgress />
                    </Backdrop>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={this.props.handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {asset ? "Edit " : "Add "} asset
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.handleRegister}>
                                {asset ? "Edit " : "Create "}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={2} sx={{ p: 5 }}>
                        <Accordion defaultExpanded sx={{ mb: 2, width: "100%" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Basic Info
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="name"
                                        placeholder='Name'
                                        name='name'
                                        type='text'
                                        aria-describedby='asset-text'
                                        onChange={this.handleChange}
                                        value={this.state.name}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="asset-text">
                                        <strong>Required *</strong>
                                    </FormHelperText>
                                    <FormHelperText id="asset-text">
                                        Enter a name that everybody knows
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="ref"
                                        placeholder='Reference'
                                        name='ref'
                                        type='text'
                                        onChange={this.handleChange}
                                        value={this.state.ref}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="asset-text">
                                        <strong>Required *</strong>
                                    </FormHelperText>
                                    <FormHelperText id="ref-text">
                                        Enter a reference, Ideally unique
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="serial_number"
                                        placeholder='Serial Number'
                                        name='serial_number'
                                        type='text'
                                        onChange={this.handleChange}
                                        value={this.state.serial_number}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="asset-text">
                                        <strong>Required *</strong>
                                    </FormHelperText>
                                    <FormHelperText id="serial-text">
                                        Enter the serial number of your asset
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="location"
                                        placeholder='Location'
                                        name='location'
                                        type='text'
                                        onChange={this.handleChange}
                                        value={this.state.location}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="asset-text">
                                        <strong>Required *</strong>
                                    </FormHelperText>
                                    <FormHelperText id="location-text">
                                        Enter a location, this can be a department, or a physical location (ex. Client site etc...)
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="on_hour_consumption_kw"
                                        placeholder='On Consumption Kw/h'
                                        name='on_hour_consumption_kw'
                                        type='number'
                                        onChange={this.handleChange}
                                        value={this.state.on_hour_consumption_kw}
                                        autoComplete='off'
                                    />

                                    <FormHelperText id="on_hour_consumption_kw-text">
                                        <strong>On Consumption Kw/h</strong>
                                    </FormHelperText>
                                    <FormHelperText id="on_hour_consumption_kw-text">
                                        How many Kw/h the machine consumes in heating phase
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="running_hour_consumption_kw"
                                        placeholder='Running Consumption Kw/h'
                                        name='running_hour_consumption_kw'
                                        type='number'
                                        onChange={this.handleChange}
                                        value={this.state.running_hour_consumption_kw}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="running_hour_consumption_kw-text">
                                        <strong>Running Consumption Kw/h</strong>
                                    </FormHelperText>
                                    <FormHelperText id="on_hour_consumption_kw-text">
                                        How many Kw/h the machine consumes in running phase
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="on_hour_cost"
                                        placeholder='On costs $'
                                        name='on_hour_cost'
                                        type='number'
                                        onChange={this.handleChange}
                                        value={this.state.on_hour_cost}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="on_hour_cost-text">
                                        <strong>On costs $</strong>
                                    </FormHelperText>
                                    <FormHelperText id="on_hour_consumption_kw-text">
                                        How many $ the machine costs in heating phase
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="running_hour_cost"
                                        placeholder='Running costs $'
                                        name='running_hour_cost'
                                        type='number'
                                        onChange={this.handleChange}
                                        value={this.state.running_hour_cost}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="running_hour_cost-text">
                                        <strong>Running costs $</strong>
                                    </FormHelperText>
                                    <FormHelperText id="on_hour_consumption_kw-text">
                                        How many $ the machine costs in running phase
                                    </FormHelperText>
                                </FormControl>

                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                Other information
                            </AccordionSummary>
                            <AccordionDetails>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        id="purchase_date"
                                        label="Purchase Date"
                                        type="datetime-local"
                                        name="purchase_date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleDateChange}
                                        value={this.state.purchase_date}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="purchase-text">
                                        Enter the purchase date
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        id="warranty_expiration_date"
                                        label="Warranty Expiration Date"
                                        type="datetime-local"
                                        name="warranty_expiration_date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleDateChange}
                                        value={this.state.warranty_expiration_date}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="warranty-text">
                                        Enter the date of the end of the warranty, this information is useful later on.
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Select
                                        id="status"
                                        name='status'
                                        value={this.state.status}
                                        onChange={this.handleChange}
                                        autoComplete='off'
                                    >
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="Inactive">Inactive</MenuItem>
                                        <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
                                        <MenuItem value="Retired">Retired</MenuItem>
                                    </Select>
                                    <FormHelperText id="location-text">
                                        Choose the status of the asset, Default value is Inactive
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Select
                                        id="asset_type"
                                        name='asset_type'
                                        value={this.state.asset_type}
                                        onChange={this.handleChange}
                                        autoComplete='off'
                                    >
                                        <MenuItem value="Vehicle">Vehicle</MenuItem>
                                        <MenuItem value="Equipment">Equipment</MenuItem>
                                        <MenuItem value="Building">Building</MenuItem>
                                        <MenuItem value="Furniture">Furniture</MenuItem>
                                        <MenuItem value="IT">IT</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                    <FormHelperText id="location-text">
                                        Select the type of your asset
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="cost"
                                        placeholder='Cost'
                                        name='cost'
                                        type='number'
                                        onChange={this.handleChange}
                                        value={this.state.cost}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="cost-text">
                                        The cost of your asset
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="current_value"
                                        placeholder='Current Value'
                                        name='current_value'
                                        type='number'
                                        onChange={this.handleChange}
                                        value={this.state.current_value}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="currentvalue-text">
                                        The actual value for example in case of depreciation
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="photo"
                                        type='file'
                                        name='photo'
                                        onChange={this.handleFileChange}
                                    />
                                    <FormHelperText id="currentvalue-text">
                                        The photo of your Asset
                                    </FormHelperText>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>

                    </Grid>

                </Dialog>

            </>
        );
    }
}
AssetEditForm.contextType = AuthContext
export default AssetEditForm;
