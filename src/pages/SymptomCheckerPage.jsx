import React, { useState } from 'react';
import { useUserProfile } from '../context/UserProfileContext.jsx';
import { COMMON_SYMPTOMS } from '../services/medicalData.js';
import { analyzeSymptoms } from '../services/aiMedicalEngine.js';
import DiagnosticCard from '../components/DiagnosticCard.jsx';

export default function SymptomCheckerPage() {
  const { profile } = useUserProfile();
  const [selectedIds, setSelectedIds] = useState([]);
  const [duration, setDuration] = useState(2);
  const [notes, setNotes] = useState('');
  const [report, setReport] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const toggleSymptom = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      alert('Выберите хотя бы один симптом для анализа!');
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      const result = analyzeSymptoms({
        age: profile?.age || 25,
        gender: profile?.gender || 'male',
        selectedSymptomIds: selectedIds,
        durationDays: duration,
        additionalNotes: notes,
      });

      setReport(result);
      setAnalyzing(false);

      // Сохранение в историю localStorage
      const history = JSON.parse(localStorage.getItem('medai_history') || '[]');
      localStorage.setItem('medai_history', JSON.stringify([result, ...history]));
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Интерактивный ИИ-Анализатор Симптомов</h2>
          <p className="text-xs text-slate-400">Выберите жалобы для генерации отчета медицинского нейромодуля</p>
        </div>
        {profile && (
          <div className="text-xs text-right">
            <span className="text-slate-400 block">Профиль пациента:</span>
            <span className="font-bold text-indigo-400">
              {profile.gender === 'male' ? 'Мужчина' : 'Женщина'}, {profile.age} лет (18+)
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Выбор симптомов */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. Отметьте имеющиеся симптомы ({selectedIds.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto pr-1">
              {COMMON_SYMPTOMS.map((s) => {
                const isSelected = selectedIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSymptom(s.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{s.name}</span>
                    {s.redFlag && <span className="text-[10px] text-red-400 font-bold">⚠️</span>}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Продолжительность (в днях): {duration}</label>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Дополнительные примечания</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Например: усиливается по вечерам..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                {analyzing ? 'Анализ нейросетью...' : '🤖 Запустить ИИ-Анализ симптомов'}
              </button>
            </div>
          </div>
        </div>

        {/* Результат анализа */}
        <div className="lg:col-span-5">
          {report ? (
            <DiagnosticCard report={report} />
          ) : (
            <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center space-y-3">
              <div className="text-4xl">🔬</div>
              <h3 className="text-sm font-bold text-white">Ожидание симптомов</h3>
              <p className="text-xs text-slate-400">
                Выберите жалобы слева и нажмите «Запустить ИИ-Анализ» для формирования отчета.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
