import React, { useState } from 'react';
import { useUserProfile } from '../context/UserProfileContext.jsx';

export default function MedicalDisclaimerModal() {
  const { isConfigured, saveProfile } = useUserProfile();
  const [age, setAge] = useState(24);
  const [gender, setGender] = useState('male');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  if (isConfigured) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(age) < 18) {
      setError('Сервис MedAI предназначен строго для лиц достигших 18 лет.');
      return;
    }
    if (!agreed) {
      setError('Подтвердите согласие с медицинским дисклеймером.');
      return;
    }
    saveProfile(age, gender);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-lg w-full p-6 rounded-2xl border border-slate-700 space-y-5 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-xl">
            🩺
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Первичная настройка MedAI</h2>
            <p className="text-xs text-slate-400">Проверка возраста и демографических параметров</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-xs">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Ваш возраст (Строго 18+) *</label>
            <input
              type="number"
              min="1"
              max="120"
              value={age}
              onChange={(e) => { setAge(e.target.value); setError(''); }}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Биологический пол *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  gender === 'male'
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                👨 Мужчина
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  gender === 'female'
                    ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                👩 Женщина
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
            <p className="font-bold text-slate-200">⚠️ Медицинское предупреждение (Дисклеймер):</p>
            <p>
              Данный веб-сервис разработан в учебных целях для дисциплины ИКТ («Искусственный интеллект в медицине»). Выдаваемые рекомендации не являются официальным врачебным диагнозом и не заменяют очный прием специалиста.
            </p>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span className="text-[11px] text-slate-300">
              Мне исполнилось 18 лет, я принимаю условия и дисклеймер.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold text-white rounded-xl shadow-lg transition-all"
          >
            Подтвердить и продолжить →
          </button>
        </form>
      </div>
    </div>
  );
}
