import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AssetsTable from './MaintenanceTable/MaintenanceTable';
import AppLayout from "../../Layout/AppLayout";

class Maintenance extends Component {
    render() {
        return (
            <AppLayout>
            <Routes>
                    <Route path="*" Component={AssetsTable} /> 

                </Routes>
            </AppLayout>
        );
    }
}

export default Maintenance;