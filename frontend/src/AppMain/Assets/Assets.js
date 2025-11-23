import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AssetsTable from './AssetsTable/AssetsTable';
import AppLayout from "../../Layout/AppLayout";

class Assets extends Component {
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

export default Assets;