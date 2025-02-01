import { Box, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IAnnouncement } from "../interfaces/announcementInterface";
export default function AnnouncementBox({announcement}:{announcement:IAnnouncement}) {
  return (
    <Box sx={{ flex: 1,flexDirection:"column", display:"flex"  ,boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",borderRadius: "8px", padding: "16px"}}>
                <Box sx={{ display: "flex", alignItems: "center" }}>

                <AccountCircle color="primary" />
              <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                {announcement?.user?.name}
                </Typography>
                </Box>
              <Typography variant="subtitle2" fontWeight="bold">{announcement.title}</Typography>
              <Typography variant="body1">{announcement.content}</Typography>
            </Box>
  )
}
