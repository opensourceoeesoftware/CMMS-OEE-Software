import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
export default function AssetCard({asset}) {
    let status_color_map={
        'Active':'success',
        'Under Maintenance':'warning',
        'Inactive':'error',
        'Retired':'info',
    }

    let warranty_color = 'success.main'
    if(new Date().getTime()> new Date(asset?.warranty_expiration_date).getTime())
        warranty_color = 'error.main'

  return (
    <Card sx={{ maxWidth: '75%',width:"75%" }} elevation={0}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={asset?.photo}
        alt={asset?.name}
        sx={{objectFit:'contain'}}
      />
      <CardContent>
     

        <Typography gutterBottom variant="h5" component="div">
        {asset?.name}
        </Typography>
      
        <Divider></Divider>
        <Box sx={{p:2}}>

        <Typography  variant="body2" color="text.secondary">
         <strong>Reference: </strong> {asset?.ref}
        </Typography>
        <Typography  variant="body2" color="text.secondary">
         <strong>Type: </strong> {asset?.asset_type}
        </Typography>
        <Typography  variant="body2" color="text.secondary">
         <strong>Serial: </strong> {asset?.serial_number}
        </Typography>
        <Typography  variant="body2" color="text.secondary">
         <strong>Location: </strong> {asset?.location}
        </Typography>
        <Typography  variant="body2" color={warranty_color}>
         <strong>Warranty: </strong> {new Date(asset?.warranty_expiration_date).toDateString()}
        </Typography>
        </Box>
        <Divider></Divider>
        
      </CardContent>
      
    </CardActionArea>
    <CardActions>
    <Box sx={{p:2,pt:0}}>

    <Stack direction="row" spacing={1}>
      <Chip label={asset?.status} color={status_color_map[asset?.status]}/>
      
     
    </Stack>
    </Box>

      
    </CardActions>
  </Card>
  );
}
