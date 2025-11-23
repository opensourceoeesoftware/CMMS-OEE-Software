import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductsTable from './ProductsTable/ProductsTable';
import AppLayout from '../../Layout/AppLayout'
class Products extends Component {
    render() {
        return (
            <AppLayout>
            <Routes>
                    <Route path="*" Component={ProductsTable} /> 
                </Routes>
            </AppLayout>
        );
    }
}

export default Products;