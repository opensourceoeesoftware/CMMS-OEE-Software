import * as React from 'react';
import { url as url_base } from '../../../Config';
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../../../AuthProvider/AuthContext';

class ProductEditForm extends React.Component {
  constructor(props) {
    super(props);

    const { product } = props;

    this.state = {
      is_loading: false,
      product_name: product?.product_name || '',
      product_id: product?.product_id || '',
      ideal_cycle: product?.ideal_cycle || 0,
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      const p = this.props.product;
      this.setState({
        product_name: p?.product_name || '',
        product_id: p?.product_id || '',
        ideal_cycle: p?.ideal_cycle || 0,
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  isBadForm() {
    const { product_name, product_id, ideal_cycle } = this.state;

    if (!product_name || !product_id || !ideal_cycle) {
      toast.error("Please fill in all required fields");
      return true;
    }
    return false;
  }

  async handleRegister() {
    if (this.isBadForm()) return;

    this.setState({ is_loading: true });

    try {
      const { product } = this.props;
      const method = product ? "patch" : "post";
      const url =
        url_base + "/api/v2/products-read/" + (product ? `${product.uuid}/` : "");

      const formData = new FormData();
      formData.append("product_name", this.state.product_name);
      formData.append("product_id", this.state.product_id);
      formData.append("ideal_cycle", this.state.ideal_cycle);

      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + this.context.state.token,
        },
      });

      toast.success(`Product ${product ? "updated" : "created"}`);

      if (this.props.OnUpdate) this.props.OnUpdate();
    } catch (error) {
      toast.error(
        "Something went wrong! " +
          (error?.response?.data?.detail || "")
      );
    } finally {
      this.setState({ is_loading: false });
    }
  }

  render() {
    const { product } = this.props;

    return (
      <Drawer
        anchor="right"
        open={this.props.show}
        onClose={this.props.handleClose}
        PaperProps={{
          sx: {
            width: "50vw",
            minWidth: 420,
            maxWidth: 720,
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.default",
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        {/* Loading overlay */}
        <Backdrop
          sx={{ zIndex: theme => theme.zIndex.drawer + 3 }}
          open={this.state.is_loading}
        >
          <CircularProgress />
        </Backdrop>

        {/* Header */}
        <AppBar
          elevation={0}
          color="default"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={this.props.handleClose}>
              <CloseIcon />
            </IconButton>

            <Typography sx={{ flex: 1 }} variant="h6">
              {product ? "Edit Product" : "New Product"}
            </Typography>

            <Button variant="contained" onClick={this.handleRegister}>
              {product ? "Save" : "Create"}
            </Button>
          </Toolbar>
        </AppBar>

        {/* Scrollable body */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
          <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
            <Typography variant="h6" fontWeight={600}>
              Basic Information
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {/* Product Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="product_name"
                  value={this.state.product_name}
                  onChange={this.handleChange}
                />
              </Grid>

              {/* Product ID */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product ID"
                  name="product_id"
                  value={this.state.product_id}
                  onChange={this.handleChange}
                />
              </Grid>

              {/* Ideal Cycle */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ideal Cycle (seconds)"
                  type="number"
                  name="ideal_cycle"
                  value={this.state.ideal_cycle}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Drawer>
    );
  }
}

ProductEditForm.contextType = AuthContext;
export default ProductEditForm;
