import React, { useState } from 'react';
import { SYMPTOMS_LIST } from '../data/medicalDatabase.js';

export default function SymptomChecker({ onAnalyze }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const toggleSymptom = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStartAnalysis = () => {
    if (selectedSymptoms.length === 0) {
      alert('Пожалуйста, выберите хотя бы один симптом для анализа!');
      return;
    }
    onAnalyze(selectedSymptoms);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white">Шаг 2. Отметьте наблюдаемые симптомы</h2>
          <p className="text-xs text-slate-400">Выберите все текущие жалобы для вычисления корреляции нейросетью</p>
        </div>
        <span className="text-xs bg-slate-800 text-cyan-400 px-3 py-1 rounded-full border border-slate-700 font-mono">
          Выбрано: {selectedSymptoms.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {SYMPTOMS_LIST.map((sym) => {
          const isSelected = selectedSymptoms.includes(sym.id);
          return (
            <div
              key={sym.id}
              onClick={() => toggleSymptom(sym.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-500 text-white font-medium shadow-md'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-xs">
                <span className="block text-[10px] text-slate-500 uppercase">{sym.category}</span>
                <span>{sym.name}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                  isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-black' : 'border-slate-700 bg-slate-900'
                }`}
              >
                {isSelected && '✓'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={handleStartAnalysis}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 font-bold text-white text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
        >
          <span>🤖 Запустить нейросетевой анализ MedAI</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
