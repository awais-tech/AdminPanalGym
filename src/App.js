import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Typography from "@mui/material/Typography";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import VaccinesIcon from "@mui/icons-material";
import WorkIcon from "@mui/icons-material/Work";

import MedicationIcon from "@mui/icons-material/Medication";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

import Home from "./Home";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const App = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const drawer = (
    <div style={{ backgroundColor: "#000 !important" }}>
      <Toolbar />
      <div style={{ textAlign: "center" }}>
        <img src="../Logo.png" alt="refresh page again" width="40%" />
      </div>
      <DrawerHeader>
        <div style={{ color: "white" }}>Hello Admin</div>
      </DrawerHeader>

      <Divider />
      <List>
        {["Home"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon style={{ color: "white" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "white" }} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {["Content Management"].map((text, index) => (
          <ListItem button key={text} onClick={() => window.location.href="https://gymadmin.thecherrybyte.com/admin"}>
            <ListItemIcon style={{ color: "white" }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "white" }} />
          </ListItem>
        ))}
      </List>

      <List>
        {["InComplete Profile"].map((text, index) => (
          <ListItem button key={text} onClick={() => navigate("/bussness")}>
            <ListItemIcon style={{ color: "white" }}>
              <MedicationIcon />
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "white" }} />
          </ListItem>
        ))}
      </List>

      <List>
        {["Trainer User"].map((text, index) => (
          <ListItem button key={text} onClick={() => navigate("/bussnessA")}>
            <ListItemIcon style={{ color: "white" }}>
              <MedicationIcon />
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "white" }} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Sign Up"].map((text, index) => (
          <ListItem button key={text} onClick={() => navigate("/SignUp")}>
            <ListItemIcon style={{ color: "white" }}>
              <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "white" }} />
          </ListItem>
        ))}
      </List>

      <List>
        {["Trainer Booking"].map((text, index) => (
          <ListItem button key={text} onClick={() => navigate("/Booking")}>
            <ListItemIcon style={{ color: "white" }}>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "white" }} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {["Log Out"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => navigate("/")}
            style={{ color: "white" }}
          >
            <ListItemIcon style={{ color: "white" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "#000" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{ backgroundColor: "#000" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#e2c657" }}
          >
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#000",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#000",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 1, backgroundColor: "#fff" }}>
        <Toolbar />
        <div>{children}</div>
      </Box>
    </Box>
  );
};

export default App;
