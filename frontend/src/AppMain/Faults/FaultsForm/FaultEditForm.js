import * as React from 'react';
import { url as url_base} from '../../../Config';
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
import { toast } from 'react-toastify';
import AuthContext from '../../../AuthProvider/AuthContext';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import {Grid } from '@mui/material';
import { Backdrop, CircularProgress, MenuItem,  Select } from '@mui/material';
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

class FaultEditForm extends React.Component {
    constructor(props) {
        super(props);
        const { fault } = props; // Receive the fault object from props
        this.state = {
            is_loading: false,
            name: fault?.name || '',
            machine: fault?.machine?.uuid || '',
            
            menu_open: true
        };
        this.isBadForm = this.isBadForm.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
 
    handleChangeAssigned = (e) => {
        const { name, value } = e.target;
        
        this.setState({ [name]: value });
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
                const { fault } = this.props; // Get the fault object from props
                const method = fault ? 'patch' : 'post';
                const url = url_base + '/api/v2/faults/' + (fault ? `${fault.uuid}/` : '');
    
                const response = await axios({
                    method: method,
                    url: url,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': "Token " + this.context.state.token
                    }
                });
    
                toast.success(`fault ${fault ? 'updated' : 'created'}`);
                
                    if(this.props.OnUpdate)
                    this.props.OnUpdate();
               
            } catch (error) {
                
                toast.error("Something went wrong! Please try again. Hint: " + error?.response?.data['detail']);
            } finally {
                this.setState({ is_loading: false });
                if(this.props.OnUpdate)
                    this.props.OnUpdate();
            }
        });
    };
    isBadForm() {
        const { name, machine } = this.state;
        if (!name    || !machine  ) {
            toast.error("Please fill in all required fields");
            return true;
        }
        return false;
    }
    render() {
        const { fault, users, assets } = this.props;
    
        
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
                                {fault ? "Edit " : "Add "} Faults
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.handleRegister}>
                                {fault ? "Edit " : "Create "}
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
                                        Enter a name for the fault
                                    </FormHelperText>
                                </FormControl>

                               

                            

                                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                    <InputLabel id="asset-label">Asset</InputLabel>
                                    <Select
                                        labelId="asset-label"
                                        id="machine"
                                        name='machine'
                                        value={this.state.machine}
                                        onChange={this.handleChange}
                                        autoComplete='off'
                                    >
                                        {assets.map(asset => (
                                            <MenuItem key={asset.uuid} value={asset.uuid}>{asset.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText id="asset-text">
                                        Select the asset for this fault
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

FaultEditForm.contextType = AuthContext;
export default FaultEditForm;
