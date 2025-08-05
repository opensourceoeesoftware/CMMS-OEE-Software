import React from 'react';
import { Dialog, Typography, Grid, Paper, CardMedia, AppBar,
    Toolbar,
    IconButton, Slide} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

const AssetModal = ({ open, handleClose, asset }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="asset-modal-title"
            aria-describedby="asset-modal-description"
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
                                View asset
                            </Typography>
                            
                        </Toolbar>
                    </AppBar>

                <Grid container spacing={2} sx={{p:2}}>
                    <Grid item xs={12} sm={2}>
                        <CardMedia
                            component="img"
                            image={asset.photo}
                            alt={asset.name}
                            sx={{ maxHeight: 400, objectFit: 'cover', marginBottom: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Paper elevation={0} sx={{ p: 2 ,height:"100%"}}>
                            <Typography variant="h6" gutterBottom>
                                Basic Info
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Name:</strong> {asset.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            <strong>Reference:</strong> {asset.ref}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Type:</strong> {asset.asset_type}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Serial Number:</strong> {asset.serial_number}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Status:</strong> {asset.status}
                            </Typography>
                           
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Additional Info
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Location:</strong> {asset.location}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Purchase Date:</strong> {new Date(asset.purchase_date).toUTCString()}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Warranty Expiration Date:</strong> {new Date(asset.warranty_expiration_date).toUTCString()}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Created At:</strong> {new Date(asset.created_at).toUTCString()}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Last Updated At:</strong> {new Date(asset.last_updated_at).toUTCString()}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Cost:</strong> {asset.cost}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Current Value:</strong> {asset.current_value}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
             
         
        </Dialog>
    );
};

export default AssetModal;
