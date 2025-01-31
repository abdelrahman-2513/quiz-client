import React from "react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import theme from "./themes/theme";
import AppRoutes from "./routes/routes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Container maxWidth="lg">
            <AppRoutes />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
