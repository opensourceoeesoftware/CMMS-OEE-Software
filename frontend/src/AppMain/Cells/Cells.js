import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import CellsTable from './CellsTable/CellsTable';


class Cells extends Component {
    render() {
        return (
            <>
            <Routes>
                    <Route path="*" Component={CellsTable} /> 
                </Routes>
            </>
        );
    }
}

export default Cells;