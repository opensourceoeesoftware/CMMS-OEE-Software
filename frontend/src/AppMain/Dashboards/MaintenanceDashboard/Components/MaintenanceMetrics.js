import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { Grid,Typography } from '@mui/material';
import { Gauge ,gaugeClasses } from '@mui/x-charts/Gauge'
class MaintenanceMetrics extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { maintenances } = this.props

        let total_maintenance = maintenances.length

        let pending = maintenances.filter((m)=>m.status === "Pending").length
        let pending_per = total_maintenance!==0?parseInt((pending/total_maintenance)*100):0

        let in_progress = maintenances.filter((m)=>m.status === "In Progress").length
        let in_progress_per = total_maintenance!==0?parseInt((in_progress/total_maintenance)*100):0

        let completed = maintenances.filter((m)=>m.status === "Completed").length
        let completed_per = total_maintenance!==0?parseInt((completed/total_maintenance)*100):0

        let cancelled = maintenances.filter((m)=>m.status === "Cancelled").length
        let cancelled_per = total_maintenance!==0?parseInt((cancelled/total_maintenance)*100):0
        return (
            <>
                <Grid container spacing={4} sx={{mb:2}}>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Paper elevation={1} sx={{ width:"100%",p:1 }}>
                                <Typography variant="overline" gutterBottom >
                                    Pending 
                                </Typography>
                                <Gauge width={200} height={200} value={pending_per} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: pending_per <= 50 ?'#2e7d32':'#d32f2f',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                               
                                <Typography variant="overline" sx={{ fontWeight: 'bold' }} display={'block'} align='end' color={pending_per <= 50 ?'#2e7d32':'#d32f2f'}  gutterBottom>
                                    
                                    {pending_per <= 50  ?'Good rate':'below average'}
                                </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Paper elevation={1} sx={{ width:"100%",p:1 }}>
                                <Typography variant="overline" gutterBottom >
                                    Ongoing 
                                </Typography>
                                <Gauge width={200} height={200} value={in_progress_per} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: in_progress_per >= 75 ?'#2e7d32':'#d32f2f',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                              
                                <Typography variant="overline" sx={{ fontWeight: 'bold' }} display={'block'} align='end' color={in_progress_per >= 75 ?'#2e7d32':'#d32f2f'}  gutterBottom>
                                    
                                    {in_progress_per >= 75  ?'Good rate':'below average'}
                                </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Paper elevation={1} sx={{ width:"100%",p:1 }}>
                                <Typography variant="overline" gutterBottom >
                                    Completed 
                                </Typography>
                                <Gauge width={200} height={200} value={completed_per} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: completed_per >= 75 ?'#2e7d32':'#d32f2f',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                             
                                <Typography variant="overline" sx={{ fontWeight: 'bold' }} display={'block'} align='end' color={completed_per >= 75 ?'#2e7d32':'#d32f2f'}  gutterBottom>
                                    
                                    {completed_per >= 75  ?'Good rate':'below average'}
                                </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Paper elevation={1} sx={{ width:"100%",p:1 }}>
                                <Typography variant="overline" gutterBottom >
                                    Cancelled 
                                </Typography>
                                <Gauge width={200} height={200} value={cancelled_per} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#0288d1',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                             
                                <Typography variant="overline" sx={{ fontWeight: 'bold' }} display={'block'} align='end' color={'#0288d1'}  gutterBottom>
                                    
                                neutral value
                                </Typography>
                        </Paper>
                    </Grid>
              
    
                 
                </Grid>
            </>
        );
    }
}

export default MaintenanceMetrics;