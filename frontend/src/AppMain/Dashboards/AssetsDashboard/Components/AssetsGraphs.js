import React, { Component } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Grid } from '@mui/material';
import {Typography} from '@mui/material';
const XcongifCosts = [
    { 
        data: ['Purchase costs $', 'Now value $','Depreciation -$'], 
        scaleType: 'band' ,
        label: 'Assets costs and values $',
        colorMap: {
            type: 'ordinal',
            colors: ['#2e7d32', '#2b8cbe', '#d32f2f', '#9c27b0', '#2b8cbe', 'black']
        },
        categoryGapRatio: 0.6
    }
]

const XconfigAllmetric =  [
    {
        data: ['Total','Active', 'Inactive', 'Maintenance', 'Warranty','Retired'], 
        label: 'Assets status', 
        scaleType: 'band', 
        colorMap: {
            type: 'ordinal',
            colors: ['#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
        }
    }]



class AssetsGraphs extends Component {
    constructor(props) {
        super(props)
    }
    render() {
     

        const { assets } = this.props
        let total_assets = assets.length
        let active_assets = assets.filter((asset) => asset.status === "Active" || asset.status === "Under Maintenance").length
        let retired_assets = assets.filter((asset) => asset.status === "Retired").length
        let inactive_assets = assets.filter((asset) => asset.status === "Inactive").length
        
        let under_maintenance = assets.filter((asset) => asset.status === "Under Maintenance").length
        let out_of_warranty = assets.filter((asset) => new Date(asset.warranty_expiration_date).getTime() < new Date().getTime() && asset.status!=="Retired").length
        let purchase_value = 0
        let now_value = 0
        assets.forEach(element => {
           
            element.cost? purchase_value += parseInt(element.cost) :purchase_value=purchase_value
            element.current_value?now_value += parseInt(element.current_value):now_value += now_value
          
        });
        let depreciation = purchase_value - now_value
    
        return (
            <>
                <Grid container spacing={4} sx={{ mb: 2 }}>
                    <Grid item md={12} xs={12} lg={6}>
                        
                        <Paper sx={{ width: "100%", p: 1 }}>
                        <Typography variant="h5" gutterBottom 
                            sx={{p: 2}}
                            >
                                Assets status details
                            </Typography>
                            <BarChart
                                series={[{ data: [total_assets,active_assets, inactive_assets, under_maintenance, out_of_warranty,retired_assets] },]}
                                height={400}
                                
                                xAxis={XconfigAllmetric}              
                                
                            />
                        </Paper>
                    </Grid>
                    <Grid item md={12} xs={12} lg={6}>
                        <Paper sx={{ width: "100%", p: 1 }}>
                        <Typography variant="h5" gutterBottom 
                            sx={{p: 2}}
                            >
                                Assets value details
                            </Typography>
                            <BarChart
                                series={[{ data: [purchase_value, now_value,depreciation], },]}
                                height={400}
                                xAxis={XcongifCosts}
                                
                                
                            />
                        </Paper>
                    </Grid>
                </Grid>


            </>
        );
    }
}

export default AssetsGraphs;