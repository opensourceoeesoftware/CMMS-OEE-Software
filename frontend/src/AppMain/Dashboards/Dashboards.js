import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Live from './Live/Live';
import Energy from './Energy/Energy';
import Oee from './Oee/Oee';
import Downtimes from './Downtimes/Downtimes';
import AppLayout from "../../Layout/AppLayout";
class Dashboards extends Component {
    render() {
        return (
            <AppLayout>
            <Routes>
                  
                    <Route path="/live" Component={Live} /> 
                    <Route path="/energy" Component={Energy} /> 
                    <Route path="/oee" Component={Oee}/> 
                    <Route path="/downtimes" Component={Downtimes}/> 
                    <Route path="*" Component={Oee} /> 

                </Routes>
                
            </AppLayout>
        );
    }
}

export default Dashboards;