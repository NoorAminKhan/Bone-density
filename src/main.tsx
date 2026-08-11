import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Intercept browser extension background errors (e.g. MetaMask / web3 injection failures)
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.message?.includes('MetaMask') ||
    event.reason?.message?.includes('ethereum') ||
    event.reason?.includes?.('MetaMask')
  ) {
    event.preventDefault();
  }
});

window.addEventListener('error', (event) => {
  if (
    event.message?.includes('MetaMask') ||
    event.message?.includes('ethereum')
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

