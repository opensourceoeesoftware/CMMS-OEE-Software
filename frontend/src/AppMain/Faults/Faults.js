import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import FaultsTable from './FaultsTable/FaultsTable';

class Faults extends Component {
    render() {
        return (
            <>
            <Routes>
                    <Route path="*" Component={FaultsTable} /> 
                </Routes>
            </>
        );
    }
}

export default Faults;