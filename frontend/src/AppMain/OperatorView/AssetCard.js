import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

export default function AssetCard({ asset }) {
  const status_color_map = {
    Active: "success",
    "Under Maintenance": "warning",
    Inactive: "error",
    Retired: "info",
  };

  // Warranty color logic
  let warranty_color = "success.main";
  if (new Date().getTime() > new Date(asset?.warranty_expiration_date).getTime()) {
    warranty_color = "error.main";
  }

  return (
    <Paper elevation={0} sx={{ width: "100%", p: 3, mb: 3 }}>

      {/* Asset Photo */}
      {asset?.photo && (
        <Box
          sx={{
            width: "100%",
            height: 200,
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
          }}
        >
          <img
            src={asset.photo}
            alt={asset.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "#f7f7f7",
            }}
          />
        </Box>
      )}

      {/* Title */}
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        {asset?.name}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Reference:</strong> {asset?.ref}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Type:</strong> {asset?.asset_type}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Serial:</strong> {asset?.serial_number}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Location:</strong> {asset?.location}
        </Typography>

        <Typography variant="body1" sx={{ color: warranty_color }}>
          <strong>Warranty:</strong>{" "}
          {new Date(asset?.warranty_expiration_date).toDateString()}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Status Chip */}
      <Stack direction="row" spacing={1}>
        <Chip label={asset?.status} color={status_color_map[asset?.status]} />
      </Stack>
    </Paper>
  );
}
