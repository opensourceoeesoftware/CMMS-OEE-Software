import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { url } from '../../Config';
import {
  Link,Navigate
} from "react-router-dom";
import axios from 'axios';
import {CardMedia, Button, } from '@mui/material';
class PasswordChange extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        password: '',
        password2:'',
        password_changed:false,
        is_loading : false
      };
      this.HandleChangePassword = this.HandleChangePassword.bind(this);
      this.handleChange = this.handleChange.bind(this);
      
    }
  
    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    async HandleChangePassword() {
      // toast("Wow so easy!");
      const { token, password,password2 } = this.state;

      if(password !== password2) {toast.error("Password Doesn't match!"); return}
      this.setState({...this.state, is_loading:true},async()=>{
        
        try {
          await axios.post(url +'/api/password_reset/confirm/', {
            token: token,
            password: password
          });
          this.setState({...this.state, password_changed:true})
        } catch (error) {
          toast.error("Username or password are wrong! Please try again");
          this.setState({ ...this.state,is_loading:false });
        }
  
      })
     
    }
  
    render() {
      const { token, password, password2,password_changed } = this.state;
  
      return (<>
      {password_changed && (
          <Navigate to="/login" replace={true} />
        )}
      
     
        <div className="card w-50 h-100 ml-auto mr-auto mt-5">
          <ToastContainer></ToastContainer>
          <CardMedia
                sx={{ height: 50, objectFit: 'contain', pt: 2 }}
                image="/g888.png"
                title="Logo"
                component="img"
            // sx={}
            />
            <div className='card-header'>
                <h1 className='card-title'>Password Change</h1>
            </div>
         
          <div className="card-body login-card-body">
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="token"
                  value={token}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter your pin code from E-mail"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Repeat Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
            
            </form>
            <div className='row mt-4'>
              <div className='col-12 mb-3'>
                <Button variant='contained' onClick={this.HandleChangePassword}>Change password</Button>
                {/* <button className='btn bg-success float-right' onClick={this.HandleChangePassword}>Change password</button> */}
              </div>
            </div>
            <div className='row'>
              <div className='col-8'>
                <p>
                  Or click here to <Link to={'/register'}>Register</Link>
                </p>
              </div>
         
            </div>
          </div>
          {this.state.is_loading && <div className='overlay'>
          <i class="fas fa-2x fa-sync fa-spin"></i>
          </div>}
          
        </div>
        </>
      );
    }
  }

export default PasswordChange;