import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalWifiStatusbarNullIcon from '@mui/icons-material/SignalWifiStatusbarNull';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RepartitionIcon from '@mui/icons-material/Repartition';
class EventDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        const {event} = this.props

        return (
            <>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={this.props.anchorEl}
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    
                >
                    <MenuList>
                    <MenuItem onClick={this.props.handleClose} >
                            <ListItemIcon>
                                <CloseIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> <strong>Close</strong></ListItemText>
                           
                        </MenuItem >
                        <Divider></Divider>
                    <MenuItem onClick={this.props.handleClose} >
                            <ListItemIcon>
                                <AccessTimeIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> Time <strong>{new Date(event?.created_at).toLocaleString()}</strong></ListItemText>
                           
                        </MenuItem >


                        <MenuItem onClick={this.props.handleClose}>
                            <ListItemIcon>
                                <PrecisionManufacturingIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Machine <strong>{event?.machine?.name}</strong> </ListItemText>
                           
                        </MenuItem >
                        <MenuItem onClick={this.props.handleClose}>
                            <ListItemIcon>
                                <SignalWifiStatusbarNullIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Status <strong>{event?.state}</strong> </ListItemText>
                           
                        </MenuItem >
                        <MenuItem onClick={this.props.handleClose}>
                            <ListItemIcon>
                                <BubbleChartIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> Quantity <strong>{event?.quantity}</strong> </ListItemText>
                           
                        </MenuItem >
                        <MenuItem onClick={this.props.handleClose}>
                            <ListItemIcon>
                                <ThumbDownOffAltIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> Scrap <strong>{event?.scrap}</strong> </ListItemText>
                           
                        </MenuItem >
                        <MenuItem onClick={this.props.handleClose}>
                            <ListItemIcon>
                                <QrCodeIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> Product <strong>{event?.product?.product_name || 'null'}</strong></ListItemText>
                           
                        </MenuItem >
                        <MenuItem onClick={this.props.handleClose}>
                            <ListItemIcon>
                                <ErrorOutlineIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> Fault <strong> {event?.fault?.name || 'null'} </strong> </ListItemText>
                           
                        </MenuItem >
                        <MenuItem onClick={this.props.handleClose}>
                            <ListItemIcon>
                                <RepartitionIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText > Cell <strong> {event?.cell?.name || 'null'}  </strong> </ListItemText>
                           
                        </MenuItem >
                        <Divider></Divider>
                      


                    </MenuList>

                </Menu>

            </>
        );
    }
}

export default EventDetails;