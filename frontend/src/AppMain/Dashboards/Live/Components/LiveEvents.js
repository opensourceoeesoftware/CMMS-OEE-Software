import React, { Component } from 'react';
import AuthContext from '../../../../AuthProvider/AuthContext';
import { Grid ,Paper,Box} from '@mui/material';
import Event from './Event';
import { wsurl } from '../../../../Config';
class LiveEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:false,
            list:[],
            socket:undefined,
            events:[],
            machine:''
        }
        this.connect = this.connect.bind(this)
       
    }

    connect() {
        if(this.props.machine==='') return
        let temp_this = this
        const dataSocket = new WebSocket(
             wsurl
            + '/ws/machine-data/?token='+this.context.state.token
            + '&machine='
            + this.props.machine
           
        );

        dataSocket.onmessage = function(e) {
            let data = JSON.parse(e.data);
            
            temp_this.setState({events:data.data})
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
    render() {
       
        return (
            <>
            <Grid container spacing={4} >

                <Grid item md={12} xs={12} lg={12} >
                    

                        <Paper elevation={0} sx={{height:75,display:'flex',overflow:'hidden', justifyContent:'end'}}>
                            <Box  sx={{display:'flex',width:'fit-content'}}>

                            {this.state.events?.map?.((value,index)=>{
                                return <Event key={value.uuid} event={ value}></Event>
                            })}
                            </Box>

                        </Paper>
                    
                    
                </Grid>
            </Grid>
                
            </>
        );
    }
}
LiveEvents.contextType = AuthContext
export default LiveEvents;