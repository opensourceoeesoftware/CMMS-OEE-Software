import React, { Component } from 'react';

import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Grid } from '@mui/material';
import {Typography} from '@mui/material';

class MaintenancesGraph extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {users,assets,maintenances} = this.props
        let users_labels = []
        let users_data = []
        users.forEach(user => {
            users_labels.push(user.user.username)
            users_data.push(maintenances.filter((m)=>m.assigned_to?.id===user.user.id).length)
            
        });
        
        let assets_labels=[]
        let assets_data = []
        assets.forEach(asset => {
            assets_labels.push(asset.name)
            assets_data.push(maintenances.filter((m)=>m.asset.uuid===asset.uuid).length)
            
        });

        const XcongifPerUser = [
            { 
                data: users_labels, 
                scaleType: 'band' ,
                label: 'Planned maintenance by user',
                colorMap: {
                    type: 'ordinal',
                    colors: ['#2e7d32', '#2b8cbe', '#d32f2f', '#9c27b0', '#2b8cbe', 'black']
                },
                categoryGapRatio: 0.6
            }
        ]
        const XcongifPerAsset = [
            { 
                data: assets_labels, 
                scaleType: 'band' ,
                label: 'Planned maintenance by asset',
                colorMap: {
                    type: 'ordinal',
                    colors: ['#2e7d32', '#2b8cbe', '#d32f2f', '#9c27b0', '#2b8cbe', 'black']
                },
                categoryGapRatio: 0.6
            }
        ]


        return (
            <>
                  <Grid container spacing={4} sx={{ mb: 2 }}>
                    <Grid item md={12} xs={12} lg={6}>
                        
                        <Paper sx={{ width: "100%", p: 1 }}>
                        <Typography variant="h5" gutterBottom 
                            sx={{p: 2}}
                            >
                                Maintenance per user
                            </Typography>
                            <BarChart
                                series={[{ data:users_data },]}
                                height={400}
                                
                                xAxis={XcongifPerUser}              
                                
                            />
                        </Paper>
                    </Grid>
                    <Grid item md={12} xs={12} lg={6}>
                        <Paper sx={{ width: "100%", p: 1 }}>
                        <Typography variant="h5" gutterBottom 
                            sx={{p: 2}}
                            >
                               Maintenance per asset
                            </Typography>
                            <BarChart
                                series={[{ data: assets_data },]}
                                height={400}
                                xAxis={XcongifPerAsset}
                                
                                
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default MaintenancesGraph;