import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';


import Stack from '@mui/material/Stack';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
class OeeComparaison extends Component {
  
    render() {
        const { data } = this.props
        let oee_24 = data?.oee_last_24h
        let oee_selected= data?.oee_selected_period

      

        let availability = parseFloat(oee_selected?.availability - oee_24?.availability).toFixed(2)
        if(isNaN(availability)) availability = 0

        let performance = parseFloat(oee_selected?.performance - oee_24?.performance).toFixed(2)
        if(isNaN(performance)) performance = 0
        let quality = parseFloat(oee_selected?.quality - oee_24?.quality).toFixed(2)
        if(isNaN(quality)) quality = 0

        let oee = parseFloat(oee_selected?.oee - oee_24?.oee).toFixed(2)
        if(isNaN(oee)) oee = 0

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
                                    Availability
                                </Typography>
                                {availability >= 0 ?<TrendingUpIcon sx={{ color: '#2e7d32' }}/> : <TrendingDownIcon sx={{ color: '#d32f2f' }} /> }
                                
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{pl:1, color:availability >= 0 ? '#2e7d32' :'#d32f2f'}}
                                
                            >
                                {availability}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0,mb:2 }} >
                                Compared to last 24h
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
                                    Performance
                                </Typography>
                                {performance >= 0 ?<TrendingUpIcon sx={{ color: '#2e7d32' }}/> : <TrendingDownIcon sx={{ color: '#d32f2f' }} /> }
                                
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{pl:1, color:performance >= 0 ? '#2e7d32' :'#d32f2f'}}
                                
                            >
                                {performance}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0 }} >
                                Compared to last 24h
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
                                    Quality
                                </Typography>
                                {quality >= 0 ?<TrendingUpIcon sx={{ color: '#2e7d32' }}/> : <TrendingDownIcon sx={{ color: '#d32f2f' }} /> }
                                
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{pl:1, color:quality >= 0 ? '#2e7d32' :'#d32f2f'}}
                                
                            >
                                {quality}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0 }} >
                                Compared to last 24h
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
                                    Over all Oee
                                </Typography>
                                {oee >= 0 ?<TrendingUpIcon sx={{ color: '#2e7d32' }}/> : <TrendingDownIcon sx={{ color: '#d32f2f' }} /> }
                                
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{pl:1, color:oee >= 0 ? '#2e7d32' :'#d32f2f'}}
                                
                            >
                                {oee}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{  m: 0 }} >
                                Compared to last 24h
                            </Typography>







                        </Paper>
                    </Grid>
              

                </Grid>
            </>
        );
    }
}

export default OeeComparaison;