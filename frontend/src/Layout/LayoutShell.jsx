import React from "react";
import Nav from "./Nav/Nav";
import SidebarDrawer from "./Sidebar/Sidebar";
import Box from "@mui/material/Box";

export default function LayoutShell({ children }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      {/* Top Navbar */}
      <Nav onToggleSidebar={() => setDrawerOpen(true)} />

      {/* Left Drawer */}
      <SidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Content Area */}
      <Box sx={{ pt: 8, pl: 0, pr: 0 }}>
        {children}
      </Box>
    </>
  );
}
