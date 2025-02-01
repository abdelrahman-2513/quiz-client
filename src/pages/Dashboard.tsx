import React from "react";
import { Box } from "@mui/material";

import TipBox from "../components/TipBox";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Quizzes from "../components/Quizzes";
import Announcement from "../components/Announcement";

const DashboardPage: React.FC = () => {
    
    
    const userData = useSelector((state: RootState) => state.auth.userData);

    return (
        <Box sx={{ paddingX: 3, display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
            <TipBox title={`Welcome, ${userData?.name}!`} text={userData?.role === "student" ? "Stay updated with the latest quizzes and announcements." : "Regularly update quizzes and announcements to keep students informed and engaged."} />

            <Box  sx={{ mb: 3, display: "flex",flexDirection:{md:"row",xs:"column"}, gap: 2, height: "100%" }}>
                
                    <Announcement />
                    <Quizzes />
                
            </Box>
        </Box>
    );
};

export default DashboardPage;
