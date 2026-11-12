import React, { useState } from 'react';

const USERS_STORAGE_KEY = 'medai_registered_users_v1';

// Предустановленный аккаунт для быстрой проверки
const DEFAULT_USERS = [
  { login: 'alina', password: '12345', fullName: 'Алина Аманбек' },
  { login: 'admin', password: 'admin', fullName: 'Администратор' }
];

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

export default function LoginScreen({ onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedLogin = login.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedLogin || !trimmedPassword) {
      setError('Заполните логин и пароль.');
      return;
    }

    const users = getStoredUsers();

    if (isRegisterMode) {
      if (trimmedPassword.length < 4) {
        setError('Пароль должен содержать минимум 4 символа.');
        return;
      }
      if (trimmedPassword !== confirmPassword.trim()) {
        setError('Пароли не совпадают.');
        return;
      }
      const exists = users.some((u) => u.login.toLowerCase() === trimmedLogin);
      if (exists) {
        setError('Пользователь с таким логином уже существует.');
        return;
      }

      const newUser = { login: trimmedLogin, password: trimmedPassword };
      const updatedUsers = [...users, newUser];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      onLoginSuccess({ login: trimmedLogin });
    } else {
      const found = users.find(
        (u) => u.login.toLowerCase() === trimmedLogin && u.password === trimmedPassword
      );
      if (!found) {
        setError('Неверный логин или пароль.');
        return;
      }
      onLoginSuccess({ login: found.login });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-slate-900 max-w-md w-full p-7 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto text-3xl shadow-lg">
            🩺
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {isRegisterMode ? 'Регистрация в MedAI' : 'Вход в систему MedAI'}
          </h1>
          <p className="text-xs text-slate-400">
            Авторизуйтесь для доступа к ИИ-диагностике симптомов
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1.5 font-semibold">Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин (например, alina)"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1.5 font-semibold">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          {isRegisterMode && (
            <div>
              <label className="block text-slate-300 mb-1.5 font-semibold">Подтвердите пароль</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-bold text-white rounded-xl shadow-lg transition-all text-sm"
          >
            {isRegisterMode ? 'Создать аккаунт и войти →' : 'Войти в систему →'}
          </button>
        </form>

        {!isRegisterMode && (
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-[11px] text-slate-400 flex items-center justify-between">
            <span>Тестовый вход:</span>
            <span className="font-mono text-cyan-400">alina / 12345</span>
          </div>
        )}

        <div className="text-center text-xs text-slate-400 pt-1 border-t border-slate-800">
          {isRegisterMode ? (
            <>
              Уже есть аккаунт?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(false);
                  setError('');
                }}
                className="text-cyan-400 hover:underline font-bold"
              >
                Войти
              </button>
            </>
          ) : (
            <>
              Нет аккаунта?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(true);
                  setError('');
                }}
                className="text-cyan-400 hover:underline font-bold"
              >
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
