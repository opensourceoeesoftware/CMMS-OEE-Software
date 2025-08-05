import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import OperatorAgenda from './OperatorAgenda';
import OperatorControl from './OperatorControl';
class OperatorView extends Component {
    render() {
        return (
            <>
              
              <Routes>            
              <Route path="/agenda" Component={OperatorAgenda} /> 
              <Route path="/control" Component={OperatorControl} /> 
              <Route path="/*" Component={OperatorControl} /> 
                </Routes>  
            </>
        );
    }
}

export default OperatorView;