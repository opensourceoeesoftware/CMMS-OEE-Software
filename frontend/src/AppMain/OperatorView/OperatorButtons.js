import React, { Component } from 'react';
import { Grid,Card,Button } from '@mui/material';
import AuthContext from '../../AuthProvider/AuthContext';
import axios from 'axios';
import { url as url_base,wsurl } from '../../Config';
import { toast } from 'react-toastify';
import ErrorHHandler from './ErrorHHandler';
  
class OperatorButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:false,
            list:[],
            socket:undefined,
            last_event:[],
            machine:'',
            product:'',
            cell:'',
            fault:'',
            quantity: 0,
            scrap: 0,
            show_report:false

        }
        this.connect = this.connect.bind(this)
        this.handleReport = this.handleReport.bind(this)
        this.handleShowReport = this.handleShowReport.bind(this)
       
    }
    connect() {
        if(this.props.machine==='') return
        let temp_this = this
        const dataSocket = new WebSocket(
            wsurl
            + '/ws/machine-report/?token='+this.context.state.token
            + '&machine='
            + this.props.machine
           
        );

        dataSocket.onmessage = function(e) {
            let data = JSON.parse(e.data);
            
            temp_this.setState({last_event:data.data})
            if(temp_this.props.stopLoad)temp_this.props.stopLoad()
        };

        dataSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly',e);
        };
        this.setState({...this.state, socket:dataSocket,machine:this.props.machine})
    }
    componentDidMount() {
       
        this.connect()
        
    }
    componentDidUpdate(previousState) {
        if(previousState.machine !== this.props.machine) {
            this.state.socket?.close()
            this.connect()
        }
    }
    componentWillUnmount() {
        this.state.socket?.close()
    }
    async handleReport(data) {
        if(this.props.startLoad)this.props.startLoad()
            try {
                const { machine } = this.props;  // Get the asset object from props
                const method = 'post' ;
                const url = url_base + '/api/v2/events/' ;
              
                const response = await axios({
                    method: method,
                    url: url,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + this.context.state.token
                    }
                });
                toast.success( 'updated' );
            if(this.props.stopLoad)this.props.stopLoad()
               
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong! Please try again. Hint: " + error.response?.data['detail']);
                if(this.props.stopLoad)this.props.stopLoad()
            } finally {
              this.setState({...this.state,show_report:false})
            }

    }
    handleShowReport() {
        let show_report = ['run','resume fault','report'].includes(this.state.last_event?.state)
        this.setState({...this.state,show_report:show_report})
    }
    async sendData(state) {
       
        if(this.props.startLoad)this.props.startLoad()
        try {
            const { machine } = this.props;  // Get the asset object from props
            const method = 'post' ;
            const url = url_base + '/api/v2/events/' ;
            var data_to_send = {
                'state':state,
                'machine': machine
            }
            const response = await axios({
                method: method,
                url: url,
                data: data_to_send,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + this.context.state.token
                }
            });

            toast.success( 'updated' );
            if(this.props.stopLoad)this.props.stopLoad()
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Please try again. Hint: " + error.response?.data['detail']);
            if(this.props.stopLoad)this.props.stopLoad()
        } finally {
          
        }
    }
    render() {
        let red = 'error'
        let orange = 'warning'
        let purple = 'secondary'
        let green = 'success'
        let blue = 'primary'
        let color_map = {
            'on':blue,
            'off':'grey',
            'fault':orange,
            'resume fault':green,
            'failure':orange,
            'resume failure':blue,
            'out of order':red,
            'resume out of order':'grey',
            'break in':purple,
            'resume break in':green,
            'break out':purple,
            'resume break out':blue,
            'report':green,
            'run':green,
            'stop':blue,


        }
        let report_error = ['fault','failure','out of order'].includes(this.state.last_event?.state)
        let filtred_cells = this.props.cells.filter((e)=>e.machine?.uuid === this.props.machine)
        let filtred_faults = this.props.faults.filter((e)=>e.machine?.uuid === this.props.machine)
        
        return (
            <>
           <Grid container spacing={2} sx={{mb:2}}>
           <Grid item xs={12}>
                <Button sx={{width:'100%',height:50}} variant='contained'  color={color_map[this.state.last_event?.state]}
                        >
                    
                    Machine state: {this.state.last_event?.state}
                </Button>
            </Grid>
                
           </Grid>
           

            <Grid container spacing={2} sx={{mb:2}}>
            {(['off','resume out of order'].includes(this.state.last_event?.state)) && 
                <Grid item xs={12} lg={4}>
                <Button sx={{width:'100%',height:150}} variant='contained' 
                        onClick={(e)=>{this.sendData('on')}}>
                    
               On
                </Button>
            </Grid>
                }
                {(['off','resume out of order'].includes(this.state.last_event?.state)) && 
                <Grid item xs={12} lg={4}>
                <Button sx={{width:'100%',height:150}} variant='contained' color='error'
                        onClick={(e)=>{this.sendData('out of order')}}>
                    
               Out of order
                </Button>
            </Grid>
                }
                {(['out of order'].includes(this.state.last_event?.state)) && 
                <Grid item xs={12} lg={4}>
                <Button sx={{width:'100%',height:150}} variant='contained' color='error'
                        onClick={(e)=>{this.sendData('resume out of order')}}>
                    
               Resume Out of order
                </Button>
            </Grid>
                }
                
                {(['on','stop','resume failure'].includes(this.state.last_event?.state)) && 
                
                <Grid item xs={12} lg={4}>
                    <Button sx={{width:'100%',height:150,}} variant='contained' color='success'
                            onClick={(e)=>{this.sendData('run')}}>
                        
                   Run
                    </Button>
                </Grid>
                }
                {(['on','resume failure','stop'].includes(this.state.last_event?.state)) && 
               
               
               <Grid item xs={12} lg={4}>
                   <Button sx={{width:'100%',height:150,}} variant='contained' color='warning'
                           onClick={(e)=>{this.sendData('failure')}}>
                       
                  Failure
                   </Button>
               </Grid>
              }
               
                {(['stop','resume failure','on'].includes(this.state.last_event?.state)) && 
                        <Grid item xs={12} lg={4}>
                        <Button sx={{width:'100%',height:150,}} variant='contained' color='grey'
                                onClick={(e)=>{this.sendData('off')}}>
                            
                    Off
                        </Button>
                    </Grid>
                }
                
                
                {(['run','resume fault','report'].includes(this.state.last_event?.state)) && 
               
               
               <Grid item xs={12} lg={4}>
                   <Button sx={{width:'100%',height:150,}} variant='contained' color='primary'
                           onClick={(e)=>{this.sendData('stop')}}>
                       
                  Stop
                   </Button>
               </Grid>
              }
                {(['run','resume fault','report'].includes(this.state.last_event?.state)) && 
               
               
               <Grid item xs={12} lg={4}>
                   <Button sx={{width:'100%',height:150,}} variant='contained' color='secondary'
                           onClick={this.handleShowReport}>
                       
                  Report
                   </Button>
               </Grid>
              }
               {(['run','resume fault','report'].includes(this.state.last_event?.state)) && 
               
                <Grid item xs={12} lg={4}>
                    <Button sx={{width:'100%',height:150,}} variant='contained' color='warning'
                            onClick={(e)=>{this.sendData('fault')}}>
                        
                   Fault
                    </Button>
                </Grid>
               }
               
               
               <ErrorHHandler 
               cells={filtred_cells}
               faults={filtred_faults}
               products={this.props.products}
               last_event={this.state.last_event}
               show = {report_error || this.state.show_report}
               onReport = {this.handleReport}
               
               >

               </ErrorHHandler>
            </Grid>
         
                
            </>
        );
    }
}
OperatorButtons.contextType=AuthContext
export default OperatorButtons;