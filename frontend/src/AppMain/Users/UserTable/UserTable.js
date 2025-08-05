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

import {  Backdrop, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import UserDelete from '../UserForm/UserDelete'
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
class UserTable extends Component {
    constructor(propos) {
        super(propos)
        this.state = {
            is_loading: true,
            users_data : [],
            users_to_delete:[],
            delete_form:false,
            
        }
        this.refreshData = this.refreshData.bind(this)
        this.deleteUsers = this.deleteUsers.bind(this)
        this.onDeleteUsers = this.onDeleteUsers.bind(this)
        this.onclose = this.onclose.bind(this)
        this.OnUpdate = this.OnUpdate.bind(this)
    }
     refreshData() {
        this.setState({...this.state, is_loading:true},async ()=>{
            try {
                const response = await axios.get(url + '/api/v1/profile-users/', {
                  headers: {
                    'Authorization': "Token " + this.context.state.token
                  }
                });
               
                this.setState({...this.state, users_data:response.data})
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
                this.state.users_to_delete.forEach(async (element) => {
                    try {
                        await axios.delete(url + '/api/v1/profile-users/'+ element + '/', {
                          headers: {
                            'Authorization': "Token " + this.context.state.token
                          }
                          
                        });
                        toast.success("Users deleted");
                    } catch (error) {
                        
                        toast.error("Something wrong! Please try again. Hint: "+ error.response.data['detail']);
                      
                    } finally {
                        
                        tempthis.refreshData()
                    }
                    
                });

                
                
                
                
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
    deleteUsers(assets) {
        this.setState({...this.state,delete_form:true, users_to_delete:assets})
    }
    async onDeleteUsers() {
        this.setState({...this.state,delete_form:false,is_loading:true}, ()=>{
          this.deleteData()
        //  this.refreshData()
           
            
            
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
                Users table
            </Typography>,
        ];
        return (
            <>
                <Nav></Nav>
                <Sidebar />
                {this.state.delete_form && 
                <UserDelete handleClose={this.onclose} 
                HandleConfirm={this.onDeleteUsers} 
                AssetsToDelete = {this.state.users_to_delete.length}
                ></UserDelete> }
                <ToastContainer></ToastContainer>

                <div className='content-wrapper'>
                <div className='content-header'>
                        <Stack spacing={2} justifyContent={'space-between'} direction="row" sx={{mb:2,p:1}}>
                            <PersonIcon/>
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


                        <EnhancedTable rows={this.state.users_data} 
                                       handleDelete={this.deleteUsers}
                                       OnUpdate = {this.OnUpdate}
                                       ></EnhancedTable>

                    </div>
                </div>
            </>
        );
    }
}
UserTable.contextType = AuthContext;
export default UserTable;