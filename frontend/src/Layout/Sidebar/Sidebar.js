import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader
} from "@mui/material";

import { Link as RouterLink, useLocation } from "react-router-dom"; // ✅ import useLocation

// Icons...
import SensorsIcon from "@mui/icons-material/Sensors";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import GppBadIcon from "@mui/icons-material/GppBad";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BarChartIcon from "@mui/icons-material/BarChart";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ConstructionIcon from "@mui/icons-material/Construction";
import TuneIcon from "@mui/icons-material/Tune";
import EventNoteIcon from "@mui/icons-material/EventNote";

import AuthContext from "../../AuthProvider/AuthContext";

export default function SidebarDrawer({ open, onClose }) {
  const { state } = React.useContext(AuthContext);
  const userType = state.user_profile?.type;

  const location = useLocation(); // ✅ current path

  const isActive = (path) => window.location.pathname.startsWith(path); // helper

  return (
    <Drawer open={open} onClose={onClose} PaperProps={{ sx: { width: 260 } }}>
      <Box role="presentation" sx={{ p: 2 }}>

        {userType === "Admin" && (
          <>
            <ListSubheader><b>OEE Dashboards</b></ListSubheader>

            <List>
              <ListItemButton
                component={RouterLink}
                to="/dashboards/live"
                selected={location.pathname === "/dashboards/live"}
             
              >
                <ListItemIcon><SensorsIcon /></ListItemIcon>
                <ListItemText primary="Live" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/dashboards/oee"
                selected={isActive("/dashboards/oee")}
              >
                <ListItemIcon><AutoModeIcon /></ListItemIcon>
                <ListItemText primary="OEE" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/dashboards/downtimes"
                selected={isActive("/dashboards/downtimes")}
              >
                <ListItemIcon><GppBadIcon /></ListItemIcon>
                <ListItemText primary="Downtimes" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/dashboards/energy"
                selected={isActive("/dashboards/energy")}
              >
                <ListItemIcon><ElectricBoltIcon /></ListItemIcon>
                <ListItemText primary="Energy & Costs" />
              </ListItemButton>
            </List>

            <Divider sx={{ my: 2 }} />

            <ListSubheader><b>Administration</b></ListSubheader>
            <List>
              <ListItemButton
                component={RouterLink}
                to="/admin/assets/table"
                selected={isActive("/admin/assets")}
              >
                <ListItemIcon><PrecisionManufacturingIcon /></ListItemIcon>
                <ListItemText primary="Lines" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/admin/cells/table"
                selected={isActive("/admin/cells")}
              >
                <ListItemIcon><DashboardCustomizeIcon /></ListItemIcon>
                <ListItemText primary="Cells" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/admin/faults/table"
                selected={isActive("/admin/faults")}
              >
                <ListItemIcon><FmdBadIcon /></ListItemIcon>
                <ListItemText primary="Faults" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/admin/products/table"
                selected={isActive("/admin/products")}
              >
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/admin/users/add"
                selected={isActive("/admin/users")}
              >
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </List>

            <Divider sx={{ my: 2 }} />

            <ListSubheader><b>CMMS</b></ListSubheader>
            <List>
              <ListItemButton
                component={RouterLink}
                to="/cmms/dashboards/assets"
                selected={isActive("/cmms/dashboards/assets")}
              >
                <ListItemIcon><AutoGraphIcon /></ListItemIcon>
                <ListItemText primary="Assets" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/cmms/dashboards/maintenances"
                selected={isActive("/cmms/dashboards/maintenances")}
              >
                <ListItemIcon><BarChartIcon /></ListItemIcon>
                <ListItemText primary="Maintenances" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/cmms/dashboards/agenda"
                selected={isActive("/cmms/dashboards/agenda")}
              >
                <ListItemIcon><DateRangeIcon /></ListItemIcon>
                <ListItemText primary="Agenda" />
              </ListItemButton>

              <ListItemButton
                component={RouterLink}
                to="/cmms/maintenance/add"
                selected={isActive("/cmms/maintenance")}
              >
                <ListItemIcon><ConstructionIcon /></ListItemIcon>
                <ListItemText primary="Plan Maintenance" />
              </ListItemButton>
            </List>

            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* OPERATOR */}
        <ListSubheader><b>Operator</b></ListSubheader>
        <List>
          <ListItemButton
            component={RouterLink}
            to="/operator/agenda"
            selected={isActive("/operator/agenda")}
          >
            <ListItemIcon><EventNoteIcon /></ListItemIcon>
            <ListItemText primary="My Schedule" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/operator/control"
            selected={isActive("/operator/control")}
          >
            <ListItemIcon><TuneIcon /></ListItemIcon>
            <ListItemText primary="Control" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
