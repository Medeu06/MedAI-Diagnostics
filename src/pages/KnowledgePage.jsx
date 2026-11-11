import React from 'react';

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-5 rounded-2xl border border-slate-800">
        <h1 className="text-lg font-bold text-white">База знаний: ИИ и Нейросети в Медицине</h1>
        <p className="text-xs text-slate-400">Видеоматериалы и обзор академических решений ИКТ</p>
      </div>

      {/* Embedded Video Section */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">🎥 Видеообзор: Как ИИ меняет диагностику заболеваний</h3>
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/2816S41fJuc"
            title="AI in Medicine Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 className="font-bold text-indigo-400">1. Радиология и МРТ</h3>
          <p className="text-slate-300 leading-relaxed">
            Нейросети сверточного типа (CNN) распознают патологии на снимках КТ и МРТ с точностью до 96%, помогая выявлять опухоли на ранних стадиях.
          </p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 className="font-bold text-indigo-400">2. Анализ симптомов и СВОП</h3>
          <p className="text-slate-300 leading-relaxed">
            Системы поддержки принятия врачебных решений (СППР) анализируют электронные медицинские карты и ускоряют триаж пациентов.
          </p>
        </div>
      </div>
    </div>
  );
}
