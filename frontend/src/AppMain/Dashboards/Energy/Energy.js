import React, { Component } from 'react';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {  Backdrop, CircularProgress,Grid } from '@mui/material';
import SensorsIcon from '@mui/icons-material/Sensors';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Stack from '@mui/material/Stack';
import { url } from '../../../Config';
import axios from 'axios';
import AuthContext from '../../../AuthProvider/AuthContext';


// import DowntimeSelector from '../Downtimes/Components/DowntimeSelector';
import OeeSelector from '../Oee/Components/OeeSelector';
import EnergyDurations from './Components/EnergyDurations';
import LiveEvents from '../Live/Components/LiveEvents';
import Costs from './Components/Costs';
const breadcrumbs = [

    <RouterLink
        to={'/'}
        replace={true}

    >
        Home
    </RouterLink>,
    <Typography key="3546546" color="text.primary">
        Energy & costs
    </Typography>,
];
class Energy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:false,
            event_data:[],
            machine:''
            
    
        }
   
        this.startLoading = this.startLoading.bind(this)
        this.onResult = this.onResult.bind(this)
       
    }
    startLoading() {
        this.setState({...this.state,is_loading:true})
    }
    onResult(data,machine) {
        this.setState({...this.state,event_data:data,machine:machine,is_loading:false})
        
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
                            <ElectricBoltIcon key={'dsadd'}></ElectricBoltIcon>
                            <Breadcrumbs key={'iujs'} separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                    </div>
                <div className='container-fluid'>
                <Grid container spacing={4} >
                    <Grid item md={12} xs={12} lg={12}>
                        <OeeSelector
                            startLoading = {this.startLoading}
                            onResult = {this.onResult}
                        ></OeeSelector>
                    </Grid>

                    <Grid item md={12} xs={12} lg={12} sx={{mb:2}}>
                        <LiveEvents data={this.state.event_data} machine={this.state.machine}></LiveEvents>       
                    </Grid>
                    <Grid item md={12} xs={12} lg={12} sx={{mb:0}}>
                        <Costs data={this.state.event_data}></Costs>                    
                    </Grid>
                    <Grid item md={12} xs={12} lg={12} sx={{mb:2}}>
                        <EnergyDurations data={this.state.event_data}></EnergyDurations>                    
                    </Grid>
                    
                </Grid>
                      
                </div>

                </div>
            </>
        );
    }
}
Energy.contextType = AuthContext
export default Energy;