import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserTable from './UserTable/UserTable';


class Users extends Component {
    render() {
        return (
            <>
            <Routes>
                    <Route path="*" Component={UserTable} /> 

                </Routes>
            </>
        );
    }
}

export default Users;