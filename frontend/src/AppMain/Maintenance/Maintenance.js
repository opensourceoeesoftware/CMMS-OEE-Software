import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AssetsTable from './MaintenanceTable/MaintenanceTable';


class Maintenance extends Component {
    render() {
        return (
            <>
            <Routes>
                    <Route path="*" Component={AssetsTable} /> 

                </Routes>
            </>
        );
    }
}

export default Maintenance;