import React from "react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import theme from "./themes/theme";
import AppRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Container sx={{ height: "100vh", backgroundColor: "#f5f5f5",width:"100vw" ,padding:0 }} maxWidth="xl">
            <ToastContainer/>

            <AppRoutes />
          </Container>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
