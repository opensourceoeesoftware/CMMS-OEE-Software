
import React, { Component } from 'react';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import AuthContext from '../../../AuthProvider/AuthContext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { url } from '../../../Config';
import Stack from '@mui/material/Stack';
import ProductsDelete from '../ProductForm/ProductsDelete'
import EnhancedTable from './Table';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import {  Backdrop, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import CategoryIcon from '@mui/icons-material/Category';
import { Link as RouterLink } from 'react-router-dom';
class ProductsTable extends Component {
    constructor(propos) {
        super(propos)
        this.state = {
            is_loading: true,
            products_data : [],
            products_to_delete:[],
            delete_form:false,
            assets:[]
            
        }
        this.refreshData = this.refreshData.bind(this)
        this.deleteFaults = this.deleteFaults.bind(this)
        this.onDeleteProducts = this.onDeleteProducts.bind(this)
        this.onclose = this.onclose.bind(this)
        this.OnUpdate = this.OnUpdate.bind(this)
    }
     refreshData() {
        this.setState({...this.state, is_loading:true},async ()=>{
            try {
                const response = await axios.get(url + '/api/v2/products-read/', {
                  headers: {
                    'Authorization': "Token " + this.context.state.token
                  }
                });
                const response2 = await axios.get(url + '/api/v1/assets/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
                this.setState({...this.state, products_data:response.data,assets:response2.data})
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
                this.state.products_to_delete.forEach(async (element) => {
                    try {
                        await axios.delete(url+ '/api/v2/products-read/'+ element + '/', {
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

                toast.success("Products deleted");
                
                
                
                
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
    deleteFaults(assets) {
        this.setState({...this.state,delete_form:true, products_to_delete:assets})
    }
    async onDeleteProducts() {
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
            <Typography key="65463kliuzu" color="text.primary">
                Products table
            </Typography>,
        ];
        return (
            <>
                <Nav></Nav>
                <Sidebar />
                {this.state.delete_form && 
                <ProductsDelete handleClose={this.onclose} 
                HandleConfirm={this.onDeleteProducts} 
                AssetsToDelete = {this.state.products_to_delete.length}
                ></ProductsDelete> }
                <ToastContainer></ToastContainer>

                <div className='content-wrapper'>
                    <div className='content-header'>
                        <Stack spacing={2} justifyContent={'space-between'} direction="row" sx={{mb:2,p:1}}>
                            <CategoryIcon/>
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
                      
                      

                        <EnhancedTable rows={this.state.products_data} 
                                       handleDelete={this.deleteFaults}
                                       OnUpdate = {this.OnUpdate}
                                       assets={this.state.assets}
                                       ></EnhancedTable>
                        

                    </div>
                </div>
            </>
        );
    }
}
ProductsTable.contextType = AuthContext;
export default ProductsTable;