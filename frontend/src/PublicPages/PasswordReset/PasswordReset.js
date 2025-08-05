import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { url } from '../../Config';
import {
  Link,Navigate
} from "react-router-dom";
import axios from 'axios';
import {CardMedia, Button, } from '@mui/material';
class PasswordReset extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email:"",
        username: '',
        password: '',
        error: '',
        is_loading : false,
        is_email_sent:false
      };
      this.HandleRequestEmail = this.HandleRequestEmail.bind(this);
      this.handleChange = this.handleChange.bind(this);
      
    }
  
    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    async HandleRequestEmail() {
      // toast("Wow so easy!");
      this.setState({...this.state, is_loading:true},async()=>{
        const { email } = this.state;
        try {
            
          const response = await axios.post(url +'/api/password_reset/', {
            email: email,
          });
         if(response.data.status === 'OK'){
            this.setState({...this.state, is_email_sent:true})
         }
          
          
        } catch (error) {
          
          toast.error("Something went wrong! Please try again");
          this.setState({ ...this.state,is_loading:false });
        }
  
      })
     
    }
  
    render() {
      const { is_email_sent, email } = this.state;
  
      return (<>
      {is_email_sent && (
          <Navigate to="/password-change" replace={true} />
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
            <h1 className='card-title'>

          Password reset
            </h1>
          </div>
          <div className="card-body login-card-body">
            <p className="login-box-msg">Did you forget your Password? Enter your Email bellow and you will receive 
            an E-mail with a pin code, and all the details to reset your password
            </p>
           
            <form>
            <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="E-mail"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
            
            </form>
            <div className='row mt-4'>
              <div className='col-12 mb-4'>
                <Button variant='contained' color='info' onClick={this.HandleRequestEmail}> Send E-mail</Button>
                {/* <button className='btn bg-info float-right' onClick={this.HandleRequestEmail}>Send E-mail</button> */}
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

export default PasswordReset;