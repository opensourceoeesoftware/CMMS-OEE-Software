import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { BlurOffRounded, BlurOnRounded } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ElderlyIcon from '@mui/icons-material/Elderly';
class AssetsPapers extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { assets } = this.props
        let total_assets = assets.length
        let active_assets = assets.filter((asset) => asset.status === "Active").length
        let inactive_assets = assets.filter((asset) => asset.status === "Inactive").length
        let under_maintenance = assets.filter((asset) => asset.status === "Under Maintenance").length
        let out_of_warranty = assets.filter((asset) => new Date(asset.warranty_expiration_date).getTime() < new Date().getTime() && asset.status !== "Retired").length
        let retired_assets = assets.filter((asset) => asset.status === "Retired").length

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
                                    All assets
                                </Typography>
                                <BlurOnRounded sx={{ color: 'white' }} />
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{ color: 'white', pl: 1 }}
                            >
                                {total_assets}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                All assets including retired assets
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
                                    Asset in maintenance
                                </Typography>
                                <ConstructionIcon sx={{ color: 'white' }} />
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{ color: 'white', pl: 1 }}
                            >
                                {under_maintenance}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                All assets with ongoing maintenance
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
                                    Asset out of warranty
                                </Typography>
                                <DocumentScannerIcon sx={{ color: 'white' }} />
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{ color: 'white', pl: 1 }}
                            >
                                {out_of_warranty}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                All assets with no warranty
                            </Typography>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={1} sx={{ height: 150, width: "100%", p: 1, bgcolor: 'warning.dark' }}>
                            <Stack direction="row" spacing={0}
                                justifyContent="space-between"
                                alignItems="center"
                            >


                                <Typography variant="overline" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                    Retired assets
                                </Typography>
                                <ElderlyIcon sx={{ color: 'white' }} />
                            </Stack>



                            <Typography variant="h4" gutterBottom align='left'
                                sx={{ color: 'white', pl: 1 }}
                            >
                                {retired_assets}
                            </Typography>
                            <Typography variant="caption" gutterBottom align='left' sx={{ color: 'white', m: 0 }} >
                                All assets that are no longer used
                            </Typography>

                        </Paper>
                    </Grid>

                </Grid>
            </>
        );
    }
}

export default AssetsPapers;