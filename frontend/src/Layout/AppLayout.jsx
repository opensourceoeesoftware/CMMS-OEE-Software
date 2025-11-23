// src/Layout/AppLayout.jsx
import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Nav from "./Nav/Nav";
import SidebarMiniDrawer from "./Sidebar/MiniSidebar";

const FULL_WIDTH = 240;
const MINI_WIDTH = 70;

export default function AppLayout({ children }) {
  const [open, setOpen] = React.useState(true);

  const drawerWidth = open ? FULL_WIDTH : MINI_WIDTH;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarMiniDrawer open={open} />

      {/* Top Nav, aware of drawer width */}
      <Nav
        drawerOpen={open}
        onToggleSidebar={() => setOpen((prev) => !prev)}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          pt: 0,
          px: 2,
          pb: 2,
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest
          })
        })}
      >
        {/* Spacer to push content below AppBar height */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
