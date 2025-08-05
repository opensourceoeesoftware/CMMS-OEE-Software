import React, { Component } from 'react';
import { Card,CardHeader,CardContent,IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventDetails from './EventDetails';

//icons
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import ReportIcon from '@mui/icons-material/Report';
import ReportOffIcon from '@mui/icons-material/ReportOff';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
class Event extends Component {
    constructor(props) {
        super(props)
        this.state={
            anchorEl:null,
            open:false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
     handleClick (event)  {
        this.setState({...this.state,anchorEl:event.currentTarget,open:true});
      };
       handleClose () {
        this.setState({...this.state,anchorEl:null,open:false});
      };
    render() {
        const {event} = this.props
        // ['#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
        let red = 'error.light'
        let orange = 'warning.light'
        let purple = 'secondary.light'
        let green = 'success.light'
        let blue = 'primary.light'
        let color_map = {
            'on':blue,
            'off':'grey',
            'fault':orange,
            'resume fault':green,
            'failure':orange,
            'resume failure':blue,
            'out of order':red,
            'resume out of order':blue,
            'break in':purple,
            'resume break in':green,
            'break out':purple,
            'resume break out':blue,
            'report':green,
            'run':green,
            'stop':blue,


        }
        let icon_map = {
            'on':<PowerIcon/>,
            'off':<PowerOffIcon/>,
            'fault':<ReportIcon/>,
            'resume fault':<ReportOffIcon/>,
            'failure':<ReportIcon/>,
            'resume failure':<ReportOffIcon/>,
            'out of order':<ReportIcon/>,
            'resume out of order':<ReportOffIcon/>,
            'break in':<FreeBreakfastIcon/>,
            'resume break in':<PlayCircleOutlineIcon/>,
            'break out':<FreeBreakfastIcon/>,
            'resume break out':<PowerIcon/>,
            'report':<AssignmentTurnedInOutlinedIcon/>,
            'run':<PlayCircleOutlineIcon/>,
            'stop':<StopCircleIcon/>,


        }
        
        return (
            <>
            <Card sx={{width:'100px',height:'80%',m:'auto',mx:1,backgroundColor:color_map[event?.state]}}  elevation={1} >
            <CardHeader
                 action={
                    <IconButton aria-label="settings" onClick={this.handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                 }  
                 avatar = {
                   
                    icon_map[event?.state]
               
                 }
            >
                 
            </CardHeader>
            <EventDetails open={this.state.open} 
                        anchorEl={this.state.anchorEl} 
                        handleClose={this.handleClose}
                        event={event}
                        ></EventDetails>
            


            </Card>
                
            </>
        );
    }
}

export default Event;