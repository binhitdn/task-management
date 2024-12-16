import * as React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline giúp loại bỏ các style mặc định của trình duyệt */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
