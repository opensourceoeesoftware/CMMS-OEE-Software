import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import OperatorAgenda from './OperatorAgenda';
import OperatorControl from './OperatorControl';
import AppLayout from "../../Layout/AppLayout";
class OperatorView extends Component {
    render() {
        return (
            <AppLayout>
              
              <Routes>            
              <Route path="/agenda" Component={OperatorAgenda} /> 
              <Route path="/control" Component={OperatorControl} /> 
              <Route path="/*" Component={OperatorControl} /> 
                </Routes>  
            </AppLayout>
        );
    }
}

export default OperatorView;