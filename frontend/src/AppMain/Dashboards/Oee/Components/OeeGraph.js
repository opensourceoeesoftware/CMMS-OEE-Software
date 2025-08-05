import React, { Component } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Grid, Box } from '@mui/material';
import {Typography} from '@mui/material';
import { Gauge ,gaugeClasses } from '@mui/x-charts/Gauge'

import OeeComparaison from './OeeComparaison';
import OeeTimes from './OeeTimes';

class OeeGraphs extends Component {
  
    render() {
     

        const { data } = this.props
        let availability = parseInt(data?.oee_selected_period?.availability * 100)
        if(isNaN(availability)) availability = 0

        let performance = parseInt(data?.oee_selected_period?.performance * 100)
        if(isNaN(performance)) performance = 0

        let quality = parseInt(data?.oee_selected_period?.quality * 100)
        if(isNaN(quality)) quality = 0

        let oee = data?.oee_selected_period?.oee 
        if(isNaN(oee)) oee = 0

    

        let avail_color = availability >=65?'#2e7d32':'#ed6c02'
        let per_color = performance >=65?'#2e7d32':'#ed6c02'
        let qual_color = quality >=65?'#2e7d32':'#ed6c02'
        let oee_color = oee >=65?'#2e7d32':'#ed6c02'

        const XconfigAllmetric =  [
            {
                data: ['Availability','Performance', 'Quality'], 
                label: 'Oee metrics', 
                scaleType: 'band', 
                colorMap: {
                    type: 'ordinal',
                    colors: [avail_color, per_color, qual_color, '#9c27b0', '#2b8cbe', 'grey']
                    // colors: ['#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
                },
                categoryGapRatio: 0.6
            }]
    
        return (
            <>
                <Grid container spacing={4} >
                <Grid item md={12} xs={12}  lg={12} >
                        <OeeTimes data={data}></OeeTimes>
                    </Grid>
                    <Grid item md={12} xs={12} lg={6}>
                        
                        <Paper sx={{ width: "100%", p: 1 }} elevation={0}>
                        <Typography variant="h5" gutterBottom 
                            sx={{p: 2}}
                            >
                                Oee metrics
                            </Typography>
                            <BarChart
                                series={[{ data: [availability,performance, quality] },]}
                                height={400}
                                sx={{pl:2}}
                                xAxis={XconfigAllmetric}      
                                yAxis={[
                                    {
                                      min: 0,
                                      max: 100,
                                    },
                                  ]}  
                                
                            />
                        </Paper>
                    </Grid>

                    <Grid item md={12} xs={12}  lg={6} >
                        <Paper elevation={0} sx={{width:"100%",height:"100%",p:1 }}>
                                <Typography variant="h5" gutterBottom sx={{p: 2}}>
                                    Over all oee
                                </Typography>
                                <Box sx={{display:'flex'}} justifyContent={'center'}>
                                <Gauge width={300} height={300} value={oee} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: oee_color,
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                                </Box>
                              
                               
                        </Paper>
                    </Grid>
                    <Grid item md={12} xs={12}  lg={12} >
                        <OeeComparaison data={data}></OeeComparaison>
                    </Grid>
                    
                    
                </Grid>


            </>
        );
    }
}

export default OeeGraphs;