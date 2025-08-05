import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductsTable from './ProductsTable/ProductsTable';

class Products extends Component {
    render() {
        return (
            <>
            <Routes>
                    <Route path="*" Component={ProductsTable} /> 
                </Routes>
            </>
        );
    }
}

export default Products;