import React from 'react';
import { url as url_base } from '../../Config';
import { Dialog, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Divider, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AssetCard from './AssetCard';
import MaintenanceCard from './MaintenanceCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AuthContext from '../../AuthProvider/AuthContext';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Backdrop, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
class MaintenanceReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            isMenuOpen: false,
            is_loading: false
        }
        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this)
        this.HandleCloseMenu = this.HandleCloseMenu.bind(this)
        this.handleStartClick = this.handleStartClick.bind(this)
        this.handlePauseClick = this.handlePauseClick.bind(this)
        this.handleFinishClick = this.handleFinishClick.bind(this)
        this.handleCancelClick = this.handleCancelClick.bind(this)
    }
    handleProfileMenuOpen(event) {
        this.setState({ ...this.state, anchorEl: event.currentTarget, isMenuOpen: true })
    }
    HandleCloseMenu(event) {
        this.setState({ ...this.state, isMenuOpen: false })
    }
    async handleStartClick() {
        this.setState({ ...this.state, is_loading: true })
        try {
            let maintenance = this.props.maintenance; // Get the maintenance object from props
            const method = 'patch'
            const url = url_base + '/api/v1/maintenances-plans/' + maintenance.uuid + '/';
            var started_at = new Date()
            started_at.setHours(new Date().getHours() + 2)
            var data = { status: 'In Progress', started_at: started_at.toISOString() }
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key])
                    formData.append(key, data[key]);
            });

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + this.context.state.token
                }
            });

            toast.success(`Maintenance Plan ${maintenance ? 'updated' : 'created'}`);
            this.setState({ ...this.state, is_loading: false })
            if (this.props.handleClose)
                this.props.handleClose();

        } catch (error) {

            toast.error("Something went wrong! Please try again. Hint: " + error?.response?.data['detail']);
        } finally {
            this.setState({ is_loading: false });
            if (this.props.handleClose)
                this.props.handleClose();
        }

    }
    async handleFinishClick() {
        this.setState({ ...this.state, is_loading: true })
        try {
            let maintenance = this.props.maintenance; // Get the maintenance object from props
            const method = 'patch'
            const url = url_base + '/api/v1/maintenances-plans/' + maintenance.uuid + '/';
            var finished_at = new Date()
            finished_at.setHours(new Date().getHours() + 2)
            var data = { status: 'Completed', finished_at: finished_at.toISOString() }
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key])
                    formData.append(key, data[key]);
            });

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + this.context.state.token
                }
            });

            toast.success(`Maintenance Plan ${maintenance ? 'updated' : 'created'}`);
            this.setState({ ...this.state, is_loading: false })
            if (this.props.handleClose)
                this.props.handleClose();

        } catch (error) {

            toast.error("Something went wrong! Please try again. Hint: " + error?.response?.data['detail']);
        } finally {
            this.setState({ is_loading: false });
            if (this.props.handleClose)
                this.props.handleClose();
        }

    }
    async handlePauseClick() {
        this.setState({ ...this.state, is_loading: true })
        try {
            let maintenance = this.props.maintenance; // Get the maintenance object from props
            const method = 'patch'
            const url = url_base + '/api/v1/maintenances-plans/' + maintenance.uuid + '/';

            var data = { status: 'Pending' }
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key])
                    formData.append(key, data[key]);
            });

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + this.context.state.token
                }
            });

            toast.success(`Maintenance Plan ${maintenance ? 'updated' : 'created'}`);
            if (this.props.handleClose)
                this.props.handleClose();
            // this.setState({...this.state,is_loading:false})

        } catch (error) {

            toast.error("Something went wrong! Please try again. Hint: " + error?.response?.data['detail']);
        } finally {
            this.setState({ is_loading: false });
            if (this.props.handleClose)
                this.props.handleClose();
        }

    }
    async handleCancelClick() {
        this.setState({ ...this.state, is_loading: true })
        try {
            let maintenance = this.props.maintenance; // Get the maintenance object from props
            const method = 'patch'
            const url = url_base + '/api/v1/maintenances-plans/' + maintenance.uuid + '/';

            var data = { status: 'Cancelled' }
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key])
                    formData.append(key, data[key]);
            });

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + this.context.state.token
                }
            });

            toast.success(`Maintenance Plan ${maintenance ? 'updated' : 'created'}`);
            if (this.props.handleClose)
                this.props.handleClose();
            // this.setState({...this.state,is_loading:false})

        } catch (error) {

            toast.error("Something went wrong! Please try again. Hint: " + error?.response?.data['detail']);
        } finally {
            this.setState({ is_loading: false });
            if (this.props.handleClose)
                this.props.handleClose();
        }

    }
    render() {
        const { show, handleClose, maintenance } = this.props
        const menuId = 'primary-search-account-menu';
        return (
            <Dialog
                open={show}
                onClose={handleClose}
                aria-labelledby="maintenance-modal-title"
                aria-describedby="maintenance-modal-description"
                fullScreen
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
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            View Maintenance Plan
                        </Typography>

                    </Toolbar>
                </AppBar>
                {/* <ToastContainer></ToastContainer> */}
                <Grid container spacing={2} sx={{ p: 2 }}>

                    {maintenance?.status === 'Pending' &&
                        <Grid item xs={12} md={3} sx={{ justifyContent: 'center', display: 'flex' }}>
                            <Paper elevation={1}
                                onClick={this.handleStartClick}
                                sx={{
                                    justifyContent: 'center',
                                    height: 100,
                                    width: "75%",
                                    bgcolor: 'success.main',
                                    display: "flex",
                                    alignItems: 'center',
                                    ":hover": { cursor: 'pointer' }
                                }}>
                                <PlayCircleOutlineIcon fontSize={'large'} sx={{ fill: 'white' }} ></PlayCircleOutlineIcon>
                                <Typography align='center' variant="h4" component="div" color={'white'} sx={{ ml: 2 }}>
                                    Start
                                </Typography>
                            </Paper>
                        </Grid>
                    }

                    {maintenance?.status === 'In Progress' &&
                        <Grid item xs={12} md={3} sx={{ justifyContent: 'center', display: 'flex' }}>
                            <Paper elevation={1}
                                onClick={this.handleFinishClick}
                                sx={{
                                    justifyContent: 'center',
                                    height: 100,
                                    width: "75%",
                                    bgcolor: 'success.main',
                                    display: "flex",
                                    alignItems: 'center',
                                    ":hover": { cursor: 'pointer' }
                                }}>
                                <CheckCircleIcon fontSize={'large'} sx={{ fill: 'white' }} ></CheckCircleIcon>
                                <Typography align='center' variant="h4" component="div" color={'white'} sx={{ ml: 2 }}>
                                    Finish
                                </Typography>
                            </Paper>
                        </Grid>
                    }
                    {maintenance?.status === 'In Progress' &&
                        <Grid item xs={12} md={3} sx={{ justifyContent: 'center', display: 'flex' }}>
                            <Paper elevation={1}
                                onClick={this.handlePauseClick}
                                sx={{
                                    justifyContent: 'center',
                                    height: 100,
                                    width: "75%",
                                    bgcolor: 'info.main',
                                    display: "flex",
                                    alignItems: 'center',
                                    ":hover": { cursor: 'pointer' }
                                }}>
                                <PauseCircleIcon fontSize={'large'} sx={{ fill: 'white' }} ></PauseCircleIcon>
                                <Typography align='center' variant="h4" component="div" color={'white'} sx={{ ml: 2 }}>
                                    Pause
                                </Typography>
                            </Paper>
                        </Grid>
                    }
                    {true &&
                        <Grid item xs={12} md={3} sx={{ justifyContent: 'center', display: 'flex' }}>
                            <Paper elevation={1}
                                onClick={this.handleCancelClick}
                                sx={{
                                    justifyContent: 'center',
                                    height: 100,
                                    width: "75%",
                                    bgcolor: 'error.main',
                                    display: "flex",
                                    alignItems: 'center',
                                    ":hover": { cursor: 'pointer' }
                                }}>
                                <CancelIcon fontSize={'large'} sx={{ fill: 'white' }} ></CancelIcon>
                                <Typography align='center' variant="h4" component="div" color={'white'} sx={{ ml: 2 }}>
                                    Cancel
                                </Typography>
                            </Paper>
                        </Grid>
                    }

                </Grid>
                <Divider sx={{mb:2}}></Divider>
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={12} sm={12} md={4} justifyContent={'center'} sx={{ display: 'flex' }}>
                        <AssetCard asset={maintenance?.asset}></AssetCard>
                    </Grid>


                    <Grid item xs={12} sm={12} md={8} justifyContent={'center'} sx={{ display: 'flex' }}>
                        <MaintenanceCard asset={maintenance?.asset} maintenance={maintenance}></MaintenanceCard>
                        {/* <Typography variant="body1" gutterBottom>
                        <strong>Instructions:</strong>{" "}
                        {maintenance.instructions && (
                            <a href={maintenance.instructions} target='blank' download>
                                Download File
                            </a>
                        )}
                    </Typography>          */}
                    </Grid>
                </Grid>
            </Dialog>
        );
    }
}
MaintenanceReport.contextType = AuthContext
export default MaintenanceReport;
