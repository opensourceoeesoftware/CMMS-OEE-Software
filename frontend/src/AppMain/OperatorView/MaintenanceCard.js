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
export default function MaintenanceCard({maintenance}) {
    let status_color_map={
        'Completed':'success',
        'Pending':'warning',
        'Cancelled':'error',
        'In Progress':'info',
    }
    let type_color_map={
        'Planned':'success',
        'Other':'info',
        'UnPlanned':'error',
        'In Progress':'info',
    }
    let priority_color_map={
        'Low':'success',
        'Medium':'info',
        'High':'error',
        'In Progress':'info',
    }

    let warranty_color = 'success.main'
    if(new Date().getTime()> new Date(maintenance?.asset.warranty_expiration_date).getTime())
        warranty_color = 'error.main'

  return (
    <Card sx={{ maxWidth: '75%',width:'75%' }} elevation={0}>
    <CardActionArea>
     
      <CardContent>
     

        <Typography gutterBottom variant="h5" component="div">
        {maintenance?.name}
        </Typography>
      
        <Divider></Divider>
        <Box sx={{p:2}}>

        <Typography  variant="body2" color="text.secondary">
         <strong>Reference: </strong> {maintenance?.ref}
        </Typography>
        <Typography gutterBottom  variant="body2" color="text.secondary">
         <strong>Type: </strong> {maintenance?.type}
        </Typography>
        <Typography  variant="body2" color="text.secondary">
         <strong>Planned start: </strong> {new Date(maintenance?.planned_starting_date).toString()}
        </Typography>
        <Typography gutterBottom  variant="body2" color="text.secondary">
         <strong>Planned finish: </strong> {new Date(maintenance?.planned_finished).toString()}
        </Typography>
        <Typography  variant="body2" color="text.secondary">
         <strong>Assigned by: </strong> {maintenance?.created_by.username}
        </Typography>
        <Typography  variant="body2" color="text.secondary">
         <strong>Assigned to: </strong> {maintenance?.assigned_to?.username}
        </Typography>
        <Typography variant="body1" gutterBottom>
                            <strong>Instructions:</strong>{" "}
                            {maintenance?.instructions && (
                                <>
                                
                                <a href={maintenance?.instructions} target='blank' download>
                                    Download File
                                </a>
                                </>
                            )}
                        </Typography>
       
        </Box>
        <Divider></Divider>
        
      </CardContent>
      
    </CardActionArea>
    <CardActions>
    <Box sx={{p:2,pt:0}}>

    <Stack direction="row" spacing={1}>
      <Chip label={maintenance?.status} color={status_color_map[maintenance?.status]}/>
      <Chip label={maintenance?.type} color={type_color_map[maintenance?.type]}/>
      <Chip label={maintenance?.priority} color={priority_color_map[maintenance?.priority]}/>
      
     
    </Stack>
    </Box>

      
    </CardActions>
  </Card>
  );
}
