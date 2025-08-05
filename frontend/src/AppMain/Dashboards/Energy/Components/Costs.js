import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography,Box } from '@mui/material';

import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';

import ReportIcon from '@mui/icons-material/Report';

import ChargingStationIcon from '@mui/icons-material/ChargingStation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Gauge ,gaugeClasses } from '@mui/x-charts/Gauge'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
class Costs extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { data } = this.props
       
        let oee_selected= data?.oee_selected_period

        let fault_costs = data?.events?.[0]?.machine?.running_hour_cost * oee_selected?.machine_fault_duration
        let failure_costs = data?.events?.[0]?.machine?.on_hour_cost * oee_selected?.machine_failure_duration
        let total_faulty_costs = fault_costs + failure_costs
        
        let run_costs = data?.events?.[0]?.machine?.running_hour_cost * oee_selected?.machine_run_duration 
        run_costs = run_costs - fault_costs

        let on_costs = data?.events?.[0]?.machine?.on_hour_cost * (oee_selected?.machine_on_duration - oee_selected?.machine_run_duration  )
        on_costs = on_costs - failure_costs

        let total_costs = on_costs + run_costs + total_faulty_costs
        
        let cost_efficeincy = total_costs===0?0: parseFloat((run_costs/total_costs)*100).toFixed(2)
        let percentage_on = total_costs===0?0: parseFloat((on_costs/total_costs)*100).toFixed(2)
        let percentage_fault = total_costs===0?0: parseFloat((total_faulty_costs/total_costs)*100).toFixed(2)
        
        run_costs = parseFloat(run_costs ).toFixed(2)
        on_costs = parseFloat(on_costs ).toFixed(2)
        total_faulty_costs = parseFloat(total_faulty_costs ).toFixed(2)
        total_costs = parseFloat(total_costs ).toFixed(2)
        isNaN(run_costs)?run_costs = 0: run_costs=run_costs
        isNaN(on_costs)?on_costs = 0: on_costs=on_costs 
        isNaN(total_faulty_costs)?total_faulty_costs = 0: total_faulty_costs=total_faulty_costs 
        isNaN(total_costs)?total_costs = 0: total_costs=total_costs 
        const XconfigAllmetric =  [
            {
                data: ['All','On', 'Run','Fault'], 
                label: 'costs metrics', 
                scaleType: 'band', 
                colorMap: {
                    type: 'ordinal',
                    // colors: [avail_color, per_color, qual_color, '#9c27b0', '#2b8cbe', 'grey']
                    colors: ['#ba68c8', '#3498db','#2e7d32', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
                },
                categoryGapRatio: 0.6
            }]

        let efe_color = cost_efficeincy >=65?'#2e7d32':'#ed6c02'

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
                                Total Costs
                                </Typography>
                                <AttachMoneyIcon sx={{ color: '#ba68c8' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_costs} $
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Costs, in heating and production phases etc...
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
                                On cost
                                </Typography>
                                <LocalFireDepartmentIcon sx={{ color: '#3498db' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {on_costs} $
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Costs during the normal heating and preparing phase
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
                                Run cost
                                </Typography>
                                <PlayArrowIcon sx={{ color: '#4caf50' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {run_costs} $
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Costs during net production phase, no downtime included
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
                                Failures cost
                                </Typography>
                                <ReportIcon sx={{ color: '#d32f2f' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_faulty_costs} $
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Costs during all faulty situations, all faults included
                            </Typography>



                        </Paper>
                    </Grid>

                    {/* <Grid item md={12} xs={12} lg={6}>
                        
                        <Paper sx={{ width: "100%", p: 1 }} elevation={0}>
                        <Typography variant="h5" gutterBottom 
                            sx={{p: 2}}
                            >
                                Costs metrics
                            </Typography>
                            <BarChart
                                series={[{ data: [100,percentage_on, cost_efficeincy,percentage_fault] },]}
                                height={400}
                                sx={{pl:2}}
                                xAxis={XconfigAllmetric}      
                                
                                yAxis={[
                                    {
                                      min: 0,
                                      max: 100,
                                      label: '%', 
                                    },
                                  ]} 
                                
                            />
                        </Paper>
                    </Grid>
                    <Grid item md={12} xs={12}  lg={6} >
                        <Paper elevation={0} sx={{width:"100%",height:"100%",p:1 }}>
                                <Typography variant="h5" gutterBottom sx={{p: 2}}>
                                Costs efficiency
                                </Typography>
                                <Box sx={{display:'grid'}} justifyContent={'center'}>
                                <Gauge width={300} height={300} value={cost_efficeincy} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: efe_color,
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                                <Typography variant="body1" gutterBottom sx={{p: 2}}>
                                    Costs is the ration between net run cost and total cost
                                </Typography>
                                </Box>
                              
                               
                        </Paper>
                    </Grid> */}
                </Grid>
            </>
        );
    }
}

export default Costs;