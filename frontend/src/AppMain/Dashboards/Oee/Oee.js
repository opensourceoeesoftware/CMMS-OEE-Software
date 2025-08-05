import React, { Component } from 'react';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {  Backdrop, CircularProgress } from '@mui/material';
import SensorsIcon from '@mui/icons-material/Sensors';
import Stack from '@mui/material/Stack';
import { url } from '../../../Config';
import axios from 'axios';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import AuthContext from '../../../AuthProvider/AuthContext';
import OeeSelector from './Components/OeeSelector';
import OeeGraphs from './Components/OeeGraph';
import { Paper, Grid } from '@mui/material';
import LiveEvents from '../Live/Components/LiveEvents'
const breadcrumbs = [

    <RouterLink
        to={'/'}
        replace={true}

    >
        Home
    </RouterLink>,
    <Typography key="3" color="text.primary">
        Oee
    </Typography>,
];
class Oee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:false,
            oee_data:[],
            machine:''
            
    
        }
   
        this.startLoading = this.startLoading.bind(this)
        this.onResult = this.onResult.bind(this)
       
    }
    startLoading() {
        this.setState({...this.state,is_loading:true})
    }
    onResult(data,machine) {
        this.setState({...this.state,oee_data:data,is_loading:false,machine:machine})
        
    }
  
    render() {
        return (
            <>  <ToastContainer/>
                <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.is_loading}
                >
                    <CircularProgress />

                </Backdrop>
                <Nav></Nav>
                <Sidebar/>
                <div className='content-wrapper'>
                <div className='content-header'>
                        <Stack spacing={2} justifyContent={'space-between'} direction="row" sx={{mb:2,p:1}}>
                            <AutoModeIcon key={156}></AutoModeIcon>
                            <Breadcrumbs key={2985} separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                    </div>
                <div className='container-fluid' key={'oee'}>
                <Grid container spacing={4} >
                    <Grid item md={12} xs={12} lg={12}>

                        <OeeSelector
                            startLoading = {this.startLoading}
                            onResult = {this.onResult}
                        ></OeeSelector>
                    </Grid>
                    <Grid item md={12} xs={12} lg={12} sx={{mb:2}}>
                        <LiveEvents data={this.state.oee_data} machine={this.state.machine}></LiveEvents>       
                    </Grid>
                    <Grid item md={12} xs={12} lg={12} sx={{mb:2}}>

                        <OeeGraphs data={this.state.oee_data}></OeeGraphs>
                        
                    </Grid>
                </Grid>

                      
                </div>

                </div>
            </>
        );
    }
}
Oee.contextType = AuthContext
export default Oee;