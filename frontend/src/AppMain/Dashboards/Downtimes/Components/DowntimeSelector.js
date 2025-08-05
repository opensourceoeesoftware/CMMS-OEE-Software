import React, { Component } from 'react';
import { url } from '../../../../Config';
import axios from 'axios';
import AuthContext from '../../../../AuthProvider/AuthContext';
import {  toast } from 'react-toastify';
import { Paper,Grid,Box,Select,MenuItem } from '@mui/material';
import {Card,CardHeader,CardContent} from '@mui/material';
import { FormControl, FormHelperText, TextField,Button  } from '@mui/material';
function formatDateForInput(date) {
    const d = new Date(date);
    const pad = (n) => n < 10 ? '0' + n : n;
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}
class DowntimeSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            assets_data:[],
            events_data:[],
            selected_machine : '',
            created_at__gte :formatDateForInput(new Date(new Date().setHours(new Date().getHours() - 1)).toString()), // get eight hours ago
            created_at__lte :formatDateForInput(new Date(new Date().setHours(new Date().getHours() + 1)).toString()),
            machine:'',
            list_cells : [],
            list_faults:[]
        }
        this.refreshData = this.refreshData.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.filterData = this.filterData.bind(this)
       
    }
    componentDidMount() {
        this.refreshData()
    }
    filterData() {
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
                                           
                      this.setState({...this.state,
                          
                          events_data: response_events.data,
                          
                      })
                    if(this.props.onResult)this.props.onResult(response_events.data,this.state.machine)
                  } catch (error) {
                        console.log(error)
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
                    toast.warning("Something wrong! Please try again. Hint: No machine created");
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
                
               


                this.setState({...this.state,
                    assets_data: response.data,
                    events_data: response_events.data,
                    machine: selected_machine,
                    
                })
                if(this.props.onResult)this.props.onResult(response_events.data,selected_machine)

              } catch (error) {
                    console.log(error)
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
        const isoValue = new Date(value).toISOString();
        this.setState({ [name]: formatDateForInput(value) });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        if(name==="machine") localStorage.setItem('asset_uuid',value)
        this.setState({ [name]: value });
    };
    render() {
        
        return (
            <>
            <Box sx={{ flexGrow: 1 }}>
      
          <Card elevation={0}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
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

                    <Grid item xs={6} md={3}>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
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
                    <Grid item xs={6} md={3} display={'flex'} alignItems={'end'}>
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
                    <Grid item xs={6} md={3} display={'flex'} justifyContent={'end'}>
                    <Button variant='contained' onClick={this.filterData}>Filter</Button>
                        
                    </Grid>
                </Grid>

            </CardContent>
          </Card>
       
    </Box>
                
            </>
        );
    }
}
DowntimeSelector.contextType = AuthContext
export default DowntimeSelector;