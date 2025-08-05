import React from 'react';
import { Dialog,Modal, Box, Typography, Grid, Paper, Button, CardMedia, AppBar,
    Toolbar,Slide,
    IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
const ProductModal = ({ open, handleClose, product }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="product-modal-title"
            aria-describedby="product-modal-description"
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
                                View product
                            </Typography>
                            
                        </Toolbar>
                    </AppBar>

                <Grid container spacing={2} sx={{p:2}}>
                   
                    <Grid item xs={12} sm={10}>
                        <Paper elevation={0} sx={{ p: 2 ,height:"100%"}}>
                            <Typography variant="h6" gutterBottom>
                                Basic Info
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Product Name:</strong> {product?.product_name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Product ID:</strong> {product?.product_id}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Ideal cycle (s):</strong> {product?.ideal_cycle}
                            </Typography>
                      
                        </Paper>
                    </Grid>
                </Grid>
            
             
         
        </Dialog>
    );
};

export default ProductModal;
