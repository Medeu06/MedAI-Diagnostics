import React, { useState, useEffect } from 'react';
import DiagnosticCard from '../components/DiagnosticCard.jsx';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('medai_history') || '[]');
    setHistory(saved);
  }, []);

  const clearHistory = () => {
    if (window.confirm('Очистить всю историю анализов?')) {
      localStorage.removeItem('medai_history');
      setHistory([]);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">История ИИ-Консультаций</h1>
          <p className="text-xs text-slate-400">Сохраненные отчеты экспресс-диагностики</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-3 py-1.5 text-xs bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 rounded-xl"
          >
            Очистить историю
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass-card p-12 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
          История проверок пуста. Пройдите анализ симптомов на соответствующей странице.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((report) => (
            <DiagnosticCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
