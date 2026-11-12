import React, { useState } from 'react';
import NavBar from './components/NavBar.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import AgeGenderModal from './components/AgeGenderModal.jsx';
import SymptomChecker from './components/SymptomChecker.jsx';
import DiagnosticResult from './components/DiagnosticResult.jsx';
import { analyzeSymptoms } from './data/medicalDatabase.js';

const SESSION_KEY = 'medai_active_session_v1';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [patientData, setPatientData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPatientData(null);
    setAnalysisResults(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const handlePatientSubmit = (data) => {
    setPatientData(data);
  };

  const handleAnalyze = (selectedSymptoms) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const outcome = analyzeSymptoms({
        age: patientData.age,
        gender: patientData.gender,
        selectedSymptoms
      });
      setAnalysisResults(outcome.results);
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      <div>
        <NavBar
          currentUser={currentUser}
          onLogout={handleLogout}
          patientData={patientData}
          onResetPatient={() => {
            setPatientData(null);
            setAnalysisResults(null);
          }}
        />

        <main className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-6">
          {!currentUser ? (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          ) : (
            <>
              {!patientData && <AgeGenderModal onSubmit={handlePatientSubmit} />}

              {patientData && !analysisResults && !isAnalyzing && (
                <SymptomChecker onAnalyze={handleAnalyze} />
              )}

              {isAnalyzing && (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs text-cyan-400 font-mono">
                    Нейросеть MedAI сопоставляет симптомы с клинической базой данных...
                  </p>
                </div>
              )}

              {analysisResults && (
                <DiagnosticResult results={analysisResults} onReset={() => setAnalysisResults(null)} />
              )}
            </>
          )}
        </main>
      </div>

      <footer className="border-t border-slate-900 py-4 text-center text-[11px] text-slate-500">
        Разработано Медеу Сейдали — ИКТ «Искусственный интеллект в медицине» © 2026
      </footer>
    </div>
  );
}
