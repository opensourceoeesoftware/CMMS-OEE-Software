import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  ListSubheader
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../../AuthProvider/AuthContext";

/* Icons */
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

/* Drawer widths */
const FULL_WIDTH = 240;
const MINI_WIDTH = 70;

export default function SidebarMiniDrawer({ open }) {
  const { state } = React.useContext(AuthContext);
  const userType = state.user_profile?.type;

  /* Wrapper for tooltip on collapsed state */
  const Item = ({ icon, text, to }) => (
    <Tooltip title={!open ? text : ""} placement="right">
      <ListItemButton component={RouterLink} to={to}>
        <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
        {open && <ListItemText primary={text} />}
      </ListItemButton>
    </Tooltip>
  );

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: open ? FULL_WIDTH : MINI_WIDTH,
          transition: "width 0.2s ease",
          whiteSpace: "nowrap",
          overflowX: "hidden",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <Box sx={{ mt: 8 }}>

        {/* ADMIN MENU */}
        {userType === "Admin" && (
          <>
            {open && (
              <ListSubheader sx={{ pl: 2, fontWeight: "bold" }}>
                OEE Dashboards
              </ListSubheader>
            )}
            <List>
              <Item icon={<SensorsIcon />} text="Live" to="/dashboards/live" />
              <Item icon={<AutoModeIcon />} text="OEE" to="/dashboards/oee" />
              <Item icon={<GppBadIcon />} text="Downtimes" to="/dashboards/downtimes" />
              <Item icon={<ElectricBoltIcon />} text="Energy & Costs" to="/dashboards/energy" />
            </List>

            <Divider sx={{ my: 2 }} />

            {open && (
              <ListSubheader sx={{ pl: 2, fontWeight: "bold" }}>
                Administration
              </ListSubheader>
            )}
            <List>
              <Item icon={<PrecisionManufacturingIcon />} text="Lines" to="/admin/assets/table" />
              <Item icon={<DashboardCustomizeIcon />} text="Cells" to="/admin/cells/table" />
              <Item icon={<FmdBadIcon />} text="Faults" to="/admin/faults/table" />
              <Item icon={<CategoryIcon />} text="Products" to="/admin/products/table" />
              <Item icon={<PersonIcon />} text="Users" to="/admin/users/add" />
            </List>

            <Divider sx={{ my: 2 }} />

            {open && (
              <ListSubheader sx={{ pl: 2, fontWeight: "bold" }}>
                CMMS
              </ListSubheader>
            )}
            <List>
              <Item icon={<AutoGraphIcon />} text="Assets" to="/cmms/dashboards/assets" />
              <Item icon={<BarChartIcon />} text="Maintenances" to="/cmms/dashboards/maintenances" />
              <Item icon={<DateRangeIcon />} text="Agenda" to="/cmms/dashboards/agenda" />
              <Item icon={<ConstructionIcon />} text="Plan" to="/cmms/maintenance/add" />
            </List>
          </>
        )}

        {/* OPERATOR MENU */}
        <Divider sx={{ my: 2 }} />
        {open && (
          <ListSubheader sx={{ pl: 2, fontWeight: "bold" }}>
            Operator
          </ListSubheader>
        )}

        <List>
          <Item icon={<EventNoteIcon />} text="My Schedule" to="/operator/agenda" />
          <Item icon={<TuneIcon />} text="Control" to="/operator/control" />
        </List>
      </Box>
    </Drawer>
  );
}
