import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AssetsDashboard from './AssetsDashboard/AssetsDashboard';
import MaintenanceDashboard from './MaintenanceDashboard/MaintenanceDashboard';
import Agenda from './Agenda/Agenda';
import Live from './Live/Live';
import Energy from './Energy/Energy';
import Oee from './Oee/Oee';
import Downtimes from './Downtimes/Downtimes';
class Dashboards extends Component {
    render() {
        return (
            <>
            <Routes>
                    <Route path="/assets" Component={AssetsDashboard} /> 
                    <Route path="/maintenances" Component={MaintenanceDashboard} /> 
                    <Route path="/agenda" Component={Agenda} /> 
                    <Route path="*" Component={AssetsDashboard} /> 

                </Routes>
                
            </>
        );
    }
}

export default Dashboards;