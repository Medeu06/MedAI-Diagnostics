import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserProfile } from '../context/UserProfileContext.jsx';

export default function NavBar() {
  const { profile, clearProfile } = useUserProfile();

  const linkStyle = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-30 glass-card border-b border-slate-800 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
      <NavLink to="/" className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-xl shadow-lg text-white">
          +
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white">MedAI Diagnostics</h1>
          <p className="text-[10px] text-slate-400">ИКТ Проект — ИИ в медицине</p>
        </div>
      </NavLink>

      <nav className="flex items-center space-x-1 sm:space-x-2">
        <NavLink to="/" end className={linkStyle}>Главная</NavLink>
        <NavLink to="/checker" className={linkStyle}>Анализ симптомов</NavLink>
        <NavLink to="/knowledge" className={linkStyle}>База знаний (Видео)</NavLink>
        <NavLink to="/history" className={linkStyle}>История</NavLink>
        <NavLink to="/about" className={linkStyle}>О проекте</NavLink>

        {profile && (
          <div className="flex items-center space-x-2 pl-3 border-l border-slate-800 text-xs">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              {profile.gender === 'male' ? '👨 М' : '👩 Ж'}, {profile.age} лет
            </span>
            <button
              onClick={clearProfile}
              title="Сбросить анкету"
              className="text-slate-500 hover:text-red-400 transition-colors"
            >
              🔄
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
