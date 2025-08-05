import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { Grid,Typography } from '@mui/material';
import { Gauge ,gaugeClasses } from '@mui/x-charts/Gauge'
class AssetsMetrics extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {assets} = this.props
        let total_assets = assets.length
        let active_assets = assets.filter((asset)=>asset.status==="Active").length
        let retired_assets = assets.filter((asset)=>asset.status==="Retired").length
        let inactive_assets = assets.filter((asset) => asset.status === "Inactive").length
        let under_maintenance = assets.filter((asset)=>asset.status==="Under Maintenance").length
        let out_of_warranty = assets.filter((asset)=>new Date(asset.warranty_expiration_date).getTime() < new Date().getTime() && asset.status!=="Retired").length
        
        let retired_percentage = total_assets!==0?parseInt(((retired_assets/total_assets))*100):0
        let tota_active_asset = active_assets + under_maintenance
        let out_of_warranty_percentage = tota_active_asset!==0?parseInt((1-(out_of_warranty/tota_active_asset))*100):0
        let under_maintenance_percentage = tota_active_asset!==0?parseInt(((under_maintenance/tota_active_asset))*100):0
        
        let active_assets_percentage = total_assets!==0? parseInt((((tota_active_asset )/total_assets))*100): 0
        return (
            <>
                 <Grid container spacing={4} sx={{mb:2}}>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Paper elevation={1} sx={{width:"100%",p:1 }}>
                                <Typography variant="overline" gutterBottom >
                                    Active Assets
                                </Typography>
                                <Gauge width={200} height={200} value={active_assets_percentage} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: active_assets_percentage >= 75 ?'#2e7d32':'#d32f2f',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                              
                                <Typography variant="overline" sx={{ fontWeight: 'bold' }} display={'block'} align='right' color={active_assets_percentage >= 75 ?'#2e7d32':'#d32f2f'}  gutterBottom>
                                    
                                    {active_assets_percentage >= 75 ?'Good rate':'below average'}
                                </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Paper elevation={1} sx={{width:"100%",p:1 }}>
                                <Typography variant="overline" gutterBottom >
                                    Under warranty
                                </Typography>
                                <Gauge width={200} height={200} value={out_of_warranty_percentage} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: out_of_warranty_percentage >= 75 ?'#2e7d32':'#d32f2f',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                             
                                <Typography variant="overline" sx={{ fontWeight: 'bold' }} display={'block'} align='right' color={out_of_warranty_percentage >= 75 ?'#2e7d32':'#d32f2f'}  gutterBottom>
                                    
                                    {out_of_warranty_percentage >= 75 ?'Good rate':'below average'}
                                </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Paper elevation={1} sx={{width:"100%",p:1 }}>
                                <Typography variant="overline" gutterBottom >
                                    Under maintenance
                                </Typography>
                                <Gauge width={200} height={200} value={under_maintenance_percentage} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: under_maintenance_percentage <= 25 ?'#2e7d32':'#d32f2f',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                              
                                <Typography variant="overline" sx={{ fontWeight: 'bold' }} display={'block'} align='end' color={under_maintenance_percentage <= 25 ?'#2e7d32':'#d32f2f'}  gutterBottom>
                                    
                                    {under_maintenance_percentage <= 25 ?'Good rate':'below average'}
                                </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Paper elevation={1} sx={{width:"100%",p:1 }}>
                                <Typography variant="overline" gutterBottom >
                                    Retired assets 
                                </Typography>
                                <Gauge width={200} height={200} value={retired_percentage} 
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#2b8cbe',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'greylight',
                                    },
                                    m:'auto'
                                })}
                                />
                            
                                <Typography variant="overline" sx={{ fontWeight: 'bold' }} display={'block'} align='end' color={'#2b8cbe'}  gutterBottom>
                                    
                                    neutral value
                                </Typography>
                        </Paper>
                    </Grid>
    
                 
                </Grid>
            </>
        );
    }
}

export default AssetsMetrics;