import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProfileProvider } from './context/UserProfileContext.jsx';
import RootLayout from './layouts/RootLayout.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const SymptomCheckerPage = lazy(() => import('./pages/SymptomCheckerPage.jsx'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage.jsx'));
const HistoryPage = lazy(() => import('./pages/HistoryPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs text-indigo-400 font-mono">Загрузка медицинского модуля...</p>
    </div>
  );
}

export default function App() {
  return (
    <UserProfileProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="checker" element={<SymptomCheckerPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserProfileProvider>
  );
}
