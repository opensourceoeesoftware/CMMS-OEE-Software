import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import CellsTable from './CellsTable/CellsTable';
import AppLayout from "../../Layout/AppLayout";


class Cells extends Component {
    render() {
        return (
            <AppLayout>
            <Routes>
                    <Route path="*" Component={CellsTable} /> 
                </Routes>
            </AppLayout>
        );
    }
}

export default Cells;