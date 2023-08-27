import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import { ThemeProvider } from "@material-tailwind/react";

hydrateRoot(document, <ThemeProvider>
    <RemixBrowser />
  </ThemeProvider>);
