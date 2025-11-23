import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import { url } from "../../Config";

import { Navigate } from "react-router-dom";
import axios from "axios";

import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Grid,
  CardHeader,
  CardContent,
  CardActions,
  Card,
  CardMedia,
  Button,
  Backdrop,
  CircularProgress
} from "@mui/material";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      email: "",
      organization: "",
      is_created: false,
      is_loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.HandleRegister = this.HandleRegister.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkForm() {
    const { username, password, password2, email, organization } = this.state;

    if (!username || !password || password !== password2 || !email || !organization) {
      toast.error("Please check all information and try again");
      return true;
    }
    return false;
  }

  async HandleRegister() {
    if (this.checkForm()) return;

    this.setState({ is_loading: true }, async () => {
      const { username, password, password2, email, organization } = this.state;

      try {
        const response = await axios.post(url + "/api/auth/profile/", {
          username,
          password,
          password2,
          email,
          organization
        });

        if (response.status === 201) {
          toast.success("Account created. You can login now.");
          this.setState({ is_created: true });
        }
      } catch (error) {
        toast.error("Error: " + (error.response?.data?.detail || "Try again"));
        this.setState({ is_loading: false });
      }
    });
  }

  render() {
    const { is_created } = this.state;

    return (
      <>
        {is_created && <Navigate to="/login" replace />}

        <ToastContainer />

        {/* Full screen background */}
        <Grid
          container
          sx={(theme) => ({
            minHeight: "100vh",
            background: theme.palette.loginBg.main,
            display: "flex",
            p: 2
          })}
        >
          <Grid item xs={12} sm={10} md={6} lg={4} sx={{ margin: "auto" }}>
            <Card sx={{ width: "100%", borderRadius: 2 }}>
              <CardMedia
                sx={{ height: 60, objectFit: "contain", pt: 2 }}
                image="/g888.png"
                component="img"
              />

              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.is_loading}
              >
                <CircularProgress />
              </Backdrop>

              <CardHeader title="Create Your Account" />

              <CardContent>
                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Username</InputLabel>
                  <Input name="username" onChange={this.handleChange} />
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Organization</InputLabel>
                  <Input name="organization" onChange={this.handleChange} />
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Email</InputLabel>
                  <Input name="email" type="email" onChange={this.handleChange} />
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Password</InputLabel>
                  <Input name="password" type="password" onChange={this.handleChange} />
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Repeat Password</InputLabel>
                  <Input name="password2" type="password" onChange={this.handleChange} />
                </FormControl>
              </CardContent>

              <CardActions sx={{ p: 2 }}>
                <Button variant="contained" fullWidth onClick={this.HandleRegister}>
                  Register
                </Button>
              </CardActions>

              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Button href="/terms" target="_blank">
                  Terms
                </Button>
                <Button href="/login">Login</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Register;
