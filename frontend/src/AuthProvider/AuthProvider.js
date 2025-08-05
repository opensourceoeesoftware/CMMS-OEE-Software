import React, { Component } from 'react';
import PublicPages from '../PublicPages/PublicPages';
import AuthContext from './AuthContext'
import AppMain from '../AppMain/AppMain';

class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.state = {
          closedSmallerSidebar: false,
          is_logged_in:false,
          user_profile:{},
          token:"",
          
        };
      }
    login(token,user_profile) {
      this.setState({...this.state,is_logged_in:true,token:token,user_profile:user_profile})
      
    }
    logout() {
      this.setState({...this.state,is_logged_in:false, token:"",user_profile:{}})
    }
    render() {
        return (
            <>
           
                <AuthContext.Provider value={this}>
                {!this.state.is_logged_in && 

                    <PublicPages ></PublicPages>
                    }
               

             {this.state.is_logged_in &&

              <>
             
              <AppMain />
              
              </>
           
            }
            </AuthContext.Provider>
             

            </>
        );
    }
}

export default AuthProvider;