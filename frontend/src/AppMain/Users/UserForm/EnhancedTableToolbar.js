import React, { Component } from 'react';
// MUI Components
import {
    Toolbar,Typography,IconButton,Tooltip, 
    
  } from '@mui/material';
 
  import EditIcon from '@mui/icons-material/Edit';
  // MUI Icons
  import {
    Delete as DeleteIcon,

  AddOutlined,
  
  
  } from '@mui/icons-material';
  import PreviewIcon from '@mui/icons-material/Preview';

  import UserForm from './UserForm';
  // MUI Utilities
  import { alpha } from '@mui/material/styles';


  import UserModal from './UserModal'
class EnhancedTableToolbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            menu_open:false,
            anchor:null,
            show_add_form:false,
            edit_user:false,
            show_details:false
        }
        this.HandleClick = this.HandleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.HandleAddUser = this.HandleAddUser.bind(this)
        this.HandleEditUser = this.HandleEditUser.bind(this)
        this.handleCloseForm = this.handleCloseForm.bind(this)
        this.HandleOnUpdate = this.HandleOnUpdate.bind(this)
        this.HandleView = this.HandleView.bind(this)
        this.HandleCloseView = this.HandleCloseView.bind(this)
    }
    
     HandleClick (event) {
      if(this.state.menu_open)
        this.setState({...this.state, anchor:null, menu_open:false});
      else
        this.setState({...this.state, anchor:event.currentTarget, menu_open:true});
        
      };
       handleClose (event)  {
        this.setState({...this.state, anchor:null ,menu_open:false});
      };
       handleCloseForm (event)  {
        this.setState({...this.state, show_add_form:false ,edit_user:false});
      };
      HandleView (event)  {
        this.setState({...this.state, show_add_form:false ,edit_user:false,show_details:true});
      };
      HandleCloseView (event)  {
        this.setState({...this.state, show_add_form:false ,edit_user:false,show_details:false});
      };
      HandleAddUser (event)  {
        this.setState({...this.state, show_add_form:true ,edit_user:false});
      };
      HandleEditUser (event)  {
        this.setState({...this.state, show_add_form:true ,edit_user:true});
      };
      HandleOnUpdate () {
        this.setState({...this.state, show_add_form:false,edit_user:false},()=>{

          if(this.props.OnUpdate)
            this.props.OnUpdate()
        })
      }
    render() {
        const { numSelected,user,OnUpdate } = this.props;
       
        return (
            <>
            {this.state.show_details && <> 
            <UserModal 
                        open={this.state.show_details} 
                        user={ user}
                        handleClose={this.HandleCloseView}
                        ></UserModal> </> }
            
            
            
            
            {this.state.show_add_form && <UserForm 
                          show={this.state.show_add_form}
                          asset={this.state.edit_user? user:null}
                          handleClose={this.handleCloseForm}
                          OnUpdate={this.HandleOnUpdate}
                          
                          ></UserForm>}
                 <Toolbar sx={{pl: { sm: 2 },pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && {bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                            }),
                        }}>

      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}

      {numSelected > 1 && <>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={this.props.onDelete} />
          </IconButton>
        </Tooltip>
        
        </> }

        { numSelected === 1 &&
         <>
         
         <Tooltip title="View">
           <IconButton>
             <PreviewIcon  onClick={this.HandleView}/>
           </IconButton>
         </Tooltip>
         {/* <Tooltip title="Edit">
           <IconButton>
             <EditIcon  onClick={this.HandleEditUser}/>
           </IconButton>
         </Tooltip> */}
         <Tooltip title="Delete">
           <IconButton>
             <DeleteIcon onClick={this.props.onDelete} />
           </IconButton>
         </Tooltip>
         
         
         </>
        }

      {numSelected ===0 && 
      <>
      <Tooltip title="Add new users" >
      
        <IconButton 
        onClick={this.HandleAddUser}
        >
          <AddOutlined />
        </IconButton>
        
        
       
        
      </Tooltip>

      
      
      </>
      }

      
    </Toolbar>
            </>
        );
    }
}

export default EnhancedTableToolbar;