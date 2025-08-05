import React, { Component } from 'react';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {  Backdrop, CircularProgress } from '@mui/material';

import Stack from '@mui/material/Stack';

import AuthContext from '../../../AuthProvider/AuthContext';

import DowntimeDurations from './Components/DowntimeDurations';
import { Paper, Grid } from '@mui/material';
import DowntimesCharts from './Components/DowntimesCharts';
import LiveEvents from '../Live/Components/LiveEvents';
import GppBadIcon from '@mui/icons-material/GppBad';
import OeeSelector from '../Oee/Components/OeeSelector';
const breadcrumbs = [

    <RouterLink
        to={'/'}
        replace={true}

    >
        Home
    </RouterLink>,
    <Typography key="3" color="text.primary">
        Downtimes
    </Typography>,
];
class Downtimes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:false,
            downtime_data:[],
            machine:''
            
    
        }
   
        this.startLoading = this.startLoading.bind(this)
        this.onResult = this.onResult.bind(this)
       
    }
    startLoading() {
        this.setState({...this.state,is_loading:true})
    }
    onResult(data,machine) {
        this.setState({...this.state,downtime_data:data,machine:machine,is_loading:false})
        
    }
  
    render() {
        
        return (
            < >  
            <ToastContainer/>
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
                            <GppBadIcon key={1}></GppBadIcon>
                            <Breadcrumbs key={2} separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                    </div>
                <div className='container-fluid' key={'downtimes'}>
                <Grid container spacing={4} >
                    <Grid item md={12} xs={12} lg={12}>

                        <OeeSelector
                            startLoading = {this.startLoading}
                            onResult = {this.onResult}
                        ></OeeSelector>
                    </Grid>
                    <Grid item md={12} xs={12} lg={12} sx={{mb:2}}>
                    <LiveEvents data={this.state.downtime_data} machine={this.state.machine}></LiveEvents>
                     
                        
                    </Grid>
                    <Grid item md={12} xs={12} lg={12} sx={{mb:2}}>
                    <DowntimeDurations data={this.state.downtime_data} ></DowntimeDurations>
                     
                        
                    </Grid>
                    <Grid item md={12} xs={12} lg={12} sx={{mb:2}}>
                    <DowntimesCharts data={this.state.downtime_data}></DowntimesCharts>
                     
                        
                    </Grid>
                </Grid>

                      
                </div>

                </div>
            </>
        );
    }
}
Downtimes.contextType = AuthContext
export default Downtimes;