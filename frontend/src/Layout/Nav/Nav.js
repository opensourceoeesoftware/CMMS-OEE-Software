// src/Layout/Nav/Nav.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../../AuthProvider/AuthContext";

const FULL_WIDTH = 240;
const MINI_WIDTH = 70;

export default function Nav({ onToggleSidebar, drawerOpen }) {
  const { logout } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const appBarLeft = drawerOpen ? FULL_WIDTH : MINI_WIDTH;

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer - 1,
        ml: `${appBarLeft}px`,
        width: `calc(100% - ${appBarLeft}px)`,
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shortest
        })
      })}
    >
      <Toolbar>

        {/* Burger button */}
        <IconButton
          edge="start"
          onClick={onToggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Left links */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexGrow: 1 }}>
          <Typography
            component={RouterLink}
            to="/dashboards/live"
            sx={{ textDecoration: "none", color: "primary.main", fontWeight: 600 }}
          >
            Dashboards
          </Typography>

          <Typography
            component={RouterLink}
            to="/cmms/dashboards/assets"
            sx={{ textDecoration: "none", color: "primary.main", fontWeight: 600 }}
          >
            CMMS
          </Typography>

          <Typography
            component={RouterLink}
            to="/admin/assets/table"
            sx={{ textDecoration: "none", color: "primary.main", fontWeight: 600 }}
          >
            Admin
          </Typography>
        </Box>

        {/* Right profile menu */}
        <IconButton onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          keepMounted
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              logout();
            }}
          >
            Logout
          </MenuItem>
          <MenuItem disabled>Delete profile (coming soon)</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
