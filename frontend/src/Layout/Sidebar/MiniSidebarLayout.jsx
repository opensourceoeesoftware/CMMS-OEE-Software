import React from "react";
import Box from "@mui/material/Box";
import Nav from "../Nav/Nav";
import MiniSidebar from "./MiniSidebar";

export default function MiniSidebarLayout({ children }) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Nav onToggleSidebar={() => setOpen(!open)} />

      <MiniSidebar open={open} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          ml: open ? "240px" : "70px",
          transition: "margin 0.2s ease"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
