import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import FaultsTable from './FaultsTable/FaultsTable';
import AppLayout from '../../Layout/AppLayout'
class Faults extends Component {
    render() {
        return (
            <AppLayout>
            <Routes>
                    <Route path="*" Component={FaultsTable} /> 
                </Routes>
            </AppLayout>
        );
    }
}

export default Faults;