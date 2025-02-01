import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import {login as loginUser } from "../apis/authApi";
import { AppBar, Toolbar, Container, TextField, Button, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser({email, password});
      dispatch(login({ accessToken: data.access_token, userData: data.user }));
      toast.success("Login successful!");
      nav("/dashboard");
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#6495ED" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            outline: "none",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button
            variant="contained"
            
            sx={{ mt: 2, backgroundColor: "#6495ED", padding: "10px 20px", fontSize: "1rem" ,outline:"none"}}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
