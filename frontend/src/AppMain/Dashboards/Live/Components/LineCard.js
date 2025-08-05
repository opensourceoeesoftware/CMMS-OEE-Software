import React, { Component } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import EventDetails from './EventDetails';
import IconButton from '@mui/material/IconButton';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BarChartIcon from '@mui/icons-material/BarChart';
import AuthContext from '../../../../AuthProvider/AuthContext';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import GppBadIcon from '@mui/icons-material/GppBad';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { Grid } from '@mui/material';

import { Link, } from 'react-router-dom';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import { wsurl } from '../../../../Config';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

class LineCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
            data: {},
            anchorEl:null,
            ooes:[],
            open:false,
            show_graph:true,
            anchorEl:null,
            list:[]
        }
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.connect = this.connect.bind(this)
        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
       

    }
    handleClick (event)  {
        this.setState({...this.state,anchorEl:event.currentTarget,open:true});
      };
    connect() {
        if (this.props.machine === '') return
        let temp_this = this
        const dataSocket = new WebSocket(
            wsurl
            + '/ws/machine-oee/?token=' + this.context.state.token
            + '&machine='
            + this.props.machine?.uuid

        );

        dataSocket.onmessage = function (e) {
            let data = JSON.parse(e.data);
            // console.log(data)

            temp_this.setState({ data: data.data,ooes:data.oee ,list:data.list})
            // setTimeout(()=>{
            //     dataSocket.send(JSON.stringify({'message':'test'}))

            // },1)
        };

        dataSocket.onclose = function (e) {
           
        };
        this.setState({ ...this.state, socket: dataSocket, machine: this.props.machine })
    }
    handleExpandClick() {
        this.setState({ ...this.state, expanded: !this.state.expanded });
    };
    componentDidMount() {

        this.connect()

    }
    handleClose () {
        this.setState({...this.state,anchorEl:null,open:false});
      };
    toggleDrawer() {
        var value = !this.state.show_graph
        this.setState({...this.state,show_graph:value})
    }
    componentDidUpdate(previousState) {
        if (previousState.machine !== this.props.machine) {
            this.state.socket?.close()
            this.connect()
        }
    }
    componentWillUnmount() {
        this.state.socket?.close()
    }
    render() {
        const { machine } = this.props
        const { data,ooes } = this.state
        // console.log(this.state.ooes)
        
        let availability = parseInt(data?.availability * 100)
        let performance = parseInt(data?.performance * 100)
        let quality = parseInt(data?.quality * 100)
        let oee = parseInt(data?.oee )

    

        let avail_color = availability >=65?'#2e7d32':'#ed6c02'
        let per_color = performance >=65?'#2e7d32':'#ed6c02'
        let qual_color = quality >=65?'#2e7d32':'#ed6c02'
        
        let ooes_values = []
        let ooes_labels = []
        let ooes_labels_t = []
        let ooes_colors = []

        var cnt = 0
        var hours = 24
        
        if(ooes)
        ooes.forEach(element => {
            ooes_values.push(element.oee)
            ooes_labels.push(cnt)
            var k = element.oee >=65?'#2e7d32':'#ed6c02'
            ooes_colors.push(k)
            ooes_labels_t.push(hours + ' h')
            hours = hours - 1
            cnt += 1
            
        });
        const XconfigAllmetric =  [
            {
                data: ooes_labels_t, 
                label: '', 
                scaleType: 'band', 
                colorMap: {
                    type: 'ordinal',
                    colors: ooes_colors
                    // colors: ['#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
                },
                categoryGapRatio: 0.3
            }]
        const XconfigAllmetric_c =  [
            {
                data: ooes_labels_t, 
                label: '', 
                scaleType: 'band', 
                colorMap: {
                    type: 'ordinal',
                    colors: [avail_color, per_color, qual_color, '#9c27b0', '#2b8cbe', 'grey']
                    // colors: ['#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0', '#2b8cbe', 'grey']
                },
                categoryGapRatio: 0.8
            }]
        let oee_color = data?.oee >= 65 ? '#2e7d32' : '#ed6c02'

            const event = this.state.list?.reverse()[0]
    
        return (

            <>
                <Card elevation={2} sx={{mb:3,height:"100%"}} >
                    <CardHeader sx={{paddingBottom:0}}
                                              
                        // title={machine.name}
                        subheader={machine.name||'-'}
                    />

                    <CardContent sx={{padding:0}} >
                        {this.state.show_graph &&
                        <>
                         <Grid container spacing={0}  >
                            <Grid item xs={12} >
                                {/* <LiveEvents machine={machine?.uuid}></LiveEvents> */}
                                <LineChart 
                                    xAxis={[{ data: ooes_labels,label: 'OEE last 24h', max:24,}]}
                                    yAxis={[
                                        {
                                          colorMap:
                                            
                                            {
                                              type: 'piecewise',
                                              thresholds: [65],
                                              colors: [ '#ed6c02', '#2e7d32'],
                                            } ,
                                        },
                                      ]}
                                    series={[
                                        {
                                        data: ooes_values,
                                        area: true,
                                        showMark: false,
                                        },
                                    ]}
                                    // width={500}
                                    height={200}
                                    

                                    />
                            </Grid>
                           
                        </Grid>
                        </>
                        }
                       {!this.state.show_graph && 
                       <>
                       <Grid container spacing={0} sx={{paddingLeft:2}} >
                            <Grid item xs={12} >
                            <Typography variant="button" gutterBottom sx={{ display: 'block' }}>
                                button text
                            </Typography>
                           
                              
                            </Grid>
                           
                        </Grid>
                       </>
                       }
                        
                      
                      


                    </CardContent>
                    <CardActions  disableSpacing>
                            <IconButton aria-label="add to favorites" onClick={this.handleClick}>
                                <EventNoteIcon />
                            </IconButton>
                            <Link to={'/dashboards/oee'} replace={true} onClick={(e)=>{
                                // e.preventDefault()
                                localStorage.setItem('asset_uuid',machine?.uuid)
                                // return true
                                
                                }} >

                                <IconButton aria-label="settings" color='primary'>
                                    <AutoModeIcon />
                                </IconButton>
                            </Link>
                            <Link to={'/dashboards/downtimes'} replace={true} onClick={(e)=>{
                                // e.preventDefault()
                                localStorage.setItem('asset_uuid',machine?.uuid)
                                // return true
                                
                                }} >

                                <IconButton aria-label="settings" color='primary'>
                                    <GppBadIcon />
                                </IconButton>
                            </Link>
                            <Link to={'/dashboards/energy'} replace={true} onClick={(e)=>{
                                // e.preventDefault()
                                localStorage.setItem('asset_uuid',machine?.uuid)
                                // return true
                                
                                }} >

                                <IconButton aria-label="settings" color='primary'>
                                    <ElectricBoltIcon />
                                </IconButton>
                            </Link>
                            <EventDetails open={this.state.open} 
                        anchorEl={this.state.anchorEl} 
                        handleClose={this.handleClose}
                        event={event}
                        ></EventDetails>
                     

                    </CardActions>
                  

                </Card>

            </>
        );
    }
}
LineCard.contextType = AuthContext
export default LineCard;