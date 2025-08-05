import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';

import Stack from '@mui/material/Stack';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ReportIcon from '@mui/icons-material/Report';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

function conver_from_hours_to_redable(diff_time) {
    var time = ''
    diff_time = diff_time * 60
    if (diff_time > 1 && diff_time <= 60) {
      time = Math.floor(diff_time) + ' minute(s) and ' + parseInt((diff_time - Math.floor(diff_time)) * 60) + ' seconds'
    }
    else if (diff_time > 60 && diff_time <= 1440) {
  
      time = Math.floor(diff_time / 60) + ' hour(s) and ' + Math.floor(diff_time % 60) + ' minutes'
    }
  
    else if (diff_time > 1440) {
     
      var days = (diff_time / (60 * 24))
      
      var hoursLeft = (days- Math.floor(days)) * 24
  
      time = Math.floor(days) + ' day(s) and ' + parseInt(hoursLeft).toFixed(1) + ' hours'
    }
    else {
      time = parseInt(diff_time * 60) + ' second(s)'
    }
  
    return time
  }
class DowntimeDurations extends Component {
   
    render() {
        const { data } = this.props
       
        let oee_selected= data?.oee_selected_period
        
        let total_fault_time = oee_selected?.out_of_order_duration + oee_selected?.machine_failure_duration + oee_selected?.machine_fault_duration
        if(isNaN(total_fault_time)) total_fault_time = 0
        total_fault_time = conver_from_hours_to_redable(total_fault_time)
        
        let out = oee_selected?.out_of_order_duration
        if(isNaN(out)) out = 0
        let total_out = conver_from_hours_to_redable(out)

        let fail = oee_selected?.machine_failure_duration
        if(isNaN(fail)) fail = 0
        let total_fail = conver_from_hours_to_redable(fail)

        let fault = oee_selected?.machine_fault_duration
        if(isNaN(fault)) fault = 0
        let total_fault = conver_from_hours_to_redable(fault)
        

        return (
            <>
                <Grid container spacing={4} sx={{ mb: 2 }}>
                    



                    <Grid item xs={12} md={3}>
                        <Paper elevation={0} sx={{ height: 150, width: "100%", p: 1 }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{  m: 0 }} >
                                Total fault time
                                </Typography>
                                <GppMaybeIcon sx={{ color: '#d32f2f' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_fault_time}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                All duration where the machine was faulty, all states included
                            </Typography>
                            







                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={0} sx={{ height: 150, width: "100%", p: 1 }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{  m: 0 }} >
                                Fault time
                                </Typography>
                                <ReportGmailerrorredIcon sx={{ color: '#d32f2f' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_fault}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                All downtimes that occured during the production process
                            </Typography>
                            







                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={0} sx={{ height: 150, width: "100%", p: 1 }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{  m: 0 }} >
                                Failures
                                </Typography>
                                <ReportIcon sx={{ color: '#d32f2f' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_fail}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                All faults that happened while machine was on and during heating or changeover phase
                            </Typography>
                            







                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={0} sx={{ height: 150, width: "100%", p: 1 }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{  m: 0 }} >
                                Out of order
                                </Typography>
                                <PriorityHighIcon sx={{ color: '#d32f2f' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_out}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                All faults that happened while machine was off
                            </Typography>
                            







                        </Paper>
                    </Grid>
                    
                   
                 
              

                </Grid>
            </>
        );
    }
}

export default DowntimeDurations;