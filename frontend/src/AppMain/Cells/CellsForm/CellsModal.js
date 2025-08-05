import React from 'react';
import { Dialog,Modal, Box, Typography, Grid, Paper, Button, CardMedia, AppBar,
    Toolbar,Slide,
    IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
const CellsModal = ({ open, handleClose, cell }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="cell-modal-title"
            aria-describedby="cell-modal-description"
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
                                View cell
                            </Typography>
                            
                        </Toolbar>
                    </AppBar>

                <Grid container spacing={2} sx={{p:2}}>
                    <Grid item xs={12} sm={2}>
                        <CardMedia
                            component="img"
                            image={cell?.machine?.photo}
                            alt={cell?.machine?.name}
                            sx={{ maxHeight: 400, objectFit: 'cover', marginBottom: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Paper elevation={0} sx={{ p: 2 ,height:"100%"}}>
                            <Typography variant="h6" gutterBottom>
                                Basic Info
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Cell Name:</strong> {cell?.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Line Name:</strong> {cell?.machine?.name}
                            </Typography>
                      
                        </Paper>
                    </Grid>
                </Grid>
            
             
         
        </Dialog>
    );
};

export default CellsModal;
