import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {  Backdrop, CircularProgress } from '@mui/material';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import AuthContext from '../../../AuthProvider/AuthContext';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BarChartIcon from '@mui/icons-material/BarChart';
import MaintenancePapers from './Components/MaintenancePapers';
import MaintenanceMetrics from './Components/MaintenanceMetrics';
import MaintenancesGraph from './Components/MaintenancesGraph';
import { url } from '../../../Config';
const breadcrumbs = [

    <RouterLink
        to={'/'}
        replace={true}

    >
        Home
    </RouterLink>,
    <Typography key="3yx446asd" color="text.primary">
        Maintenance dashboard
    </Typography>,
];
class MaintenanceDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:true,
            maintenances:[],
            assets:[],
            users:[]
        }
        this.refreshData=this.refreshData.bind(this)
    }
    refreshData() {
        this.setState({...this.state, is_loading:true},async ()=>{
            try {
                const response = await axios.get(url + '/api/v1/maintenances/', {
                  headers: {
                    'Authorization': "Token " + this.context.state.token
                  }
                });
                const assets_res = await axios.get(url + '/api/v1/assets/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
                const users_res = await axios.get(url + '/api/v1/profile-users/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
               
                this.setState({...this.state, maintenances:response.data,assets:assets_res.data,users:users_res.data,is_loading:false})
              } catch (error) {
                  
                  toast.error("Something wrong! Please try again. Hint: "+ error.response.data['detail']);
              
              } finally {
                this.setState({ is_loading: false });
              }
        })

    }
    componentDidMount() {
        this.refreshData()
    }
    render() {
        const {maintenances,users,assets} = this.state
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
                            <BarChartIcon/>
                            <Breadcrumbs separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                    </div>
                <div className='container-fluid'>
                    <MaintenancePapers maintenances={maintenances}/>
                    <MaintenanceMetrics maintenances={maintenances}/> 
                    <MaintenancesGraph maintenances={maintenances} users={users} assets={assets}/>
        
                </div>

                </div>
            </>
        );
    }
}
MaintenanceDashboard.contextType=AuthContext
export default MaintenanceDashboard;