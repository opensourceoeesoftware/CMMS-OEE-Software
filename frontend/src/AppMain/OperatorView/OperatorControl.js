import React, { Component } from 'react';
import Nav from '../../Layout/Nav/Nav';
import Sidebar from '../../Layout/Sidebar/Sidebar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {  Backdrop, CircularProgress,Paper } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import TuneIcon from '@mui/icons-material/Tune';

import { Grid,Box,Select,MenuItem,Menu } from '@mui/material';
import {Card,CardHeader,CardContent,IconButton} from '@mui/material';
import { FormControl, FormHelperText, TextField,Button  } from '@mui/material';
import axios from 'axios';
import AuthContext from '../../AuthProvider/AuthContext';
import OperatorButtons from './OperatorButtons';
import { url } from '../../Config';
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
        Control
    </Typography>,
];
class OperatorControl extends Component {
    constructor(propos) {
        super(propos)
        this.state = {
            is_loading: false,     
            assets:[],
            cells:[],
            faults:[],
            products:[],
            show_detail:false,
            selected_maintenance : {},
            selected_machine:''       
        }
        this.refreshData=this.refreshData.bind(this)
        this.handleOnClickEvent=this.handleOnClickEvent.bind(this)
        this.handleStopLoading=this.handleStopLoading.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleStartLoading=this.handleStartLoading.bind(this)
    }
    componentDidMount() {
        this.refreshData()
    }
    refreshData() {
        this.setState({...this.state,show_detail:false, is_loading:true},async ()=>{
            try {
                const response = await axios.get(url + '/api/v1/assets/', {
                  headers: {
                    'Authorization': "Token " + this.context.state.token
                  }
                });
                // check if stored asset
                var stored_id = localStorage.getItem('asset_uuid')
                var selected_machine = response?.data?.filter((e)=>e?.uuid === stored_id)
                if(selected_machine?.length > 0) {
                    
                 
                    selected_machine = selected_machine[0]?.['uuid']
                    
                }
                else {
                    console.log(response.data)
                    response.data ?
                    selected_machine = response.data[0]?.uuid
                    :
                    selected_machine = ''
                    localStorage.setItem('asset_uuid',selected_machine)
                }
                const response_cells = await axios.get(url + '/api/v2/cells-read/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
                const response_faults = await axios.get(url + '/api/v2/faults-read/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
                const response_products = await axios.get(url + '/api/v2/products-read/', {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
                this.setState({...this.state, 
                    assets:response.data,
                    cells:response_cells.data,
                    faults:response_faults.data,
                    products:response_products.data,
                    is_loading:false,
                    selected_machine:selected_machine})
              } catch (error) {
                console.log(error)
                  
                  toast.error("Something wrong! Please try again. Hint: "+ error.response?.data['detail']);
              
              } finally {
                this.setState({ is_loading: false });
              }
        })

    }
    handleOnClickEvent(event) {
      
        var selected = this.state.assets.filter((m)=>m.uuid===event.id)?.[0]
        this.setState({...this.state,selected_maintenance:selected,show_detail:true})
        }
    handleChange (e) {
        const { name, value } = e.target;
        if(name==="machine") localStorage.setItem('asset_uuid',value)
        this.setState({ [name]: value ,selected_machine:value});
    };
    handleStopLoading() {
    this.setState({...this.state,is_loading:false})
   

}
    handleStartLoading() {
    this.setState({...this.state,is_loading:true})
   

}
    render() {
        
        return (
            <>
                 <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={this.state.is_loading}>
                    <CircularProgress />
                 </Backdrop>
                <Nav></Nav>
                <Sidebar />
                <ToastContainer></ToastContainer>
             
                <div className='content-wrapper'>
                {/* <div className='content-header'>
                        <Stack spacing={2} justifyContent={'space-between'} direction="row" sx={{mb:2,p:1}}>
                            <TuneIcon/>
                            <Breadcrumbs separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                </div> */}
                <div className='container-fluid'>
                <Grid container spacing={2} sx={{mb:3,mt:2}}>
                  
                    
                  <Grid item xs={12} md={12} display={'flex'} alignItems={'end'}>
                    <Card sx={{width:'100%'}} elevation={0}>
                        <CardContent>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                          <Select
                              id="machine"
                              name='machine'
                              value={this.state.selected_machine}
                              onChange={this.handleChange}
                              autoComplete='off'
                          >
                              {this.state.assets.map((value,index)=>{
                                  return <MenuItem key={value.uuid} value={value.uuid}>{value.name}</MenuItem>
                              })}
                              
                          </Select>
                  
                      </FormControl>
                        </CardContent>
                    </Card>
                      
                      
                  
                  
              </Grid>
              </Grid>
              <OperatorButtons machine={this.state.selected_machine}
                               startLoad = {this.handleStartLoading}
                               stopLoad = {this.handleStopLoading}
                               cells={this.state.cells}
                               faults={this.state.faults}
                               products={this.state.products}
                                ></OperatorButtons>

               
             

                </div>
                       
                    
                </div>
            </>
        );
    }
}
OperatorControl.contextType=AuthContext
export default OperatorControl;