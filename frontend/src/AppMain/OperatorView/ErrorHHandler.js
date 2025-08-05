import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText,Input } from '@mui/material';
const next_state_map = {
  'out of order':'resume out of order',
  'failure':'resume failure',
  'fault':'resume fault',
  'report':'report',
  'run':'report',
  'resume fault':'report',
}
export default function ErrorHHandler(props) {
  const [cell, setCell] = React.useState('');
  const [fault, setFault] = React.useState('');
  const [product, setProduct] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const [scrap, setScrap] = React.useState(0);


  const handleChangeCell = (e) => {
    setCell(e.target.value);
  };
  const handleChangeFault = (e) => {
    setFault(e.target.value);
  };
  const handleChangeProduct = (e) => {
    setProduct(e.target.value);
  };
  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const handleChangeScrap = (e) => {
    setScrap(e.target.value);
  };
 
  const handleReport = () => {

  

  var data = {
    machine:props.last_event?.machine?.uuid,
    product:product,
    cell:cell,
    fault:fault,
    quantity:quantity,
    scrap:scrap,
    state:next_state_map[props.last_event?.state]
  }
  if(props.onReport) props.onReport(data)
  };

  return (
    <React.Fragment>
    
      <Dialog
        open={props.show}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Report"}
        </DialogTitle>
        <DialogContent>
          {['fault','failure','out of order'].includes(props.last_event?.state) && <>
          
          
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <InputLabel id="cell-label">Cell</InputLabel>
            <Select
              labelId="cell-label"
              id="cell"
              name='cell'
              value={cell}
              onChange={handleChangeCell}
              autoComplete='off'
            >
              {props.cells?.map(cell => (
                <MenuItem key={cell.uuid} value={cell.uuid}>{cell.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText id="asset-text">
              Select the cell where the problem happened for this machine
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <InputLabel id="fault-label">Fault</InputLabel>
            <Select
              labelId="fault-label"
              id="fault"
              name='fault'
              value={fault}
              onChange={handleChangeFault}
              autoComplete='off'
            >
              {props.faults?.map(fault => (
                <MenuItem key={fault.uuid} value={fault.uuid}>{fault.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText id="fault-text">
              Select the fault that happened to this machine
            </FormHelperText>
          </FormControl>
          
          </>}
          

          {['run','report','resume fault'].includes(props.last_event?.state) && <>
          
          
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <InputLabel id="product-label">Product</InputLabel>
            <Select
              labelId="product-label"
              id="product"
              name='product'
              value={product}
              onChange={handleChangeProduct}
              autoComplete='off'
            >
              {props.products?.map(product => (
                <MenuItem key={product.uuid} value={product.uuid}>{product.product_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText id="product-text">
              Select the product you want to report
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <Input
                                    id="quantity"
                                    placeholder='Quantity produced'
                                    name='quantity'
                                    type='number'
                                    autoComplete='off'
                                    value={quantity}
                                    onChange={handleChangeQuantity}
                                />
                                
                                <FormHelperText id="quantity-text">
                                    <strong>Quantity produced</strong>
                                </FormHelperText>
                                <FormHelperText id="quantity-text">
                                    How many piece you produced
                                </FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <Input
                                    id="scrap"
                                    placeholder='Scrap produced'
                                    name='scrap'
                                    type='number'
                                    autoComplete='off'
                                    value={scrap}
                                    onChange={handleChangeScrap}
                                />
                                
                                <FormHelperText id="scrap-text">
                                    <strong>Scrap produced</strong>
                                </FormHelperText>
                                <FormHelperText id="scrap-text">
                                    How many scrap piece you produced
                                </FormHelperText>
           </FormControl>
          
          </>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleReport} variant='contained'>Report</Button>
         
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
