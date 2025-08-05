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
import AuthContext from '../../../AuthProvider/AuthContext';
import LineCard from './Components/LineCard';
import axios from 'axios';
import {Grid} from '@mui/material';
const breadcrumbs = [

    <RouterLink
        to={'/'}
        replace={true}

    >
        Home
    </RouterLink>,
    <Typography key="3" color="text.primary">
        Live view
    </Typography>,
];
class Live extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:true,
            list:[],
            socket:undefined,
            assets:[]
        }
        this.getAssetData = this.getAssetData.bind(this)
       
    }
    async getAssetData() {
        try {
            const response = await axios.get(url + '/api/v1/assets/', {
              headers: {
                'Authorization': "Token " + this.context.state.token
              }
            });
           
            this.setState({...this.state, assets:response.data,is_loading:false})
          }
          catch (error) {
                  
            toast.error("Something wrong! Please try again. Hint: "+ error.response.data['detail']);
        
        } finally {
          this.setState({ is_loading: false });
        }
    }
    componentDidMount() {
        this.getAssetData()
     
    }
    componentWillUnmount() {
        this.state.socket?.close()
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
                            <SensorsIcon key={16564}></SensorsIcon>
                            <Breadcrumbs key={2} separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                    </div>
                <div className='container-fluid'>
                <Grid container spacing={4} >
                    {this.state.assets?.map((value,index)=>{
                         
                         return <Grid item md={6} xs={12} lg={3} key={value.uuid}>

                                    <LineCard machine={value}></LineCard>
                                </Grid>
                    })}
                </Grid>
                

                      
                </div>

                </div>
            </>
        );
    }
}
Live.contextType = AuthContext
export default Live;