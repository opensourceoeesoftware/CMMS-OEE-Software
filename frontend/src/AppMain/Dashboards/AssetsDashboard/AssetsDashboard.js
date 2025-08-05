import React, { Component } from 'react';
import AssetsPapers from './Components/AssetsPapers';
import AssetsGraphs from './Components/AssetsGraphs';
import AssetsMetrics from './Components/AssetsMetrics';
import axios from 'axios';
import { url } from '../../../Config';
import { ToastContainer, toast } from 'react-toastify';
import {  Backdrop, CircularProgress } from '@mui/material';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import AuthContext from '../../../AuthProvider/AuthContext';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
const breadcrumbs = [

    <RouterLink
        to={'/'}
        replace={true}

    >
        Home
    </RouterLink>,
    <Typography key="3" color="text.primary">
        Assets dashboard
    </Typography>,
];
class AssetsDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:true,
            assets:[]
        }
        this.refreshData=this.refreshData.bind(this)
    }
    refreshData() {
        this.setState({...this.state, is_loading:true},async ()=>{
            try {
                const response = await axios.get(url + '/api/v1/assets/', {
                  headers: {
                    'Authorization': "Token " + this.context.state.token
                  }
                });
               
                this.setState({...this.state, assets:response.data,is_loading:false})
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
        const {assets} = this.state
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
                            <AutoGraphIcon key={1}></AutoGraphIcon>
                            <Breadcrumbs key={2} separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                    </div>
                <div className='container-fluid'>

                <AssetsPapers assets={assets}></AssetsPapers>
                <AssetsMetrics assets={assets}></AssetsMetrics>
                <AssetsGraphs assets={assets}></AssetsGraphs>           
                </div>

                </div>
            </>
        );
    }
}
AssetsDashboard.contextType=AuthContext
export default AssetsDashboard;