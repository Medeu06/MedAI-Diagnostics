import React from 'react';

export default function DiagnosticCard({ report }) {
  const badgeColors = {
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    red: 'bg-red-500/20 text-red-300 border-red-500/40',
    indigo: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-indigo-400">{report.id}</span>
          <h3 className="text-base font-bold text-white">{report.primaryDiagnosis}</h3>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-bold border ${badgeColors[report.riskColor] || badgeColors.indigo}`}>
          Уровень риска: {report.riskLevel} ({report.probability}%)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div>
          <span className="text-slate-500 block text-[10px]">Рекомендуемый специалист</span>
          <span className="font-bold text-indigo-300">{report.recommendedSpecialist}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Пациент</span>
          <span className="text-slate-200">{report.gender === 'male' ? 'Мужчина' : 'Женщина'}, {report.age} лет</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Дата экспресс-анализа</span>
          <span className="font-mono text-slate-400">{report.date}</span>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Отмеченные симптомы:</h4>
        <div className="flex flex-wrap gap-1.5">
          {report.symptoms.map((s, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-[11px]">
              • {s}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Рекомендации ИИ-алгоритма:</h4>
        <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
          {report.nextSteps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="text-[10px] text-slate-500 border-t border-slate-800/80 pt-2 flex justify-between">
        <span>{report.aiNotes}</span>
        <span>Код записи: {report.id}</span>
      </div>
    </div>
  );
}
