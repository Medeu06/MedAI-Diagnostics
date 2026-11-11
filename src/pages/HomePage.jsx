import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto glass-card p-8 rounded-3xl text-center space-y-6 my-6 border border-slate-800">
      <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs">
        🔬 ИКТ Проект: Искусственный Интеллект в Медицине
      </div>

      <h1 className="text-3xl font-extrabold text-white tracking-tight">
        Интеллектуальная система первичной диагностики и оценки медицинских рисков
      </h1>

      <p className="text-slate-400 text-xs leading-relaxed max-w-2xl mx-auto">
        Веб-приложение анализирует проявления симптомов с учетом возраста и биологического пола пациента. ИИ-алгоритм выполняет ранжирование рисков и выдает рекомендации по обращениям к узким специалистам.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-2xl">⚡</div>
          <h3 className="text-xs font-bold text-white">Экспресс-скрининг</h3>
          <p className="text-[11px] text-slate-400">Мгновенный сопоставительный анализ симптомов за 1 минуту.</p>
        </div>
        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-2xl">🛑</div>
          <h3 className="text-xs font-bold text-white">Детекция Red Flags</h3>
          <p className="text-[11px] text-slate-400">Автоматическое выявление критических состояний для вызова 103.</p>
        </div>
        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-2xl">📊</div>
          <h3 className="text-xs font-bold text-white">Гендерный фильтр</h3>
          <p className="text-[11px] text-slate-400">Адаптация вероятностей патологий под возраст (18+) и пол.</p>
        </div>
      </div>

      <div className="flex justify-center space-x-4 pt-4">
        <Link
          to="/checker"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          Начать анализ симптомов →
        </Link>
        <Link
          to="/knowledge"
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700"
        >
          Изучить Базу знаний
        </Link>
      </div>
    </div>
  );
}
