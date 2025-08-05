import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

class FaultsDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:false
        }
    }
    render() {
        return (
            <React.Fragment>
      
      <Dialog
        open={true}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the selected faults?"}
        </DialogTitle>
        <DialogContent>
            

            
          <DialogContentText id="alert-dialog-description">
          <strong> You have selected {this.props.AssetsToDelete} Faults to delete</strong>
          </DialogContentText>
          <br></br>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible, other related data will be also deleted. Please make sure that this data is not relevant to you any more
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={this.props.HandleConfirm}>Yes, I am sure!</Button>
          <Button onClick={this.props.handleClose} >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        );
    }
}

export default FaultsDelete;