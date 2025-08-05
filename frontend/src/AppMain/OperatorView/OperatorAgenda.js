import React, { Component } from 'react';
import Nav from '../../Layout/Nav/Nav';
import Sidebar from '../../Layout/Sidebar/Sidebar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {  Backdrop, CircularProgress,Paper } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import { Scheduler } from "@aldabil/react-scheduler";
import EventNoteIcon from '@mui/icons-material/EventNote';
import axios from 'axios';
import AuthContext from '../../AuthProvider/AuthContext';
import MaintenanceReport from './MaintenanceReport';
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
        My agenda
    </Typography>,
];
class OperatorAgenda extends Component {
    constructor(propos) {
        super(propos)
        this.state = {
            is_loading: false,     
            maintenances:[],
            show_detail:false,
            selected_maintenance : {}       
        }
        this.refreshData=this.refreshData.bind(this)
        this.handleOnClickEvent=this.handleOnClickEvent.bind(this)
        this.handleCloseDetails=this.handleCloseDetails.bind(this)
    }
    componentDidMount() {
        this.refreshData()
    }
    refreshData() {
        this.setState({...this.state,show_detail:false, is_loading:true},async ()=>{
            try {
                const response = await axios.get(url + '/api/v1/my-maintenances/', {
                  headers: {
                    'Authorization': "Token " + this.context.state.token
                  }
                });
             
               
                this.setState({...this.state, maintenances:response.data,is_loading:false})
              } catch (error) {
                console.log(error)
                  
                  toast.error("Something wrong! Please try again. Hint: "+ error.response?.data['detail']);
              
              } finally {
                this.setState({ is_loading: false });
              }
        })

    }
    handleOnClickEvent(event) {
      
        var selected = this.state.maintenances.filter((m)=>m.uuid===event.id)?.[0]
        this.setState({...this.state,selected_maintenance:selected,show_detail:true})
        }
        handleCloseDetails() {
        this.setState({...this.state,show_detail:false})
        this.refreshData()

    }
    render() {
        let events=[]
        
        let colors = ['info.main','success.main']
        this.state.maintenances.forEach(m => {
            events.push({
                id:m.uuid,
                event_id:m.uuid,
                title:m.name ,
                start:new Date(m.planned_starting_date),
                end : new Date(m.planned_finished),
                color:m.status=='In Progress'?'success.main':'warning.main',
              
                description:'This maintenance is planned for the asset ' + m.asset.name + '\nand ' + 'assigned to the user ' + m.assigned_to.username
            })
            
            
        });
        return (
            <>
                <Nav></Nav>
                <Sidebar />
                <ToastContainer></ToastContainer>
                <MaintenanceReport show={this.state.show_detail} 
                                    handleClose={this.handleCloseDetails} 
                                    maintenance={this.state.selected_maintenance}
                                    />
                <div className='content-wrapper'>
                <div className='content-header'>
                        <Stack spacing={2} justifyContent={'space-between'} direction="row" sx={{mb:2,p:1}}>
                            <EventNoteIcon/>
                            <Breadcrumbs separator="›" aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Stack>
                </div>
                <div className='container-fluid'>

                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={this.state.is_loading}>
                    <CircularProgress />
                 </Backdrop>
                 <Scheduler
                        view="month" 
                        disableViewer
                        onEventClick={this.handleOnClickEvent}
                        events={events}
                        timeZone='CET'
                        draggable={false}
                        editable={false}
                        deletable={false}
                        hourFormat={24}
                        onCellClick={this.handleonCellClick}
                        viewerExtraComponent={(fields, event) => {
                            return (
                                <Typography variant='body1' sx={{mt:2,mb:2}}>
                                        {event.description || "Nothing..."}
                                </Typography>
                              
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
OperatorAgenda.contextType=AuthContext
export default OperatorAgenda;