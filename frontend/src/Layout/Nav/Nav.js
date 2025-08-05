import React, { Component } from 'react';
import {Link,Navigate} from "react-router-dom"
import AuthContext from '../../AuthProvider/AuthContext';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
class Nav extends Component {
  constructor(props){
    super(props)
  }

  
    render() {
        return (
    
<nav className="main-header navbar navbar-expand navbar-white navbar-light">
 
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" style={{color:'primary.main'}} /></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block" >
      <Link to={'/dashboards/live'} replace={true} className='nav-link' style={{color:'primary.main'}}>Dashboards</Link>
     
    </li>
    <li className="nav-item d-none d-sm-inline-block" >
      <Link to={'/cmms/dashboards/assets'} replace={true} className='nav-link' style={{color:'primary.main'}}>CMMS</Link>
     
    </li>
    
    <li className="nav-item d-none d-sm-inline-block" >
      <Link to={'/admin/assets/table'} replace={true} className='nav-link' style={{color:'primary.main'}}>Admin</Link>
     
    </li>
    
    
    
  </ul>

  <ul className="navbar-nav ml-auto">
  
    {/* Notifications Dropdown Menu */}
    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="far fa-user" style={{color:'primary.main'}}/>
        
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span className="dropdown-item dropdown-header">Profile actions</span>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item" onClick={this.context.logout}>
          <i className="fas fa-arrow-right mr-2" style={{color:'primary.main'}} /> Logout
          
        </a>
        <a href="#" className="dropdown-item" >
          <PersonRemoveIcon sx={{ color: 'primary.main' }} /> Delete profile (comming soon)
          
        </a>
        <div className="dropdown-divider" />
      
       
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer"></a>
      </div>
    </li>
    <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-expand-arrows-alt" style={{color:'primary.main'}} />
      </a>
    </li>
  
  </ul>
</nav>


        );
    }
}
Nav.contextType = AuthContext;
export default Nav;