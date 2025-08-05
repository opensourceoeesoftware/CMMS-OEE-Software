import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login'
import Register from './Register/Register';

import PasswordReset from './PasswordReset/PasswordReset';
import PasswordChange from './PasswordReset/PasswordChange';

import Terms from './Terms/Terms';
import PrivacyPolicy from './Privacy/PrivacyPolicy';
class PublicPages extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path="/login" Component={Login} /> 
                    <Route path="/register" Component={Register} />
                    <Route path="/password-reset-email" Component={PasswordReset} />
                    <Route path="/password-change" Component={PasswordChange} />
                    <Route path="/terms" Component={Terms} />
                    <Route path="/policy" Component={PrivacyPolicy} />
                    <Route path="/*" Component={Login} /> 
                </Routes>

            </>
        );
    }
}

export default PublicPages;