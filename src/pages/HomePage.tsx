import React, { useEffect } from "react";
import { AppBar, Toolbar, Container, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#6495ED", width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Portal
          </Typography>
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",

            padding: 4,
            borderRadius: 2,

          }}
        >
          <Typography variant="h3" gutterBottom>
            Welcome to the Student Portal
          </Typography>
          <Typography variant="h6" paragraph>
            Your one-stop solution to manage quizzes, announcements, and academic progress efficiently.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#6495ED", fontSize: "1.2rem" }}
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;