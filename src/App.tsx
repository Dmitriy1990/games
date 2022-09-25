import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import { routes } from './constantes/routes';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from './components/errorHandler/ErrorHandler';
import { ScrollToTop } from './components/scrollTotop';
import { GamePage } from './pages/gamePage';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <BrowserRouter>
        <>
          <ScrollToTop />
          <Routes>
            <Route path={routes.main} element={<MainPage />} />
            <Route path={routes.main + '/:slug/:slug'} element={<GamePage />} />
          </Routes>
        </>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
