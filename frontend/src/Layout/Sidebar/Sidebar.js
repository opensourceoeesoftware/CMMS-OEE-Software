import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Divider from '@mui/material/Divider';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import BarChartIcon from '@mui/icons-material/BarChart';
import ConstructionIcon from '@mui/icons-material/Construction';
import PersonIcon from '@mui/icons-material/Person';

import SensorsIcon from '@mui/icons-material/Sensors';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AuthContext from '../../AuthProvider/AuthContext';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import GppBadIcon from '@mui/icons-material/GppBad';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TuneIcon from '@mui/icons-material/Tune';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import Logo from './Logo'
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };

  }

  toggleMenu(menu) {
    this.setState(prevState => ({
      openMenu: prevState.openMenu === menu ? null : menu
    }));
  }

  render() {
    // const { openMenu } = this.state;

    return (
      <aside className="main-sidebar sidebar-light-info elevation-1 overflow-auto" >
        {/* Brand Logo */}

        {/* Sidebar */}
        <div className="sidebar">

          {/* Sidebar Menu */}
          <nav className="mt-0">
            {/* <li className="nav-header">Dashboards</li> */}


            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"

            >
              {this.context.state.user_profile?.['type']==='Admin' &&
                <>
                  <Link to={'/dashboards/live'} replace={true} >

                    <ListItemButton >
                      <ListItemIcon sx={{ color: 'primary.main' }} >
                       <Logo></Logo>
                      </ListItemIcon>

                      <ListItemText primaryTypographyProps={{ variant: "h5", gutterBottom: true, color: 'primary.main', sx: { mb: 0, fontWeight: 'bold' } }} primary="OEE" color='info' />
                    </ListItemButton>
                  </Link>

                  <Divider />

                  {(window.location.pathname.split('/')[1] === "dashboards" || window.location.pathname.split('/')[1] === "") && 
                  <>

                  <ListSubheader component="div" inset sx={{ color: 'primary.main',textWrap:'nowrap' }}>
                    <strong>Oee Dashboards</strong>
                  </ListSubheader>

                  <Link to={'/dashboards/live'} replace={true} >

                    <ListItemButton selected={window.location.pathname === "/dashboards/live" || window.location.pathname === "/"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <SensorsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Live" />
                    </ListItemButton>
                    
                    
                  </Link>
                  <Link to={'/dashboards/oee'} replace={true} >

                  
                    <ListItemButton selected={window.location.pathname === "/dashboards/oee" }>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <AutoModeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Oee" />
                    </ListItemButton>
                  </Link>
                  <Link to={'/dashboards/downtimes'} replace={true} >

                  
                    <ListItemButton selected={window.location.pathname === "/dashboards/downtimes"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <GppBadIcon />
                      </ListItemIcon>
                      <ListItemText primary="Downtimes" />
                    </ListItemButton>
                  </Link>
                  <Link to={'/dashboards/energy'} replace={true} >

                  
                    <ListItemButton selected={window.location.pathname === "/dashboards/energy"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <ElectricBoltIcon />
                      </ListItemIcon>
                      <ListItemText primary="Costs & Energy" sx={{textWrap:'nowrap'}}/>
                    </ListItemButton>
                  </Link>
                  </>
                  }

                 

                



                    {window.location.pathname.split('/')[1] === "admin" &&
                    <>
                    
                      <ListSubheader component="div" inset sx={{ color: 'primary.main',textWrap:'nowrap' }}>
                    <strong>Administration</strong>
                  </ListSubheader>

                  <Link to={'/admin/assets/table'} replace={true} >

                    <ListItemButton selected={window.location.pathname.split('/')[2] === "assets"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <PrecisionManufacturingIcon />
                      </ListItemIcon>
                      <ListItemText primary="Lines" />
                    </ListItemButton>
                  </Link>
                  <Link to={'/admin/cells/table'} replace={true} >

                    <ListItemButton selected={window.location.pathname.split('/')[2] === "cells"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <DashboardCustomizeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Cells" />
                    </ListItemButton>
                  </Link>
                  <Link to={'/admin/faults/table'} replace={true} >

                    <ListItemButton selected={window.location.pathname.split('/')[2] === "faults"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <FmdBadIcon />
                      </ListItemIcon>
                      <ListItemText primary="Faults" />
                    </ListItemButton>
                  </Link>
                  <Link to={'/admin/products/table'} replace={true} >

                    <ListItemButton selected={window.location.pathname.split('/')[2] === "products"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <CategoryIcon />
                      </ListItemIcon>
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </Link>
                  <Link to={'/admin/users/add'} replace={true} >
                    <ListItemButton selected={window.location.pathname.split('/')[2] === "users"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>

                        <PersonIcon></PersonIcon>
                      </ListItemIcon>
                      <ListItemText primary="Users" />
                    </ListItemButton>
                  </Link>
                    </>
                    
                    }

                  {window.location.pathname.split('/')[1] === "cmms" && 
                  <>

                  <ListSubheader component="div" inset sx={{ color: 'primary.main',textWrap:'nowrap' }}>
                    <strong>CMMS</strong>
                  </ListSubheader>
                  <Link to={'/cmms/dashboards/assets'} replace={true} >

                    <ListItemButton selected={window.location.pathname === "/cmms/dashboards/assets"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <AutoGraphIcon />
                      </ListItemIcon>
                      <ListItemText primary="Assets" />
                    </ListItemButton>
                  </Link>

                  <Link to={'/cmms/dashboards/maintenances'} replace={true} >

                    <ListItemButton selected={window.location.pathname === "/cmms/dashboards/maintenances"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <BarChartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Maintenances" />
                    </ListItemButton>
                  </Link>

                  <Link to={'/cmms/dashboards/agenda'} replace={true} >

                    <ListItemButton selected={window.location.pathname === "/cmms/dashboards/agenda"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <DateRangeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Agenda" />
                    </ListItemButton>
                  </Link>
                  <Link to={'/cmms/maintenance/add'} replace={true} >
                    <ListItemButton selected={window.location.pathname.split('/')[2] === "maintenance"}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>

                        <ConstructionIcon></ConstructionIcon>
                      </ListItemIcon>
                      <ListItemText primary="Plan" />
                    </ListItemButton>
                  </Link>
                  </>
                  }


                

                  

                </>}
              
                <ListSubheader component="div" inset sx={{ color: 'primary.main',textWrap:'nowrap' }}>
                    <strong>Operator</strong>
                  </ListSubheader>
              <Link to={'/operator/agenda'} replace={true} >
                <ListItemButton selected={window.location.pathname === "/operator/agenda"}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>

                    <EventNoteIcon />
                  </ListItemIcon>
                  <ListItemText style={{ textWrap: 'nowrap' }} primary="My Schedule" />
                </ListItemButton>
              </Link>
              <Link to={'/operator/control'} replace={true} >
                <ListItemButton selected={window.location.pathname === "/operator/control"}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>

                    <TuneIcon />
                  </ListItemIcon>
                  <ListItemText style={{ textWrap: 'nowrap' }} primary="Control" />
                </ListItemButton>
              </Link>


            </List>
          </nav>
        </div>
      </aside>
    );
  }
}
Sidebar.contextType = AuthContext

export default Sidebar;
