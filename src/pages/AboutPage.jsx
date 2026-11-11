import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
      <h1 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
        О проекте (ИКТ: ИИ в медицине)
      </h1>

      <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
        <p>
          Данное веб-приложение разработано в рамках учебного проекта по дисциплине <strong>Информационно-коммуникационные технологии (ИКТ)</strong>.
        </p>
      </div>

      <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
        <h3 className="font-bold text-indigo-400 mb-2">Информация об авторе и стеке:</h3>
        <div><strong>Разработчик:</strong> Медеу Сейдали</div>
        <div><strong>Тема:</strong> «Искусственный интеллект в диагностике и медицине»</div>
        <div><strong>Стек технологий:</strong> React 18, React Router v6, Tailwind CSS, Vite</div>
        <div><strong>Функционал:</strong> Возрастной фильтр (18+), учет биологического пола, алгоритм оценки рисков, видео-раздел.</div>
      </div>
    </div>
  );
}
