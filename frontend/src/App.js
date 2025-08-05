import './App.css';

import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/dist/js/adminlte.min.js'
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'
import 'admin-lte/plugins/bootstrap/js/bootstrap.min.js'
import 'admin-lte/dist/js/adminlte.min.js'
import 'admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import 'admin-lte/plugins/jqvmap/jqvmap.min.css'
import 'admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter} from "react-router-dom";
import AuthProvider from './AuthProvider/AuthProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      mode:"light",
      grey: {
        main: '#808080',
        light: '#8d8d8d',
        dark: '#737373',
        contrastText: '#fff',
      },
      primary: {
        main: '#0288d1',
        light: '#0298ea',
        dark: '#0278b8',
        contrastText: '#fff',
      },
    },
  });
function App() {
  return (
    <>
    <BrowserRouter >
    <ThemeProvider theme={theme}>
      <AuthProvider/>
    </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
