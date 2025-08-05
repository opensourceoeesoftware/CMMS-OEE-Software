import React, { Component } from 'react';
import AuthContext from '../../AuthProvider/AuthContext';
import { url } from '../../Config';
import { FormControl, FormHelperText, Input, InputLabel,Grid } from '@mui/material';
import { CardHeader, CardContent, CardActions, Card,  CardMedia } from '@mui/material';
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
        <Grid container sx={{p:2, display: 'flex', flexWrap: 'wrap' ,height:'100vh'}}>
          <Grid item xs={12} lg={6}  sx={{  margin: 'auto'}}>

          <Card sx={{ minWidth: 275, width: '100%', margin: 'auto'}} >
            <CardMedia
              sx={{ height: 50, objectFit: 'contain', pt: 2 }}
              image="/g888.png"
              title="Logo"
              component="img"
            // sx={}
            />
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={this.state.is_loading}

            >

              <CircularProgress />
            </Backdrop>
            <CardHeader title="Login" sx={{ ml: 1 }}></CardHeader>
            <CardContent>

              <FormControl variant="standard" fullWidth sx={{ m: 1 }} >
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  placeholder='Username'
                  aria-describedby="username-text"
                  name='username'
                  type='text'
                  onChange={this.handleChange}
                />
                <FormHelperText id="username-text">
                  Enter your username
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="username">Password</InputLabel>
                <Input
                  id="password"
                  placeholder='Password'
                  aria-describedby="password-text"
                  name='password'
                  type='password'
                  onChange={this.handleChange}
                />
                <FormHelperText id="password-text">
                  Enter your password
                </FormHelperText>
              </FormControl>



            </CardContent>
            <CardActions>
              <Button variant="contained" sx={{ m: 1 }} onClick={this.HandleLogin}>Login</Button>


            </CardActions>
            <CardActions>

              <Button href='/register' sx={{ mt: 1, ml: 1 }}> Register</Button>
            </CardActions>
            <CardActions>

              <Button href='/password-reset-email' sx={{ ml: 1 }}> Reset Password</Button>
            </CardActions>

          </Card>
          </Grid>
        </Grid>
        <Snackbar open={this.state.show_message} autoHideDuration={6000} onClose={this.HandleCloseMessage} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert

            severity={this.state.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {this.state.message_text}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

Login.contextType = AuthContext;
export default Login;
