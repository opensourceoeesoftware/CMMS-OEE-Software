import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { url } from '../../Config';
import {
  Navigate
} from "react-router-dom";
import axios from 'axios';

import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { CardHeader, CardContent, CardActions, Card,CardMedia } from '@mui/material';
import { Button,Backdrop,CircularProgress } from '@mui/material';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      organization: '',
      is_created:false,
      is_loading : false
    };
    this.HandleRegister = this.HandleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
    
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  checkForm() {
    const { username, password, password2,email,organization } = this.state;
    // toast.error("Please check all the info below and try again");
    if(!username || !password || !password===password2 || !email || !organization) {
      toast.error("Please check all the info below and try again");
      return true
    }
    return false
  }
  async HandleRegister() {
    
    if (this.checkForm()) return
   
    this.setState({...this.state, is_loading:true},async()=>{
      const { username, password, password2,email,organization } = this.state;
      try {
        const response = await axios.post(url+'/api/auth/profile/', {
          username: username,
          password: password,
          password2: password2,
          email:email,
          organization:organization

        });

        if(response.status ===201) {
          toast.success("Acount created, You can login");
          this.setState({...this.state, is_created:true})
        }
       
      } catch (error) {
        toast.error("Something wrong! Please try again "+ error.response.data['detail']);
        this.setState({ ...this.state,is_loading:false });
      }

    })
   
  }

  render() {
    const { is_created } = this.state;

    return (
      <>
      {is_created && (
          <Navigate to="/login" replace={true} />
        )}

     
        <ToastContainer></ToastContainer>
        <Card sx={{ minWidth: 275, width: '50%', margin: 'auto', marginTop: "0.5rem" }} >
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

<CardHeader title="Register to OEE software" sx={{ ml: 1 }}></CardHeader>
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
    <FormControl variant="standard" fullWidth sx={{ m: 1 }} >
        <InputLabel htmlFor="organization">Organization name</InputLabel>
        <Input
            id="organization"
            placeholder='Organization name'
            aria-describedby="organization-text"
            name='organization'
            type='text'
            onChange={this.handleChange}
        />
        <FormHelperText id="organization-text">
            Enter your organization name
        </FormHelperText>

    </FormControl>

    <FormControl variant="standard" fullWidth sx={{ m: 1 }} >
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
            id="email"
            placeholder='Email'
            aria-describedby="email-text"
            name='email'
            type='email'
            onChange={this.handleChange}
        />
        <FormHelperText id="email-text">
            Enter your business E-mail
        </FormHelperText>

    </FormControl>

    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="password">Password</InputLabel>
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
    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="password2">Repeat Password</InputLabel>
        <Input
            id="password2"
            placeholder='Password2'
            aria-describedby="password2-text"
            name='password2'
            type='password'
            onChange={this.handleChange}
        />
        <FormHelperText id="password2-text">
            Repeat your password
        </FormHelperText>
    </FormControl>



</CardContent>

<CardActions>
    <Button variant="contained" sx={{ m: 1 }} onClick={this.HandleRegister}>Register</Button>


</CardActions>
<CardActions>

</CardActions>

<CardActions>
    <Button href='/terms' target='_blank' sx={{  ml: 1 }}> By clicking Register, you accept our usage tems</Button>
    <Button href='/login' sx={{ ml: 1 }}> Login</Button>

</CardActions>

</Card>
      </>
    );
  }
}

export default Register;