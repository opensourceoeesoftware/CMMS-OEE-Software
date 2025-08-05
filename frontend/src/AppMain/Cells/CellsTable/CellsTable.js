import React, { Component } from 'react';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import AuthContext from '../../../AuthProvider/AuthContext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { url } from '../../../Config';
import Stack from '@mui/material/Stack';
import CellsDelete from '../CellsForm/CellsDelete'
import EnhancedTable from './Table';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import {  Backdrop, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { Link as RouterLink } from 'react-router-dom';
class CellsTable extends Component {
    constructor(propos) {
        super(propos)
        this.state = {
            is_loading: true,
            cells_data : [],
            cells_to_delete:[],
            delete_form:false,
            assets:[]
            
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
                const response = await axios.get(url + '/api/v2/cells-read/', {
                  headers: {
                    'Authorization': "Token " + this.context.state.token
                  }
                });
                const response2 = await axios.get(url + '/api/v1/assets/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
                this.setState({...this.state, cells_data:response.data,assets:response2.data})
              } catch (error) {
                  
                  toast.error("Something wrong! Please try again. Hint: "+ error.response.data['detail']);
     
              } finally {
                this.setState({ is_loading: false });
              }
        })

    }
    deleteData() {
        var tempthis= this
        this.setState({...this.state, is_loading:true},async ()=>{
            try {
                this.state.cells_to_delete.forEach(async (element) => {
                    try {
                        await axios.delete(url+ '/api/v2/cells/'+ element + '/', {
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

                toast.success("Cells deleted");
                
                
                
                
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
        this.setState({...this.state,delete_form:true, cells_to_delete:assets})
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

            <RouterLink
        to={'/'}
        replace={true}

    >
        Home
    </RouterLink>,
            <Typography key="663" color="text.primary">
                Cells table
            </Typography>,
        ];
        return (
            <>
                <Nav></Nav>
                <Sidebar />
                {this.state.delete_form && 
                <CellsDelete handleClose={this.onclose} 
                HandleConfirm={this.onDeleteAssets} 
                AssetsToDelete = {this.state.cells_to_delete.length}
                ></CellsDelete> }
                <ToastContainer></ToastContainer>

                <div className='content-wrapper'>
                    <div className='content-header'>
                        <Stack spacing={2} justifyContent={'space-between'} direction="row" sx={{mb:2,p:1}}>
                            <DashboardCustomizeIcon/>
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
                      
                      

                        <EnhancedTable rows={this.state.cells_data} 
                                       handleDelete={this.deleteAssets}
                                       OnUpdate = {this.OnUpdate}
                                       assets={this.state.assets}
                                       ></EnhancedTable>
                        

                    </div>
                </div>
            </>
        );
    }
}
CellsTable.contextType = AuthContext;
export default CellsTable;