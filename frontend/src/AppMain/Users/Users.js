import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserTable from './UserTable/UserTable';
import AppLayout from "../../Layout/AppLayout";

class Users extends Component {
    render() {
        return (
            <AppLayout>
            <Routes>
                    <Route path="*" Component={UserTable} /> 

                </Routes>
            </AppLayout>
        );
    }
}

export default Users;