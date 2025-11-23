import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { url } from "../../Config";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
  Backdrop,
  CircularProgress,
  Typography
} from "@mui/material";

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      is_loading: false,
      is_email_sent: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.HandleRequestEmail = this.HandleRequestEmail.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async HandleRequestEmail() {
    this.setState({ is_loading: true }, async () => {
      try {
        const response = await axios.post(url + "/api/password_reset/", {
          email: this.state.email
        });

        if (response.data?.status === "OK") {
          this.setState({ is_email_sent: true });
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        this.setState({ is_loading: false });
      }
    });
  }

  render() {
    const { is_email_sent, email } = this.state;

    return (
      <>
        {is_email_sent && <Navigate to="/password-change" replace />}

        <ToastContainer />

        {/* Background */}
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

              <CardHeader title="Password Reset" />

              <CardContent>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Forgot your password?  
                  Enter your email below and we will send you a code to reset it.
                </Typography>

                <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Email</InputLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <FormHelperText>Enter the email registered to your account</FormHelperText>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={this.HandleRequestEmail}
                >
                  Send Reset Email
                </Button>

                <Typography sx={{ mt: 3 }}>
                  No account? <Link to="/register">Register here</Link>
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Remember your password? <Link to="/login">Login</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default PasswordReset;
