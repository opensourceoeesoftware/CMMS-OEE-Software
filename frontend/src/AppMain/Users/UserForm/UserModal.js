import React from 'react';
import { Dialog, Grid, Paper, Typography, AppBar, Toolbar, IconButton,Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
const UserModal = ({ open, handleClose, user }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="maintenance-modal-title"
            aria-describedby="maintenance-modal-description"
            fullScreen
            TransitionComponent={Transition}
        >
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
                        View User
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} sm={12}>
                    <Paper elevation={0} sx={{ p: 2, height: "100%" }}>
                        <Typography variant="h6" gutterBottom>
                            Basic Info
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>First name:</strong> {user.first_name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Last name:</strong> {user.last_name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Username:</strong> {user.username}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Email:</strong> {user.email}
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            <strong>Last login:</strong> {new Date(user.last_login).toUTCString()}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Date joined:</strong> {new Date(user.date_joined).toUTCString()}
                        </Typography>
                     
                    
                    </Paper>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default UserModal;
