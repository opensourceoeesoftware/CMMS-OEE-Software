import React, { Component } from 'react';
// MUI Components
import {
    Toolbar,Typography,IconButton,Tooltip, Divider,Paper,MenuList,
    MenuItem,ListItemText,ListItemIcon,Menu,
    
  } from '@mui/material';
  import {Link} from 'react-router-dom';
  import EditIcon from '@mui/icons-material/Edit';
  // MUI Icons
  import {
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
    Mail as MailIcon,
    ContentCut,
  ContentCopy,
  ContentPaste,
  Cloud,
  AddOutlined,
  
  
  } from '@mui/icons-material';
  import PreviewIcon from '@mui/icons-material/Preview';
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import MaintenanceEditForm from './MaintenanceEditForm';
  // MUI Utilities
  import { alpha } from '@mui/material/styles';
  import { visuallyHidden } from '@mui/utils';
  import AssetModal from './MaintenanceModal';
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
        this.setState({...this.state, show_add_form:false,edit_asset:false,show_details:false},()=>{

        if(this.props.OnUpdate) {
          this.props.OnUpdate()
        }
          
        })
      }
    render() {
        const { numSelected,maintenance } = this.props;
        const { asset,users,assets } = this.props;
        
        return (
            <>
            {this.state.show_details && <> 
            <AssetModal 
                        open={this.state.show_details} 
                        maintenance = {maintenance}
                        handleClose={this.HandleCloseView}
                        
                        ></AssetModal> </> }
            
            
            
            
            {this.state.show_add_form && <MaintenanceEditForm 
                          show={this.state.show_add_form}
                          maintenancePlan={this.state.edit_asset? maintenance:null}
                          handleClose={this.handleCloseForm}
                          OnUpdate={this.HandleOnUpdate}
                          users={users}
                          assets={this.props.assets}
                          
                          ></MaintenanceEditForm>}
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
          Maintenance planning
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
      <Tooltip title="Add new" >
      
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