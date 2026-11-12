import React from 'react';

export default function NavBar({ currentUser, onLogout, patientData, onResetPatient }) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg">
          🩺
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            MedAI Diagnostics{' '}
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              ИКТ Проект
            </span>
          </h1>
          <p className="text-[11px] text-slate-400">Интеллектуальная система анализа симптомов</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        {patientData && (
          <>
            <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center space-x-3">
              <span>
                Пол: <strong className="text-white">{patientData.gender === 'male' ? 'Мужской' : 'Женский'}</strong>
              </span>
              <span>
                Возраст: <strong className="text-cyan-400">{patientData.age} лет</strong>
              </span>
            </div>
            <button
              onClick={onResetPatient}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              Сменить данные
            </button>
          </>
        )}

        {currentUser && (
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <span className="text-slate-300 font-semibold">👤 {currentUser.login}</span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-lg border border-red-800/60 font-semibold transition-colors"
            >
              Выйти
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
