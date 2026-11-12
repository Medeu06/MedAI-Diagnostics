import React, { useState } from 'react';

export default function AgeGenderModal({ onSubmit }) {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [isAdult, setIsAdult] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isAdult || Number(age) < 18) {
      setError('К сожалению, использование ИИ-диагностики доступно только для лиц старше 18 лет.');
      return;
    }

    onSubmit({ age: Number(age), gender });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 max-w-md w-full p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto text-2xl font-bold">
            🛡️
          </div>
          <h2 className="text-lg font-bold text-white">Первичная идентификация пациента</h2>
          <p className="text-xs text-slate-400">
            Для точного подбора клинических алгоритмов ИИ укажите ваш возраст и пол.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1.5 font-semibold">Ваш возраст (лет)</label>
            <input
              type="number"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <input
              type="checkbox"
              id="adultCheck"
              checked={isAdult}
              onChange={(e) => setIsAdult(e.target.checked)}
              className="w-4 h-4 accent-cyan-500 rounded"
            />
            <label htmlFor="adultCheck" className="text-slate-300 cursor-pointer">
              Мне исполнилось 18 лет (Подтверждение возраста)
            </label>
          </div>

          <div>
            <label className="block text-slate-300 mb-1.5 font-semibold">Биологический пол</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  gender === 'male'
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                👨 Мужской
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  gender === 'female'
                    ? 'bg-purple-950/80 border-purple-500 text-purple-300 font-bold shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                👩 Женский
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-bold text-white rounded-xl shadow-lg transition-all text-sm mt-2"
          >
            Продолжить к выбору симптомов →
          </button>
        </form>
      </div>
    </div>
  );
}
