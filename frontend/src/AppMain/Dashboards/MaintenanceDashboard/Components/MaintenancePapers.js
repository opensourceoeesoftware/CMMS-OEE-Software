import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import {  BlurOnRounded } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import DangerousIcon from '@mui/icons-material/Dangerous';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
class MaintenancePapers extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { maintenances } = this.props

        let pending = maintenances.filter((m)=>m.status === "Pending").length
        let in_progress = maintenances.filter((m)=>m.status === "In Progress").length
        let completed = maintenances.filter((m)=>m.status === "Completed").length
        let cancelled = maintenances.filter((m)=>m.status === "Cancelled").length
        
        return (
            <>
                <Grid container spacing={4} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={1} sx={{ height: 150, width: "100%", p: 1, bgcolor: 'success.main' }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                    Pending maintenances
                                </Typography>
                                <BlurOnRounded sx={{ color: 'white' }} />
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{ color: 'white', pl: 1 }}
                            >
                                {pending}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                Maintenances that are created but not handled
                            </Typography>







                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={1} sx={{ height: 150, width: "100%", p: 1, bgcolor: 'info.main' }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                    Ongoing maintenances
                                </Typography>
                                <ConstructionIcon sx={{ color: 'white' }} />
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{ color: 'white', pl: 1 }}
                            >
                                {in_progress}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                Maintenances that are been handled now
                            </Typography>







                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={1} sx={{ height: 150, width: "100%", p: 1, bgcolor: 'secondary.main' }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                    Completed maintenances
                                </Typography>
                                <BookmarkAddedIcon sx={{ color: 'white' }} />
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{ color: 'white', pl: 1 }}
                            >
                                {completed}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                Maintenances that are finished
                            </Typography>







                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={1} sx={{ height: 150, width: "100%", p: 1, bgcolor: 'error.main' }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                    Cancelled maintenances
                                </Typography>
                                <DangerousIcon sx={{ color: 'white' }} />
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{ color: 'white', pl: 1 }}
                            >
                                {cancelled}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                Maintenances that are Cancelled
                            </Typography>







                        </Paper>
                    </Grid>

                </Grid>
            </>
        );
    }
}

export default MaintenancePapers;