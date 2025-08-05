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
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
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

class MaintenancePlanForm extends React.Component {
    constructor(props) {
        super(props);
        const { maintenancePlan } = props; // Receive the maintenancePlan object from props
        
        this.state = {
            is_loading: false,
            name: maintenancePlan?.name || '',
            ref: maintenancePlan?.ref || '',
            
            assigned_to: maintenancePlan?.assigned_to?.id || '',
            asset: maintenancePlan?.asset?.uuid || '',
            planned_starting_date: maintenancePlan?.planned_starting_date ? maintenancePlan.planned_starting_date.slice(0, 16) : '',
            planned_finished: maintenancePlan?.planned_finished ? maintenancePlan.planned_finished.slice(0, 16) : '',
            started_at: maintenancePlan?.started_at ? maintenancePlan.started_at.slice(0, 16) : '',
            finished_at: maintenancePlan?.finished_at ? maintenancePlan.finished_at.slice(0, 16) : '',
            instructions: null,
            type: maintenancePlan?.type || 'Other',

            priority: maintenancePlan?.priority || 'Medium',
            status: maintenancePlan?.status || 'Pending',
            estimated_cost: maintenancePlan?.estimated_cost || '',
            menu_open: true
        };
        this.isBadForm = this.isBadForm.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseScheduler = this.handleCloseScheduler.bind(this);
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
 
    handleChangeAssigned = (e) => {
        const { name, value } = e.target;
      
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        this.setState({ instructions: e.target.files[0] });
    };
    handleClose() {
        this.setState({ ...this.state, menu_open: false });
    }
    handleRegister = async () => {
        if (this.isBadForm()) return;
        this.setState({ ...this.state,is_loading: true },async ()=>{

            
            const formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key])
                    formData.append(key, this.state[key]);
            });
           
            try {
                const { maintenancePlan } = this.props; // Get the maintenancePlan object from props
                const method = maintenancePlan?.uuid ? 'patch' : 'post';
                const url = url_base + '/api/v1/maintenances-plans/' + (maintenancePlan?.uuid ? `${maintenancePlan.uuid}/` : '');
    
                const response = await axios({
                    method: method,
                    url: url,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': "Token " + this.context.state.token
                    }
                });
    
                toast.success(`Maintenance Plan ${maintenancePlan?.uuid ? 'updated' : 'created'}`);
                this.props.scheduler.close()
                    if(this.props.OnUpdate)
                    this.props.OnUpdate();
               
            } catch (error) {
                
                toast.error("Something went wrong! Please try again. Hint: " + error?.response?.data['detail']);
            } finally {
                this.setState({ is_loading: false });
            }
        });
    };
    isBadForm() {
        const { name, ref, created_by, assigned_to, asset } = this.state;
        if (!name || !ref   || !asset) {
            toast.error("Please fill in all required fields");
            return true;
        }
        return false;
    }
    handleCloseScheduler() {
        this.props.scheduler.close()
        this.props.handleClose()
    }
    render() {
        const { maintenancePlan, users, assets } = this.props;
      
    
        return (
            <>
                <Dialog
                    // fullScreen
                    open={this.props.show}
                    onClose={this.handleCloseScheduler}
                    TransitionComponent={Transition}
                >
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={this.state.is_loading}
                    >
                        <CircularProgress />
                    </Backdrop>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={this.handleCloseScheduler}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {maintenancePlan?.uuid ? "Edit " : "Add "} Maintenance Plan
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.handleRegister}>
                                {maintenancePlan?.uuid ? "Edit " : "Create "}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={2} sx={{ p: 5 }}>
                        <Accordion defaultExpanded sx={{width:"100%"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Basic Info
                            </AccordionSummary>
                            <AccordionDetails>
                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        id="planned_starting_date"
                                        label="Planned Starting Date"
                                        type="datetime-local"
                                        name="planned_starting_date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        
                                        onChange={this.handleDateChange}
                                        value={this.state.planned_starting_date}
                                        
                                    />
                                    <FormHelperText id="plannedstartdate-text">
                                        Enter the planned starting date
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        id="planned_finished"
                                        label="Planned Finished Date"
                                        type="datetime-local"
                                        name="planned_finished"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleDateChange}
                                        value={this.state.planned_finished}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="plannedfinished-text">
                                        Enter the planned finished date
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="name"
                                        placeholder='Name'
                                        name='name'
                                        type='text'
                                        aria-describedby='name-text'
                                        onChange={this.handleChange}
                                        value={this.state.name}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="name-text">
                                        <strong>Required *</strong>
                                    </FormHelperText>
                                    <FormHelperText id="name-text">
                                        Enter a name for the maintenance plan
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
                                    <FormHelperText id="ref-text">
                                        <strong>Required *</strong>
                                    </FormHelperText>
                                    <FormHelperText id="ref-text">
                                        Enter a reference, ideally unique
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <InputLabel id="assigned_to-label">Assigned To</InputLabel>
                                    <Select
                                        labelId="assigned_to-label"
                                        id="assigned_to"
                                        name='assigned_to'
                                        value={this.state.assigned_to}
                                        onChange={this.handleChange}
                                        autoComplete='off'
                                    >
                                        {users.map(profile_user => (
                                            <MenuItem 
                                            key={profile_user?.user?.id} 
                                            value={profile_user?.user?.id}
                                            
                                            
                                            
                                            >{profile_user?.user?.username}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText id="assignedto-text">
                                        Select the user assigned to this maintenance plan
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <InputLabel id="asset-label">Asset</InputLabel>
                                    <Select
                                        labelId="asset-label"
                                        id="asset"
                                        name='asset'
                                        value={this.state.asset}
                                        onChange={this.handleChange}
                                        autoComplete='off'
                                    >
                                        {assets.map(asset => (
                                            <MenuItem key={asset.uuid} value={asset.uuid}>{asset.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText id="asset-text">
                                        Select the asset for this maintenance plan
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
                                Other Information
                            </AccordionSummary>
                            <AccordionDetails>
                              

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        id="started_at"
                                        label="Started At"
                                        type="datetime-local"
                                        name="started_at"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleDateChange}
                                        value={this.state.started_at}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="startedat-text">
                                        Enter the actual start date and time
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        id="finished_at"
                                        label="Finished At"
                                        type="datetime-local"
                                        name="finished_at"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleDateChange}
                                        value={this.state.finished_at}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="finishedat-text">
                                        Enter the actual finish date and time
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Select
                                        id="type"
                                        name='type'
                                        value={this.state.type}
                                        onChange={this.handleChange}
                                        autoComplete='off'
                                    >   
                                        <MenuItem value="Planned">Planned</MenuItem>
                                        <MenuItem value="UnPlanned">UnPlanned</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                    <FormHelperText id="type-text">
                                        Select the type of maintenance plan
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Select
                                        id="priority"
                                        name='priority'
                                        value={this.state.priority}
                                        onChange={this.handleChange}
                                        autoComplete='off'
                                    >
                                        <MenuItem value="Low">Low</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="High">High</MenuItem>
                                    </Select>
                                    <FormHelperText id="priority-text">
                                        Select the priority of the maintenance plan
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
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    </Select>
                                    <FormHelperText id="status-text">
                                        Select the status of the maintenance plan
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="estimated_cost"
                                        placeholder='Estimated Cost'
                                        name='estimated_cost'
                                        type='number'
                                        onChange={this.handleChange}
                                        value={this.state.estimated_cost}
                                        autoComplete='off'
                                    />
                                    <FormHelperText id="estimatedcost-text">
                                        Enter the estimated cost of the maintenance plan
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <Input
                                        id="instructions"
                                        type='file'
                                        name='instructions'
                                        onChange={this.handleFileChange}
                                    />
                                    <FormHelperText id="instructions-text">
                                        Upload instructions for the maintenance plan
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

MaintenancePlanForm.contextType = AuthContext;
export default MaintenancePlanForm;
