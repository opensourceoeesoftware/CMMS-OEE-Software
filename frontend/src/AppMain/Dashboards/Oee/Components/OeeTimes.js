import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';

import Stack from '@mui/material/Stack';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import CycloneIcon from '@mui/icons-material/Cyclone';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

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
class OeeTimes extends Component {

    render() {
        const { data } = this.props
       
        let oee_selected= data?.oee_selected_period
        let total_fault_time = oee_selected?.out_of_order_duration + oee_selected?.machine_failure_duration + oee_selected?.machine_fault_duration
        if(isNaN(total_fault_time)) total_fault_time = 0
        total_fault_time = conver_from_hours_to_redable(total_fault_time)

        let total_break = oee_selected?.machine_break_in_duration + oee_selected?.machine_break_out_duration
        if(isNaN(total_break)) total_break = 0
        total_break = conver_from_hours_to_redable(total_break)

        let total_run_durationp = oee_selected?.machine_run_duration
        if(isNaN(total_run_durationp)) total_run_durationp = 0
        let total_run_duration = conver_from_hours_to_redable(total_run_durationp)

        let total = oee_selected?.machine_on_duration
        if(isNaN(total)) total = 0
        let total_on_duration = conver_from_hours_to_redable(total)

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
                                Total on time
                                </Typography>
                                <CycloneIcon sx={{ color: '#9c27b0' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_on_duration}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                All duration where the machine was turned on, all states included
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
                                Total run time
                                </Typography>
                                <PlayCircleFilledIcon sx={{ color: '#2e7d32' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_run_duration}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                All duration where the machine was running , and actively producing
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
                                All duration where the machine was in maintenance, or downtimes
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
                                Total break time
                                </Typography>
                                <FreeBreakfastIcon sx={{ color: '#0288d1' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_break}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                All duration where the machine was in pause state, all reasons included
                            </Typography>
                            







                        </Paper>
                    </Grid>
                 
              

                </Grid>
            </>
        );
    }
}

export default OeeTimes;