import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { url } from "../../Config";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
  Backdrop,
  CircularProgress,
  Typography
} from "@mui/material";

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      password: "",
      password2: "",
      password_changed: false,
      is_loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.HandleChangePassword = this.HandleChangePassword.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async HandleChangePassword() {
    const { token, password, password2 } = this.state;

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    this.setState({ is_loading: true }, async () => {
      try {
        await axios.post(url + "/api/password_reset/confirm/", {
          token,
          password
        });

        this.setState({ password_changed: true });
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        this.setState({ is_loading: false });
      }
    });
  }

  render() {
    const { token, password, password2, password_changed } = this.state;

    return (
      <>
        {/* Redirect when done */}
        {password_changed && <Navigate to="/login" replace />}

        <ToastContainer />

        {/* Background Container */}
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

              {/* Loading overlay */}
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.is_loading}
              >
                <CircularProgress />
              </Backdrop>

              <CardHeader title="Change Password" />

              <CardContent>
                <Typography sx={{ mb: 3 }}>
                  Enter the PIN sent to your email and choose a new password.
                </Typography>

                {/* PIN Input */}
                <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
                  <InputLabel>PIN Code</InputLabel>
                  <Input
                    name="token"
                    value={token}
                    onChange={this.handleChange}
                    placeholder="Enter PIN from email"
                  />
                  <FormHelperText>The 6-digit reset code sent to your email</FormHelperText>
                </FormControl>

                {/* Password */}
                <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
                  <InputLabel>New Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </FormControl>

                {/* Repeat Password */}
                <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Repeat Password</InputLabel>
                  <Input
                    name="password2"
                    type="password"
                    value={password2}
                    onChange={this.handleChange}
                    placeholder="Repeat Password"
                  />
                </FormControl>

                {/* Submit Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={this.HandleChangePassword}
                >
                  Change Password
                </Button>

                {/* Links */}
                <Typography sx={{ mt: 3 }}>
                  Don't have an account? <Link to="/register">Register here</Link>
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Go back to <Link to="/login">Login</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default PasswordChange;
