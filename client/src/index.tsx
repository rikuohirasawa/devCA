import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './themes/themes'


Sentry.init({
  dsn: "https://f2d0f58e80e64c608a0ad0d264bfbf56@o4504565682667520.ingest.sentry.io/4504565687255042",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChakraProvider>
);

