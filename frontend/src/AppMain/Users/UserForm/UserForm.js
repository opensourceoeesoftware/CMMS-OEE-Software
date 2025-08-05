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
import { FormControl, FormHelperText, Input,Select,MenuItem  } from '@mui/material';
import { Grid } from '@mui/material';
import { Backdrop, CircularProgress, } from '@mui/material';
import Accordion from '@mui/material/Accordion';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class UserForm extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
            is_loading: false,
            username: '',
            email:'',
            first_name:'',
            last_name:'',
            type:"Admin",
            
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
          
            const method = 'post';
            const url = url_base + '/api/v1/profile-users/' ;

            await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + this.context.state.token
                }
            });

            toast.success(`User created. An E-mail is sent to him to join your organization`,{autoClose:false});
            if(this.props.OnUpdate)
                this.props.OnUpdate()
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Please try again. Hint: " + error.response.data['detail']);
        } finally {
            this.setState({ is_loading: false });
        }
    };
    isBadForm() {
        const { username, email,first_name,last_name } = this.state;
        if (!username || !email || !first_name ||!last_name) {
            toast.error("Please fill in all required fields");
            return true;
        }
        return false;
    }
    render() {
       
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
                                Add User
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.handleRegister}>
                            Create
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={2} sx={{p:5}}>
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
                                    id="first_name"
                                    placeholder='First Name'
                                    name='first_name'
                                    type='text'
                                    aria-describedby='first_name-text'
                                    onChange={this.handleChange}
                                    value={this.state.first_name}
                                    autoComplete='off'
                                />
                                <FormHelperText id="first_name-text">
                                    <strong>Required *</strong>
                                </FormHelperText>
                                <FormHelperText id="username--text">
                                    Enter the first name
                                </FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <Input
                                    id="last_name"
                                    placeholder='Last Name'
                                    name='last_name'
                                    type='text'
                                    aria-describedby='last_name-text'
                                    onChange={this.handleChange}
                                    value={this.state.last_name}
                                    autoComplete='off'
                                />
                                <FormHelperText id="last_name-text">
                                    <strong>Required *</strong>
                                </FormHelperText>
                                <FormHelperText id="username--text">
                                    Enter the last name
                                </FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <Input
                                    id="username"
                                    placeholder='User Name'
                                    name='username'
                                    type='text'
                                    aria-describedby='username-text'
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                    autoComplete='off'
                                />
                                <FormHelperText id="username-text">
                                    <strong>Required *</strong>
                                </FormHelperText>
                                <FormHelperText id="username--text">
                                    Enter a Username
                                </FormHelperText>
                            </FormControl>

                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <Input
                                    id="email"
                                    placeholder='E-mail Address'
                                    name='email'
                                    type='email'
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    autoComplete='off'
                                />
                                <FormHelperText id="email-text">
                                    <strong>Required *</strong>
                                </FormHelperText>
                                <FormHelperText id="email ---text">
                                    Enter The E-mail address of your colleague
                                </FormHelperText>
                            </FormControl>

                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <Select
                                    id="status"
                                    name='type'
                                    value={this.state.type}
                                    onChange={this.handleChange}
                                    autoComplete='off'
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Reporter">Reporter</MenuItem>
                                  
                                </Select>
                                <FormHelperText id="type-text">
                                    Choose the type of the User, Default value is Admin
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
UserForm.contextType = AuthContext
export default UserForm;
