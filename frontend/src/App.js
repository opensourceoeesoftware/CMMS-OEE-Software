import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter } from "react-router-dom";
import AuthProvider from './AuthProvider/AuthProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DashboardLayout from "./Layout/AppLayout";
import AppRoutes from "./AppMain/Routes"; // your route definitions

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0288d1",
    },
    loginBg: {
      main: "linear-gradient(to bottom right, #fff, #fff)"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>

          <DashboardLayout>
            <AppRoutes />
          </DashboardLayout>

        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
