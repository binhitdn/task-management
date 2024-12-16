import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Màu chính
    },
    secondary: {
      main: '#dc004e', // Màu phụ
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

export default theme;
