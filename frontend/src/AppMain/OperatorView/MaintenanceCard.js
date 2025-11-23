import React from "react";
import { 
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

export default function MaintenanceCard({ maintenance }) {
  const status_color_map = {
      Completed: "success",
      Pending: "warning",
      Cancelled: "error",
      "In Progress": "info",
  };

  const type_color_map = {
      Planned: "success",
      Other: "info",
      UnPlanned: "error",
  };

  const priority_color_map = {
      Low: "success",
      Medium: "info",
      High: "error",
  };

  return (
    <Paper elevation={0} sx={{ width: "100%", p: 3, mb: 3 }}>
      
      {/* Title */}
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        {maintenance?.name}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Basic Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Reference:</strong> {maintenance?.ref}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Type:</strong> {maintenance?.type}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Planned start:</strong>{" "}
          {new Date(maintenance?.planned_starting_date).toLocaleString()}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Planned finish:</strong>{" "}
          {new Date(maintenance?.planned_finished).toLocaleString()}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Assigned by:</strong> {maintenance?.created_by?.username}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Assigned to:</strong> {maintenance?.assigned_to?.username}
        </Typography>

        {/* File */}
        <Typography variant="body1">
          <strong>Instructions:</strong>{" "}
          {maintenance?.instructions && (
            <a href={maintenance.instructions} target="_blank" rel="noreferrer">
              Download file
            </a>
          )}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Chips */}
      <Stack direction="row" spacing={1}>
        <Chip 
          label={maintenance?.status} 
          color={status_color_map[maintenance?.status]} 
        />
        <Chip 
          label={maintenance?.type} 
          color={type_color_map[maintenance?.type]} 
        />
        <Chip 
          label={maintenance?.priority} 
          color={priority_color_map[maintenance?.priority]} 
        />
      </Stack>
    </Paper>
  );
}
