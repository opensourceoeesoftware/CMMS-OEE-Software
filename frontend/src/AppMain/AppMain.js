import React, { Component } from 'react';
import Assets from './Assets/Assets';
import { Route, Routes ,Navigate} from 'react-router-dom';
import Maintenance from './Maintenance/Maintenance';
import Users from './Users/Users';
import Dashboards from './Dashboards/Dashboards'
import DashboardsCMMS from './Dashboards/DashboardsCMMS';
import OperatorView from './OperatorView/OperatorView';
import AuthContext from '../AuthProvider/AuthContext';
import Cells from './Cells/Cells';
import Faults from './Faults/Faults';
import Products from './Products/Products'
class AppMain extends Component {
    render() {
        return (
            <>
           
            
            <Routes>
                    {this.context.state.user_profile?.type ==='Admin' &&
                    <>
                    <Route path="/admin/assets/*" Component={Assets} /> 
                    <Route path="/cmms/maintenance/*" Component={Maintenance} /> 
                    <Route path="/admin/users/*" Component={Users} /> 
                    <Route path="/dashboards/*" Component={Dashboards} /> 
                    <Route path="/cmms/dashboards/*" Component={DashboardsCMMS} /> 
                    <Route path="/operator/*" Component={OperatorView} /> 
                    <Route path="/admin/cells/*" Component={Cells} /> 
                    <Route path="/admin/faults/*" Component={Faults} /> 
                    <Route path="/admin/products/*" Component={Products} /> 
                    <Route path="*" Component={DashboardsCMMS} /> 
                    
                    </>
                    
                    }
                    {this.context.state.user_profile?.type ==='Reporter' &&
                    <>
                    
                        <Route path="/operator/*" Component={OperatorView} /> 
                        <Route path="*" Component={OperatorView} /> 
                    
                    
                    </>
                    
                    }
                    
                  
                  

                </Routes>
            </>
            
                
           
        );
    }
}
AppMain.contextType = AuthContext
export default AppMain;