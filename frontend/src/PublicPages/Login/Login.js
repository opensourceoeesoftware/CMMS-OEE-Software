import React, { Component } from 'react';
import AuthContext from '../../AuthProvider/AuthContext';
import { url } from '../../Config';
import { FormControl, FormHelperText, Input, InputLabel,Grid,Typography } from '@mui/material';
import {  Card,  CardMedia } from '@mui/material';
import { Button, Backdrop, Snackbar, Alert, CircularProgress } from '@mui/material';




import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      is_loading: false,
      show_message: false,
      severity: "success",
      message_text: ""
    };
    this.HandleLogin = this.HandleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.HandleCloseMessage = this.HandleCloseMessage.bind(this);

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  HandleCloseMessage() {
    this.setState({ ...this.state, show_message: false })
  }

  async HandleLogin() {
    // toast("Wow so easy!");
    this.setState({ ...this.state, is_loading: true }, async () => {
      const { username, password } = this.state;
      try {
        const response = await axios.post(url + '/api/api-token-auth/', {
          username: username,
          password: password
        });
        const { token } = response.data;

        const response_profile = await axios.get(url + '/api/v1/my-profile/', {
          headers: {
            'Authorization': "Token " + token
          }
        });

        this.context.login(token, response_profile.data?.[0]);

      } catch (error) {
        // toast.error("Username or password are wrong! Please try again");
        this.context.logout()
        this.setState({ ...this.state, is_loading: false, show_message: true, severity: 'error', message_text: "Username or password are wrong! Please try again" });
      }



    })

  }

render() {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1300 }}
        open={this.state.is_loading}
      >
        <CircularProgress />
      </Backdrop>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={(theme) => ({
    minHeight: "100vh",
    background: theme.palette.loginBg.main
  })}
      >
        <Card
          elevation={6}
          sx={{
            width: { xs: "90%", sm: "450px" },
            borderRadius: 3,
            p: 3
          }}
        >
          <CardMedia
            component="img"
            image="/g888.png"
            sx={{
              width: 90,
              height: 90,
              objectFit: "contain",
              mx: "auto",
              mt: 1
            }}
          />

          <Typography variant="h5" align="center" sx={{ mt: 2, mb: 3 }}>
            Login
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Username</InputLabel>
                <Input
                  name="username"
                  onChange={this.handleChange}
                  type="text"
                />
                <FormHelperText>Enter your username</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Password</InputLabel>
                <Input
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                />
                <FormHelperText>Enter your password</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={this.HandleLogin}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth href="/register">
                Register
              </Button>
              <Button fullWidth href="/password-reset-email">
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Snackbar
        open={this.state.show_message}
        autoHideDuration={4000}
        onClose={this.HandleCloseMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={this.state.severity} variant="filled" sx={{ width: "100%" }}>
          {this.state.message_text}
        </Alert>
      </Snackbar>
    </>
  );
}

}

Login.contextType = AuthContext;
export default Login;
