import React, { Component } from 'react';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import AuthContext from '../../../AuthProvider/AuthContext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { url } from '../../../Config';
import EnhancedTable from './Table';

import {  Backdrop, CircularProgress} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import AssetsDelete from '../MaintenanceForm/MaintenanceDelete'
import ConstructionIcon from '@mui/icons-material/Construction';
import MaintenancePapers from '../../Dashboards/MaintenanceDashboard/Components/MaintenancePapers';
class AssetsTable extends Component {
    constructor(propos) {
        super(propos)
        this.state = {
            is_loading: true,
            assets_data : [],
            assets_to_delete:[],
            delete_form:false,
            assets:[],
            users:[]
            
        }
        this.refreshData = this.refreshData.bind(this)
        this.deleteAssets = this.deleteAssets.bind(this)
        this.onDeleteAssets = this.onDeleteAssets.bind(this)
        this.onclose = this.onclose.bind(this)
        this.OnUpdate = this.OnUpdate.bind(this)
    }
     refreshData() {
        this.setState({...this.state, is_loading:true},async ()=>{
            try {
                const response = await axios.get(url + '/api/v1/maintenances/', {
                  headers: {
                    'Authorization': "Token " + this.context.state.token
                  }
                });
                const response2 = await axios.get(url + '/api/v1/assets/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
                const response3 = await axios.get(url + '/api/v1/profile-users/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
               
                this.setState({...this.state,assets_data:response.data, assets:response2.data,users:response3.data})
              } catch (error) {
                
                  toast.error("Something wrong! Please try again. Hint: "+ error.response.data['detail']);
              //   toast.error("Please check all the info below and try again");
              } finally {
                this.setState({ is_loading: false });
              }
        })

    }
    deleteData() {
        var tempthis= this
        this.setState({...this.state, is_loading:true},async ()=>{
            try {
                this.state.assets_to_delete.forEach(async (element) => {
                    try {
                        const response = await axios.delete(url + '/api/v1/maintenances-plans/'+ element + '/', {
                          headers: {
                            'Authorization': "Token " + this.context.state.token
                          }
                          
                        });
                    } catch (error) {
                        
                        toast.error("Something wrong! Please try again. Hint: "+ error.response.data['detail']);
                      
                    } finally {
                        tempthis.refreshData()
                    }
                    
                });

                toast.success("Assets deleted");
               
                
                
                
            } catch (error) {
                this.setState({ is_loading: false },()=>{
                    this.refreshData()
                });
                toast.error("Something wrong! Please try again. Hint: "+ error);
               
                
            }   
           
        })

    }
    async componentDidMount() {

        this.refreshData()

    }
    OnUpdate() {

        this.refreshData()

    }
    deleteAssets(assets) {
        this.setState({...this.state,delete_form:true, assets_to_delete:assets})
    }
    async onDeleteAssets() {
        this.setState({...this.state,delete_form:false,is_loading:true},()=>{
         this.deleteData()
           
            
            
        })
    }
    onclose() {
        this.setState({...this.state,delete_form:false})
    }
    render() {
       
        const breadcrumbs = [

            <Link
                underline="hover"
                key="2"
                color="inherit"
                href="/"

            >
                Home
            </Link>,
            <Typography key="3" color="text.primary">
                Planned maintenance table
            </Typography>,
        ];
        return (
            <>
                <Nav></Nav>
                <Sidebar />
                {this.state.delete_form && 
                <AssetsDelete handleClose={this.onclose} 
                HandleConfirm={this.onDeleteAssets} 
                AssetsToDelete = {this.state.assets_to_delete.length}
                ></AssetsDelete> }
                <ToastContainer></ToastContainer>

                <div className='content-wrapper'>
                <div className='content-header'>
                        <Stack spacing={2} justifyContent={'space-between'} direction="row" sx={{mb:2,p:1}}>
                            <ConstructionIcon/>
                            <Breadcrumbs separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                    </div>


                    <div className='container-fluid'>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={this.state.is_loading}
                        >
                            <CircularProgress />
                        </Backdrop>

                        <MaintenancePapers maintenances={this.state.assets_data}></MaintenancePapers>

                        <EnhancedTable rows={this.state.assets_data} 
                                       handleDelete={this.deleteAssets}
                                       OnUpdate = {this.OnUpdate}
                                       assets = {this.state.assets}
                                       users = {this.state.users}
                                       ></EnhancedTable>

                    </div>
                </div>
            </>
        );
    }
}
AssetsTable.contextType = AuthContext;
export default AssetsTable;