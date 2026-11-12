import React from 'react';

export default function DiagnosticResult({ results, onReset }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Результат обработки алгоритма MedAI v1.4
            </span>
            <h2 className="text-lg font-bold text-white">Вероятный клинический диагноз</h2>
          </div>
          <button
            onClick={onReset}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg border border-slate-700"
          >
            ← Повторить анализ
          </button>
        </div>

        {results.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs space-y-2">
            <p className="text-lg">🔍</p>
            <p>Не найдено точных совпадений по выбранным симптомам.</p>
            <p className="text-[11px] text-slate-500">Рекомендуется проконсультироваться с терапевтом для детального обследования.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((disease) => (
              <div key={disease.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold">Уровень совпадения: {disease.confidence}%</span>
                    <h3 className="text-base font-bold text-white">{disease.name}</h3>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Срочность: {disease.urgency}
                  </span>
                </div>

                <p className="text-xs text-slate-300">{disease.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Рекомендуемый профильный специалист</span>
                    <span className="text-cyan-300 font-semibold mt-0.5 block">👨‍⚕️ {disease.doctor}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Первичные рекомендации</span>
                    <ul className="list-disc list-inside text-slate-300 text-[11px] mt-1 space-y-0.5">
                      {disease.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Медицинский дисклеймер */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs space-y-1">
        <div className="font-bold flex items-center space-x-1">
          <span>⚠️</span>
          <span>ВНИМАНИЕ (Учебный ИКТ Проект):</span>
        </div>
        <p className="text-[11px] text-amber-300/80 leading-relaxed">
          Настоящая программа разработана в демонстрационных целях для курса ИКТ по теме «Искусственный Интеллект в медицине». Результаты работы алгоритма не являются врачебным заключением. При наличии недомоганий обязательно обратитесь к лицензированному медицинскому специалисту!
        </p>
      </div>
    </div>
  );
}
