import React, { Component } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {  Backdrop, CircularProgress } from '@mui/material';
import Nav from '../../../Layout/Nav/Nav';
import Sidebar from '../../../Layout/Sidebar/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { url } from '../../../Config';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import AuthContext from '../../../AuthProvider/AuthContext';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Scheduler } from "@aldabil/react-scheduler";
import MaintenancePlanForm from './MaintenanceEditForm';
import MaintenanceCard from '../../OperatorView/MaintenanceCard';
import AssetCard from '../../OperatorView/AssetCard';
import {Divider,Box} from '@mui/material';
const breadcrumbs = [

    <RouterLink
        to={'/'}
        replace={true}

    >
        Home
    </RouterLink>,
    <Typography key="3998sas985ds" color="text.primary">
        Agenda
    </Typography>,
];
class Agenda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:true,
            maintenances:[],
            assets:[],
            users:[],
            show_form:false,
            maintenance_plan:{
                uuid:'',
                planned_starting_date:'',
                planned_finished:''

            }
        }
        this.refreshData=this.refreshData.bind(this)
        this.handleOnConfirm=this.handleOnConfirm.bind(this)
        this.handleOnCloseForm=this.handleOnCloseForm.bind(this)
        this.handleonCellClick=this.handleonCellClick.bind(this)
        this.handleOnUpdate=this.handleOnUpdate.bind(this)
        this.handleOnEventEdit=this.handleOnEventEdit.bind(this)
        this.handleOnDelete=this.handleOnDelete.bind(this)
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
    handleOnConfirm(event,action) {
       
       
        this.setState({...this.state,show_form:true})
    }
    handleOnCloseForm() {
      
        this.setState({...this.state,show_form:false,})
    }
    handleonCellClick(start,end) {
        start.setHours(start.getHours() + 2)
        end.setHours(end.getHours() + 2)
        var planned_starting_date = start.toISOString()
       
        var planned_finished = end.toISOString()
        
        
       

        var maintenance = {
            uuid:"",
            planned_starting_date:planned_starting_date,
            planned_finished:planned_finished
        }
        this.setState({...this.state,maintenance_plan:maintenance},()=>{
            
            this.setState({...this.state,show_form:true})
        })
    }
    handleOnUpdate() {
        this.setState({...this.state,show_form:false},()=>{
            this.refreshData()
        })
    }
    handleOnEventEdit(event) {
        let selected_maintenance = this.state.maintenances.filter((m)=>m.uuid===event.id)?.[0]
    
        this.setState({...this.state,maintenance_plan:selected_maintenance},()=>{
          
            this.setState({...this.state,show_form:true})
        })
    }
    handleOnDelete(id) {
        var tempthis= this
        this.setState({...this.state, is_loading:true},async ()=>{
            try {
               
                    const response = await axios.delete(url + '/api/v1/maintenances-plans/'+ id + '/', {
                      headers: {
                        'Authorization': "Token " + this.context.state.token
                      }
                      
                    });
               

                toast.success("Assets deleted");
                tempthis.refreshData()
                
                
                
            } catch (error) {
                this.setState({ is_loading: false },()=>{
                    this.refreshData()
                });
                toast.error("Something wrong! Please try again. Hint: "+ error);
               
                
            }   
           
        })
    }
    render() {
        const {maintenances,users,assets,maintenance_plan} = this.state
        let events=[]
        let uuids = []
        let x = 0
        let colors = ['info.main','success.main']
        let color_map = {
            'Cancelled':'error.main',
            'Pending':'secondary.main',
            'In Progress':'info.main',
            'Completed':'success.main',
        }
        maintenances.forEach(m => {
            events.push({
                id:m.uuid,
                event_id:m.uuid,
                title:m.name ,
                start:new Date(m.planned_starting_date),
                end : new Date(m.planned_finished),
                color:color_map[m.status],
                admin_id:x,
                description:'This maintenance is planned for the asset ' + m.asset.name + '\nand ' + 'assigned to the user ' + m.assigned_to?.username
            })
            uuids.push(x)
            x+=1
            
        });
     
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
                            <DateRangeIcon/>
                            <Breadcrumbs separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                    </div>
                <div className='container-fluid'>
             
             
                
                <Scheduler
                        view="month" 
                        
                        events={events}
                        onEventEdit={this.handleOnEventEdit}
                        timeZone='CET'
                        draggable={false}
                        hourFormat={24}
                        
                        onConfirm={this.handleOnConfirm}
                        onDelete={this.handleOnDelete}
                        customEditor={(scheduler) => <MaintenancePlanForm 
                            scheduler={scheduler}
                            assets={assets} 
                            users={users} 
                            show={this.state.show_form} 
                            handleClose={this.handleOnCloseForm}
                            maintenancePlan={this.state.maintenance_plan}
                            OnUpdate={this.handleOnUpdate}
                            
                            />}
                            
                            
                            
                        onCellClick={this.handleonCellClick}
                        viewerExtraComponent={(fields, event) => {
                            return (
                                <>
                                <Box sx={{display:'flex' ,flexDirection:'column',alignItems:'center'}}>

                                    <MaintenanceCard maintenance={this.state.maintenances.filter((m)=>m.uuid===event.id)[0]}
                                    
                                    />
                                    <Divider sx={{mb:2}}/>
                                    <AssetCard  asset={this.state.maintenances.filter((m)=>m.uuid===event.id)[0]?.asset}></AssetCard>
                                </Box>
                                </>
                                
                                
                              
                            );
                          }}
                          day={{
                            startHour: 0, 
                            endHour: 24, 
                            step: 60,
                           
                            }}

                          
                            week={
                                { 
                                    weekDays: [0, 1, 2, 3, 4, 5,6], 
                                    weekStartOn: 6, 
                                    startHour: 0, 
                                    endHour: 24,
                                    step: 60,
                                    
                                    navigation: true,
                                    disableGoToDay: false
                                    }
                            }
                        />
                  
            
                </div>

                </div>
            </>
        );
    }
}
Agenda.contextType=AuthContext
export default Agenda;