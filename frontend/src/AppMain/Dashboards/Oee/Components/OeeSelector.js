import React, { Component } from 'react';
import { url } from '../../../../Config';
import axios from 'axios';
import AuthContext from '../../../../AuthProvider/AuthContext';
import {  toast } from 'react-toastify';
import { Grid,Box,Select,MenuItem } from '@mui/material';
import {Card,CardHeader,CardContent,IconButton} from '@mui/material';
import { FormControl, TextField,Button  } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import CachedIcon from '@mui/icons-material/Cached';
import PrintIcon from '@mui/icons-material/Print';
function formatDateForInput(date) {
    const d = new Date(date);
    const pad = (n) => n < 10 ? '0' + n : n;
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}
class OeeSelector extends Component {
    constructor(props) {
        super(props)
        var selected_period = localStorage.getItem('prefered_period')
        var selected_scale = localStorage.getItem('prefered_scale')
        if (!selected_period || !selected_scale) {
           selected_period = 1
         selected_scale = 'h'
        }
        else {
          selected_period= parseInt(selected_period)
        }
        let created_at__gte = formatDateForInput(new Date(new Date().setDate(new Date().getDate() - selected_period)).toString()) // get 1 day ago
        if(selected_scale ==='h') {
            created_at__gte = formatDateForInput(new Date(new Date().setHours(new Date().getHours() - selected_period)).toString()) // get 1 day ago
        }
        
         let created_at__lte = formatDateForInput(new Date(new Date().setHours(new Date().getHours() + 1)).toString()) // get 1 hours later


        this.state = {
            
            assets_data:[],
            events_data:[],
            selected_machine : '',
            created_at__gte :created_at__gte,
            created_at__lte :created_at__lte,
            machine:'',
            anchorEl:null,
            filter_open:false,
            selected_period: selected_period,
            scale:selected_scale
        }
        this.refreshData = this.refreshData.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.filterData = this.filterData.bind(this)
        this.handleCloseFilter = this.handleCloseFilter.bind(this)
        this.handleClickFilter = this.handleClickFilter.bind(this)
        this.handleCommonDate = this.handleCommonDate.bind(this)
       
    }
        handleClickFilter(event) {
        this.setState({...this.state, filter_open:true});
      }
        handleCloseFilter() {
            
        this.setState({...this.state,filter_open:false});
      }
    componentDidMount() {
        this.refreshData()
    }
    filterData() {
      if (this.state.machine ===''){
        
        toast.info("You have no line created, go to the Sidebar -> Lines to start!",{autoClose:false});
        return
      } 
        if(this.props.startLoading) this.props.startLoading()
            this.setState({...this.state, is_loading:true},async ()=>{
                try {
                   
                 
                    
                    var filter_url = url + '/api/v2/downtime/?'
                    filter_url += 'machine=' + this.state.machine + '&'
                    filter_url += 'created_at__gte=' + this.state.created_at__gte + '&'
                    filter_url += 'created_at__lte=' + this.state.created_at__lte + '&'
    
                    const response_events = await axios.get(filter_url, {
                        headers: {
                          'Authorization': "Token " + this.context.state.token
                        }
                      });
                    
                    
                    this.setState({...this.state,events_data:response_events.data})
                    if(this.props.onResult)this.props.onResult(response_events.data,this.state.machine)
                  } catch (error) {
                      
                      toast.error("Something wrong! Please try again. Hint: "+ error.response?.data['detail']);
                      if(this.props.onResult)this.props.onResult([],'')
                  //   toast.error("Please check all the info below and try again");
                  } finally {
                    this.setState({ is_loading: false });
                  }
            })
    }
    refreshData() {
        if(this.props.startLoading) this.props.startLoading()
        this.setState({...this.state, is_loading:true},async ()=>{
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
                
                    response.data ?
                    selected_machine = response.data[0]?.uuid
                    :
                    selected_machine = ''
                    localStorage.setItem('asset_uuid',selected_machine)
                }
                if(!selected_machine) {
                    toast.info("You have no line created, go to the Sidebar -> Lines to start!",{autoClose:false});
                  if(this.props.onResult)this.props.onResult([],'')
                    return
                }
                
                var filter_url = url + '/api/v2/downtime/?'
                filter_url += 'machine=' + selected_machine + '&'
                filter_url += 'created_at__gte=' + this.state.created_at__gte + '&'
                filter_url += 'created_at__lte=' + this.state.created_at__lte + '&'

                const response_events = await axios.get(filter_url, {
                    headers: {
                      'Authorization': "Token " + this.context.state.token
                    }
                  });
                
                
                this.setState({...this.state,assets_data:response.data,events_data:response_events.data,machine:selected_machine})
                if(this.props.onResult)this.props.onResult(response_events.data,selected_machine)
              } catch (error) {
                   
                  toast.error("Something wrong! Please try again. Hint: "+ error.response?.data['detail']);
                  if(this.props.onResult)this.props.onResult([],'')
              //   toast.error("Please check all the info below and try again");
              } finally {
                this.setState({ is_loading: false });
              }
        })


    }
    handleDateChange = (e) => {
        const { name, value } = e.target;
      
        this.setState({ [name]: formatDateForInput(value) });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        if(name==="machine") localStorage.setItem('asset_uuid',value)
        this.setState({ [name]: value },()=>{
        this.refreshData()
        });
    };
    handleCommonDate(value,scale) {

        let created_at__gte = formatDateForInput(new Date(new Date().setDate(new Date().getDate() - value)).toString()) // get 1 day ago
        if(scale==='h') {
        created_at__gte = formatDateForInput(new Date(new Date().setHours(new Date().getHours() - value)).toString()) // get 1 day ago
        }
        
         let created_at__lte =formatDateForInput(new Date(new Date().setHours(new Date().getHours() + 1)).toString()) // get 1 hours later

        this.setState({...this.state, created_at__lte:created_at__lte,created_at__gte:created_at__gte,selected_period:value},()=>{
            this.filterData()
        })
        localStorage.setItem('prefered_period',value)
        localStorage.setItem('prefered_scale',scale)

    }
    render() {
       
        
        return (
            <>
            <Box sx={{ flexGrow: 1 }}>
      
          <Card elevation={0}>
          <CardHeader
        
        action={

            <>
            <IconButton aria-label="settings" onClick={this.filterData} color='primary'>
            <CachedIcon />
          </IconButton>
            <IconButton aria-label="settings" onClick={()=>window.print()} color='primary'>
            <PrintIcon />
          </IconButton>
            {this.state.filter_open?
            <IconButton aria-label="settings" onClick={this.handleCloseFilter} color='primary'>
            <FilterListOffIcon />
          </IconButton>:
            <IconButton aria-label="settings" onClick={this.handleClickFilter} color='primary'>
            <FilterListIcon />
          </IconButton>}
            </>
        }
       
        subheader="Select your line and date range"
      />
            <CardContent>
                {this.state.filter_open &&
                <Grid container spacing={2} sx={{mb:2}}>
                    <Grid item xs={3} md={4}>
                    <FormControl variant="standard" fullWidth sx={{ m: 0 }}>
                                    <TextField
                                        id="created_at__gte"
                                        label="From"
                                        type="datetime-local"
                                        name="created_at__gte"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleDateChange}
                                        value={this.state.created_at__gte}
                                        autoComplete='off'
                                    />
                                   
                                </FormControl>
                        
                    </Grid>

                    <Grid item xs={3} md={4}>
                    <FormControl variant="standard" fullWidth sx={{ m: 0 }}>
                                    <TextField
                                        id="created_at__lte"
                                        label="To"
                                        type="datetime-local"
                                        name="created_at__lte"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleDateChange}
                                        value={this.state.created_at__lte}
                                        autoComplete='off'
                                    />
                                 
                                </FormControl>
                        
                    </Grid>

                    <Grid item xs={3} md={4} display={'flex'} height={50} justifyContent={'end'} alignItems={'center'}>
                    <Button variant='contained' onClick={this.filterData}>Filter</Button>
                        
                    </Grid>
                </Grid>
                }
                <Grid container spacing={2}>
                  
                    
                    <Grid item xs={3} md={6} display={'flex'} alignItems={'end'}>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <Select
                                id="machine"
                                name='machine'
                                value={this.state.machine}
                                onChange={this.handleChange}
                                autoComplete='off'
                            >
                                {this.state.assets_data.map((value,index)=>{
                                    return <MenuItem key={value.uuid} value={value.uuid}>{value.name}</MenuItem>
                                })}
                                
                            </Select>
                    
                        </FormControl>
                        
                    
                    
                </Grid>
                </Grid>
                <Grid container spacing={2}>
                  
                    <Grid item xs={3} md={4} display={'flex'} height={50} justifyContent={'start'} alignItems={'center'}>

                    <Button  disabled={this.state.selected_period === 1}  onClick={(e)=>{this.handleCommonDate(1,'h')}}>Last hour</Button>
                    <Button disabled={this.state.selected_period === 24} onClick={(e)=>{this.handleCommonDate(24,'h')}}>Last day</Button>
                    <Button disabled={this.state.selected_period === 7} onClick={(e)=>{this.handleCommonDate(7,'d')}}>Last week</Button>
                    <Button disabled={this.state.selected_period === 30} onClick={(e)=>{this.handleCommonDate(30,'d')}}>Last month</Button>
                        
                    </Grid>
                    
                </Grid>

            </CardContent>
          </Card>
       
    </Box>
                
            </>
        );
    }
    
}
OeeSelector.contextType = AuthContext
export default OeeSelector;