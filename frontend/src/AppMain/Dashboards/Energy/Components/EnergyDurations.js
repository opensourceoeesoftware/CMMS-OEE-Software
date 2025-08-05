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


class EnergyDurations extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { data } = this.props
       
        let oee_selected= data?.oee_selected_period

        let fault_energy = data?.events?.[0]?.machine?.running_hour_consumption_kw * oee_selected?.machine_fault_duration
        let failure_energy = data?.events?.[0]?.machine?.on_hour_consumption_kw * oee_selected?.machine_failure_duration
        
        let total_faulty_energy = fault_energy + failure_energy
        
        let run_energy = data?.events?.[0]?.machine?.running_hour_consumption_kw * oee_selected?.machine_run_duration
        run_energy = run_energy - fault_energy
        
        
        let on_energy = data?.events?.[0]?.machine?.on_hour_consumption_kw *(oee_selected?.machine_on_duration - oee_selected?.machine_run_duration) 
        on_energy = on_energy  - failure_energy
        
        let total_energy = parseFloat(on_energy + run_energy + total_faulty_energy).toFixed(2)
        
        let energy_efficeincy = total_energy===0?0: parseFloat((run_energy/total_energy)*100).toFixed(2)
        let percentage_on = total_energy===0?0: parseFloat((on_energy/total_energy)*100).toFixed(2)
        let percentage_fault = total_energy===0?0: parseFloat((total_faulty_energy/total_energy)*100).toFixed(2)
        
        total_faulty_energy = parseFloat(total_faulty_energy).toFixed(2)
        run_energy = parseFloat(run_energy).toFixed(2)
        on_energy = parseFloat(on_energy).toFixed(2)
        isNaN(total_faulty_energy)?total_faulty_energy = 0: total_faulty_energy=total_faulty_energy 
        isNaN(run_energy)?run_energy = 0: run_energy=run_energy 
        isNaN(on_energy)?on_energy = 0: on_energy=on_energy 
        isNaN(total_energy)?total_energy = 0: total_energy=total_energy 
        
        isNaN(energy_efficeincy)?energy_efficeincy = 0: energy_efficeincy=energy_efficeincy 
        isNaN(percentage_on)?percentage_on = 0: percentage_on=percentage_on 
        isNaN(percentage_fault)?percentage_fault = 0: percentage_fault=percentage_fault 

        const XconfigAllmetric =  [
            {
                data: ['All','On', 'Run','Fault'], 
                label: 'Costs & Energy metrics', 
                scaleType: 'band', 
                colorMap: {
                    type: 'ordinal',
                    // colors: [avail_color, per_color, qual_color, '#9c27b0', '#2b8cbe', 'grey']
                    colors: ['#ba68c8', '#3498db','#2e7d32', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
                },
                categoryGapRatio: 0.6
            }]

        let efe_color = energy_efficeincy >=65?'#2e7d32':'#ed6c02'

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
                                Total Energy consumption
                                </Typography>
                                <ChargingStationIcon sx={{ color: '#ba68c8' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_energy} Kw
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Estimation of total energy consumption, in heating and production phases etc...
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
                                On energy
                                </Typography>
                                <LocalFireDepartmentIcon sx={{ color: '#3498db' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {on_energy} Kw
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Energy consumption during the normal heating and preparing phase
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
                                Run energy
                                </Typography>
                                <PlayArrowIcon sx={{ color: '#4caf50' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {run_energy} Kw
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Energy consumption during net production phase, no downtime included
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
                                Failures energy
                                </Typography>
                                <ReportIcon sx={{ color: '#d32f2f' }}/>  
                                
                            </Stack>



                            <Typography variant="h6" gutterBottom align='left'
                                sx={{pl:1}}
                                
                            >
                                {total_faulty_energy} Kw
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Energy consumption during all faulty situations, all faults included
                            </Typography>



                        </Paper>
                    </Grid>

                    <Grid item md={12} xs={12} lg={6}>
                        
                        <Paper sx={{ width: "100%", p: 1 }} elevation={0}>
                        <Typography variant="h5" gutterBottom 
                            sx={{p: 2}}
                            >
                                Costs & Energy metrics
                            </Typography>
                            <BarChart
                                series={[{ data: [100,percentage_on, energy_efficeincy,percentage_fault] },]}
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
                                Costs & Energy efficiency
                                </Typography>
                                <Box sx={{display:'grid'}} justifyContent={'center'}>
                                <Gauge width={300} height={300} value={energy_efficeincy} 
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
                                    <strong>Cost & Energy effeciency</strong> is the ratio between net run and total costs
                                </Typography>
                                </Box>
                              
                               
                        </Paper>
                    </Grid>                              
                </Grid>
               
            </>
        );
    }
}

export default EnergyDurations;