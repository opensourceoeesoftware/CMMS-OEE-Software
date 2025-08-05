import React, { Component } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Grid } from '@mui/material';
import {Typography} from '@mui/material';


class DowntimesCharts extends Component {
  
    render() {
        const {data} = this.props
        let events = data?.events
        let faults = data?.faults
        let cells = data?.cells
        
        let fault_labels = []
        let fault_data = []
        faults?.forEach(element => {
            fault_labels.push(element.name)
            fault_data.push(events.filter((e)=>(e.state === 'fault' || 
                                                e.state === 'failure' || 
                                                e.state === 'out of order' ||
                                                e.state === 'resume fault' || 
                                                e.state === 'resume failure' || 
                                                e.state === 'resume out of order'
                                                ) && e.fault?.uuid === element.uuid).length)
        });
      
        // let uncategory = 'No Category'
        // fault_labels.push(uncategory)
        // fault_data.push(events?.filter((e)=>(e.state == 'fault' || 
        //     e.state == 'failure' || 
        //     e.state == 'out of order' ||
        //     e.state == 'resume fault' || 
        //     e.state == 'resume failure' || 
        //     e.state == 'resume out of order'
        //     ) && (e.fault===null  && !e.is_filled)).length)


        const XconfigFaults =  [
            {
                data: fault_labels, 
                label: 'Faults', 
                scaleType: 'band', 
                colorMap: {
                    type: 'ordinal',
                    // colors: [avail_color, per_color, qual_color, '#9c27b0', '#2b8cbe', 'grey']
                    colors: ['#9c27b0','#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
                },
                categoryGapRatio: 0.6
            }]
        let cells_labels = []
        let cell_data = []
        cells?.forEach(element => {
            cells_labels.push(element.name)
            cell_data.push(events.filter((e)=>( e.state === 'fault' || 
                                                e.state === 'failure' || 
                                                e.state === 'out of order' ||
                                                e.state === 'resume fault' || 
                                                e.state === 'resume failure' || 
                                                e.state === 'resume out of order'    
                                            ) && e.cell?.uuid === element.uuid).length)
        });
        // cells_labels.push('No category')
        // cell_data.push(events?.filter((e)=>( e.state == 'fault' || 
        //     e.state == 'failure' || 
        //     e.state == 'out of order' ||
        //     e.state == 'resume fault' || 
        //     e.state == 'resume failure' || 
        //     e.state == 'resume out of order'    
        // ) && (e.cell === null && e.is_filled===false )).length)
        // cells_labels.unshift('Total')
            
        // cell_data.unshift(events?.filter((e)=>( e.state == 'fault' || 
        //     e.state == 'failure' || 
        //     e.state == 'out of order' ||
        //     e.state == 'resume fault' || 
        //     e.state == 'resume failure' || 
        //     e.state == 'resume out of order'    
        // ) && (e.is_filled===false )).length)
        const XconfigCells =  [
            {
                data: cells_labels, 
                label: 'Cells', 
                scaleType: 'band', 
                colorMap: {
                    type: 'ordinal',
                    // colors: [avail_color, per_color, qual_color, '#9c27b0', '#2b8cbe', 'grey']
                    colors: ['#9c27b0','#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
                },
                categoryGapRatio: 0.6
            }]
        return (
            <>
            <Grid container spacing={4} >
                <Grid item md={12} xs={12} lg={6}>
                            
                            <Paper sx={{ width: "100%", p: 1 }} elevation={0}>
                            <Typography variant="h5" gutterBottom 
                                sx={{p: 2}}
                                >
                                    Per fault type
                                </Typography>
                                <BarChart
                                    series={[{ data: fault_data },]}
                                    height={400}
                                    sx={{pl:2}}
                                    xAxis={XconfigFaults}      
                                        
                                    
                                />
                            </Paper>
                </Grid>
                <Grid item md={12} xs={12} lg={6}>
                            
                            <Paper sx={{ width: "100%", p: 1 }} elevation={0}>
                            <Typography variant="h5" gutterBottom 
                                sx={{p: 2}}
                                >
                                    Per Cell
                                </Typography>
                                <BarChart
                                    series={[{ data: cell_data },]}
                                    height={400}
                                    sx={{pl:2}}
                                    xAxis={XconfigCells}      
                                        
                                    
                                />
                            </Paper>
                </Grid>
            </Grid>
                
            </>
        );
    }
}

export default DowntimesCharts;