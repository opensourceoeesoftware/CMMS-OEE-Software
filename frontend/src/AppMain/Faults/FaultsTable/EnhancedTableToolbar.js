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


  import FaultEditForm from '../FaultsForm/FaultEditForm';
  // MUI Utilities
  import { alpha } from '@mui/material/styles';
import FaultsModal from '../FaultsForm/FaultsModal';

class EnhancedTableToolbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            menu_open:false,
            anchor:null,
            show_add_form:false,
            edit_asset:false,
            show_details:false
        }
        this.HandleClick = this.HandleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.HandleAddAsset = this.HandleAddAsset.bind(this)
        this.HandleEditsset = this.HandleEditsset.bind(this)
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
        this.setState({...this.state, show_add_form:false ,edit_asset:false});
      };
      HandleView (event)  {
        this.setState({...this.state, show_add_form:false ,edit_asset:false,show_details:true});
      };
      HandleCloseView (event)  {
        this.setState({...this.state, show_add_form:false ,edit_asset:false,show_details:false});
      };
      HandleAddAsset (event)  {
        this.setState({...this.state, show_add_form:true ,edit_asset:false});
      };
      HandleEditsset (event)  {
        this.setState({...this.state, show_add_form:true ,edit_asset:true});
      };
      HandleOnUpdate () {
        this.setState({...this.state, show_add_form:false,edit_asset:false},()=>{

          if(this.props.OnUpdate)
            this.props.OnUpdate()
        })
      }
    render() {
        const { numSelected,asset,OnUpdate,assets } = this.props;
        
        return (
            <>
            {this.state.show_details && <> 
            <FaultsModal 
                        open={this.state.show_details} 
                        cell={ asset}
                        handleClose={this.HandleCloseView}
                        ></FaultsModal> </> }
            
            
            
            
            {this.state.show_add_form && <FaultEditForm 
                          show={this.state.show_add_form}
                          fault={this.state.edit_asset? asset:null}
                          handleClose={this.handleCloseForm}
                          OnUpdate={this.HandleOnUpdate}
                          assets = {assets}
                          ></FaultEditForm>}
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
          Faults
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
         <Tooltip title="Edit">
           <IconButton>
             <EditIcon  onClick={this.HandleEditsset}/>
           </IconButton>
         </Tooltip>
         <Tooltip title="Delete">
           <IconButton>
             <DeleteIcon onClick={this.props.onDelete} />
           </IconButton>
         </Tooltip>
         
         
         </>
        }

      {numSelected ===0 && 
      <>
      <Tooltip title="Add new assets" >
      
        <IconButton 
        onClick={this.HandleAddAsset}
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