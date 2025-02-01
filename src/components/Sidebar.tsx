import {  Drawer, List, ListItem, ListItemText} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuizIcon from "@mui/icons-material/Assignment";
import AnnouncementIcon from "@mui/icons-material/Campaign";
import SchoolIcon from "@mui/icons-material/School";
export default function Sidebar({setMobileOpen,mobileOpen}:any) {
    const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { text: "Dashboard", route: "/dashboard", icon: <DashboardIcon /> },
    { text: "Quizzes", route:"/quiz", icon: <QuizIcon /> },
    { text: "Announcements", route: "/announcement", icon: <AnnouncementIcon /> },
    { text: "Courses", route:"/course", icon: <SchoolIcon /> },
  ];
  
  const toggleDrawer = () => {
    setMobileOpen((prev:boolean)=>!prev);
  };
  return (
  
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={toggleDrawer}
      sx={{
          "& .MuiDrawer-paper": { width: 250, backgroundColor: "#6495ED" ,marginTop: "63px" },
        }}
      >
      <List>
        {menuItems.map((item) => (
          <ListItem
            component={"div"}
            key={item.text}
            onClick={() => navigate(item.route)}
            sx={{
              color: location.pathname === item.route ? "#6495ED" : "white",
              backgroundColor: location.pathname === item.route ? "white" : "transparent",
              mb: 1,
              "&:hover": {
                backgroundColor: "white",
                color: "#6495ED",
               
              },
            }}
          >
            {item.icon}
            <ListItemText primary={item.text} sx={{ ml: 2 }} />
          </ListItem>
        ))}
      </List>
    </Drawer>

  )
}
