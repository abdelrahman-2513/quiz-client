import { Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AddIcon from "@mui/icons-material/Add";

export default function AdminPageHeader({userText,adminText,handleOpenDialog}:any) {
    const userData = useSelector((state: RootState) => state.auth.userData);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4">{userData?.role === "student" ? userText : adminText}</Typography>
                {userData?.role !== "student" && <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
                    Add 
                </Button>}
            </Box>
  )
}
