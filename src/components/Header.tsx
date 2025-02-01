import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, InputBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Header({setMobileOpen}:any) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const navigate = useNavigate();
    const toggleDrawer = () => {
        setMobileOpen((prev:boolean)=>!prev);
      };

       const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleClose = () => {
          setAnchorEl(null);
        };

        const handleLogout = () => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userData");
            navigate("/login");
          };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#6495ED", zIndex: 1201 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 , outline: "none", "&:focus": { outline: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Portal
          </Typography>
          <Box sx={{  alignItems: "center", backgroundColor: "white", borderRadius: 1, padding: "5px 10px", mr: 2,display: { xs: "none", md: "flex"} }}>
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase placeholder="Search…" sx={{ ml: 1 }} />
          </Box>
          <IconButton color="inherit" onClick={handleMenu} sx={{ outline: "none", "&:focus": { outline: "none" } }}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => navigate("/profile")}>Go to Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
  )
}
