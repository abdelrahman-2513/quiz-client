import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    return (

        <Box sx={{ display: "flex" }}>
            <Sidebar setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
            <Header setMobileOpen={setMobileOpen} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;



