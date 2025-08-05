import React from 'react';
import { Dialog, Grid, Paper, Typography, AppBar, Toolbar, IconButton,Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MaintenanceCard from '../../OperatorView/MaintenanceCard';
import AssetCard from '../../OperatorView/AssetCard';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
const MaintenanceModal = ({ open, handleClose, maintenance }) => {
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
                        View Maintenance Plan
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} sm={12} justifyContent={'center'} sx={{display:'flex'}}>
                   
                        <AssetCard asset={maintenance?.asset}></AssetCard>
                        {/* <MaintenanceCard maintenance={maintenance}></MaintenanceCard> */}
                        
                   
                </Grid>
                <Grid item xs={12} sm={12} justifyContent={'center'} sx={{display:'flex'}}>
                  
                        <MaintenanceCard maintenance={maintenance}></MaintenanceCard>
                        
                    
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default MaintenanceModal;
